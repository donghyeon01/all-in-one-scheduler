import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TodoItem from "@/features/todo/components/TodoItem";
import TodoStats from "@/features/todo/components/TodoStats";
import { taskApi } from "@/features/todo/api/tasks";
import type { Task } from "@/features/todo/api/tasks";
import PageHeader from "@/shared/components/header/PageHeader";
import Input from "@/shared/components/ui/Input";
import TodoFilter from "@/features/todo/components/TodoFilters";
import EmptyState from "@/shared/components/state/EmptyState";
import Modal from "@/shared/components/modal/Modal";
import Button from "@/shared/components/button/Button";
import DdayCard from "@/shared/components/card/DdayCard";

// react-query 캐시 키 (다른 화면에서도 동일 키로 무효화/재사용 가능)
const TASKS_QUERY_KEY = ["tasks"] as const;

export default function TodoPage() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("전체");

  // 투두 모달 상태 및 입력 폼 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  // 1. 할 일 목록 조회 (기존 useEffect + fetch 패턴을 useQuery로 대체)
  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: taskApi.getTasks,
  });

  // 2. 할 일 체크박스 상태 토글 - 완료 시점의 지연을 없애기 위해 optimistic update 적용
  const toggleTodoMutation = useMutation({
    mutationFn: (todo: Task) =>
      taskApi.updateTask(todo.id, {
        title: todo.title,
        dueDate: todo.dueDate,
        completed: !todo.completed,
      }),
    onMutate: async (todo) => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY_KEY });
      const previousTodos = queryClient.getQueryData<Task[]>(TASKS_QUERY_KEY);

      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (prev) =>
        (prev ?? []).map((t) =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t,
        ),
      );

      return { previousTodos };
    },
    onError: (error, _todo, context) => {
      console.error("할 일 상태 변경 실패:", error);
      // 실패 시 이전 상태로 롤백
      if (context?.previousTodos) {
        queryClient.setQueryData(TASKS_QUERY_KEY, context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });

  const handleToggleTodo = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    toggleTodoMutation.mutate(todo);
  };

  // 3. 할 일 등록
  const createTodoMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      setNewTitle("");
      setNewDueDate("");
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("할 일 등록 실패:", error);
    },
  });

  const handleSubmitTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }

    const dueDateStr = newDueDate || new Date().toISOString().split("T")[0];

    createTodoMutation.mutate({
      title: newTitle,
      dueDate: dueDateStr,
    });
  };

  // 4. 아직 완료되지 않은 할 일 중 마감일이 가장 가까운 항목 계산 (DdayCard 연동용)
  const upcomingTask = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return todos
      .filter((task) => !task.completed && task.dueDate)
      .filter((task) => new Date(`${task.dueDate}T00:00:00`) >= today)
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      )[0];
  }, [todos]);

  // 5. 필터링 로직 (todos 상태 기반으로 수정)
  const filteredTasks = useMemo(() => {
    return todos.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "전체"
          ? true
          : filter === "완료"
            ? task.completed
            : !task.completed;

      return matchesSearch && matchesFilter;
    });
  }, [todos, search, filter]);

  return (
    <>
      <PageHeader title="할 일 관리" description="오늘의 할 일을 관리하세요.">
        {/* prompt를 띄우는 대신 모달을 열도록 수정 */}
        <Button onClick={() => setIsModalOpen(true)}>+ 할 일 추가</Button>
      </PageHeader>

      <TodoStats
        total={todos.length}
        active={todos.filter((task) => !task.completed).length}
        completed={todos.filter((task) => task.completed).length}
      />

      {upcomingTask && (
        <DdayCard title={upcomingTask.title} dueDate={upcomingTask.dueDate} />
      )}

      <div className="my-6">
        <Input
          placeholder="할 일 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <TodoFilter current={filter} onChange={setFilter} />

      <div className="mt-4">
        {isLoading ? (
          <EmptyState title="할 일을 불러오는 중입니다..." />
        ) : isError ? (
          <EmptyState
            title="할 일 목록을 불러오지 못했습니다."
            description="잠시 후 다시 시도해 주세요."
          />
        ) : filteredTasks.length === 0 ? (
          <EmptyState
            title="할 일이 없습니다."
            description={
              search
                ? "검색 결과를 찾을 수 없어요. 다른 키워드를 입력해 보세요!"
                : "새로운 할 일을 등록하고 하루를 시작해 보세요!"
            }
          />
        ) : (
          filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
              dueDate={task.dueDate}
              onToggle={handleToggleTodo}
            />
          ))
        )}
      </div>

      {/* 새롭게 추가된 할 일 등록 커스텀 모달 */}
      <Modal
        isOpen={isModalOpen}
        title="새로운 할 일 추가"
        onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmitTodo} className="space-y-4 mt-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-text">
              할 일 제목
            </label>
            <Input
              placeholder="무엇을 해야 하나요?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-text">
              마감일
            </label>
            <Input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-xl border-2 border-text bg-white px-4 py-2 font-bold text-text shadow-[2px_2px_0px_0px_#1e2538] transition hover:bg-slate-50 cursor-pointer">
              취소
            </button>
            <Button type="submit">등록하기</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
