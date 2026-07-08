import { useMemo, useState } from "react";
import TodoItem from "@/features/todo/components/TodoItem";
import TodoStats from "@/features/todo/components/TodoStats";
import { tasks as mockTasks } from "@/features/todo/api/tasks";
import PageHeader from "@/shared/components/header/PageHeader";
import Input from "@/shared/components/ui/Input";
import TodoFilter from "@/features/todo/components/TodoFilters";
import EmptyState from "@/shared/components/state/EmptyState";
import Modal from "@/shared/components/modal/Modal";
import Button from "@/shared/components/button/Button";
import DdayCard from "@/shared/components/card/DdayCard";

export default function TodoPage() {
  // 1. 목업 상수를 React state로 이관하여 동적 상태로 변경
  const [todos, setTodos] = useState(mockTasks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("전체");

  // 투두 모달 상태 및 입력 폼 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  // 2. 할 일 체크박스 상태 토글 기능
  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  //3. 모달 안에서 '등록' 버튼을 눌렀을 때 실행될 함수
  const handleSubmitTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }
    const newTodo = {
      id: Date.now(), // 고유 ID 생성
      title: newTitle,
      completed: false,
      dueDate: newDueDate || new Date().toISOString().split("T")[0], // 날짜 미지정 시 오늘 날짜
    };

    setTodos((prev) => [...prev, newTodo]);

    // 폼 초기화 및 모달 닫기
    setNewTitle("");
    setNewDueDate("");
    setIsModalOpen(false);
  };

  // 4. 필터링 로직 (todos 상태 기반으로 수정)
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

      <DdayCard />

      <div className="my-6">
        <Input
          placeholder="할 일 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <TodoFilter current={filter} onChange={setFilter} />

      <div className="mt-4">
        {filteredTasks.length === 0 ? (
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
