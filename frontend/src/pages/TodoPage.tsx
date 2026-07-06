import { useMemo, useState } from "react";
import TodoItem from "@/features/todo/components/TodoItem";
import TodoStats from "@/features/todo/components/TodoStats";
import { tasks as mockTasks } from "@/features/todo/api/tasks";
import PageHeader from "@/shared/components/header/PageHeader";
import Button from "@/shared/components/ui/Button";
import DdayCard from "@/shared/components/card/DdayCard";
import Input from "@/shared/components/ui/Input";
import TodoFilter from "@/features/todo/components/TodoFilters";
import EmptyState from "@/shared/components/state/EmptyState";

export default function TodoPage() {
  // 1. 목업 상수를 React state로 이관하여 동적 상태로 변경
  const [todos, setTodos] = useState(mockTasks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("전체");

  // 2. 할 일 체크박스 상태 토글 기능 추가
  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // 3. 할 일 신규 추가 기능 기능 추가 (데모용 프롬프트 구현)
  const handleAddTodo = () => {
    const title = prompt("새로운 할 일을 입력하세요:");
    if (!title || !title.trim()) return;

    const newTodo = {
      id: Date.now(), // 고유한 임시 ID 생성
      title: title.trim(),
      completed: false,
      dueDate: new Date().toISOString().split("T")[0], // 오늘 날짜 기본값
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
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
        {/* + 할 일 추가 버튼에 이벤트 연결 */}
        <Button onClick={handleAddTodo}>+ 할 일 추가</Button>
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

      {/* 5. 투두 리스트 렌더링 영역 및 EmptyState 조건부 렌더링 결합 */}
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
              id={task.id} // [추가] 토글 식별용 ID
              title={task.title}
              completed={task.completed}
              dueDate={task.dueDate}
              onToggle={handleToggleTodo} // [추가] 토글 헨들러 주입
            />
          ))
        )}
      </div>
    </>
  );
}
