import { useState } from "react";

export default function TodoPage() {
  const [tasks] = useState([
    {
      id: 1,
      title: "JWT 인증 구현",
      completed: true,
      dueDate: "2026-07-15",
    },
    {
      id: 2,
      title: "Todo API 연결",
      completed: false,
      dueDate: "2026-07-20",
    },
    {
      id: 3,
      title: "캘린더 UI 제작",
      completed: false,
      dueDate: "2026-07-22",
    },
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Todo</h1>

          <p className="mt-2 text-slate-500">오늘 해야 할 일을 관리하세요.</p>
        </div>

        <button
          className="
          rounded-xl
          bg-primary
          px-5
          py-3
          font-semibold
        ">
          + 할 일 추가
        </button>
      </div>

      {/* 통계 */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-text-gray">전체 작업</p>
          <h2 className="mt-2 text-4xl font-black">12</h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-text-gray">진행중</p>
          <h2 className="mt-2 text-4xl font-black text-accent-purple">5</h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-text-gray">완료</p>
          <h2 className="mt-2 text-4xl font-black text-green-500">7</h2>
        </div>
      </section>

      {/* D-Day */}
      <section className="rounded-3xl bg-primary-bg p-8">
        <h2 className="text-2xl font-black">프로젝트 마감</h2>

        <p className="mt-2 text-text-gray">SOSO 런칭</p>

        <div className="mt-6 text-5xl font-black text-accent-purple">D-12</div>
      </section>

      {/* Todo */}
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black">Todo List</h2>

          <button
            className="
            rounded-2xl
            bg-accent-purple
            px-5
            py-3
            font-bold
            text-white
          ">
            + 추가
          </button>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-border p-4">
            Spring JWT 구현
          </div>

          <div className="rounded-2xl border border-border p-4">
            Event CRUD 구현
          </div>

          <div className="rounded-2xl border border-border p-4">React 연결</div>
        </div>
      </section>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            bg-white
            p-5
          ">
            <div className="flex items-center gap-4">
              <input type="checkbox" checked={task.completed} readOnly />

              <div>
                <h3 className="font-semibold">{task.title}</h3>

                <p className="text-sm text-slate-500">마감일 {task.dueDate}</p>
              </div>
            </div>

            <button>⋮</button>
          </div>
        ))}
      </div>
    </div>
  );
}
