import { useMemo, useState } from "react";
import TodoItem from "@/features/todo/components/TodoItem";
import TodoStats from "@/features/todo/components/TodoStats";
import { tasks } from "@/features/todo/mock/tasks";
import PageHeader from "@/shared/components/header/PageHeader";
import Button from "@/shared/components/button/Button";
import DdayCard from "@/shared/components/card/DdayCard";
import Input from "@/shared/components/input/Input";
import TodoFilter from "@/features/todo/components/TodoFilters";

export default function TodoPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "completed"
            ? task.completed
            : !task.completed;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <>
      <PageHeader title="Todo" description="오늘의 할 일을 관리하세요.">
        <Button>+ 할 일 추가</Button>
      </PageHeader>

      <TodoStats
        total={tasks.length}
        active={tasks.filter((task) => !task.completed).length}
        completed={tasks.filter((task) => task.completed).length}
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

      <div>
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            title={task.title}
            completed={task.completed}
            dueDate={task.dueDate}
          />
        ))}
      </div>
    </>
  );
}
