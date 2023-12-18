"use client";

import { useGetTasksQuery } from "@/api/__generated__/task-api";
import { InternalLink } from "@/components/InternalLink";

const TaskListFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <table className="table">
      <thead className="bg-gray-50">
        <tr>
          <th className="whitespace-nowrap w-0">
            <label>
              <span className="sr-only">全てのタスクを選択</span>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <th>タスク名</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

const SkeletonTaskList = () => {
  return (
    <TaskListFrame>
      {Array(5)
        .fill(0)
        .map((_, i) => {
          return (
            <tr key={i}>
              <td>
                <div className="skeleton w-6 h-6 rounded-md"></div>
              </td>
              <td>
                <div className="skeleton w-32 h-6 rounded-md"></div>
              </td>
            </tr>
          );
        })}
    </TaskListFrame>
  );
};

export const TaskList = () => {
  const { data: tasks, isLoading } = useGetTasksQuery();

  if (isLoading) {
    return <SkeletonTaskList />;
  }

  if (typeof tasks === "undefined" || tasks.length === 0) {
    return <p className="text-gray-500">登録されているタスクがありません</p>;
  }

  return (
    <TaskListFrame>
      {tasks.map((task) => {
        return (
          <tr key={task.id}>
            <td>
              <label>
                <span className="sr-only">{task.title}を選択</span>
                <input type="checkbox" className="checkbox" value={task.id} />
              </label>
            </td>
            <td>
              <InternalLink href={`/tasks/edit/${task.id}`}>
                {task.title}
              </InternalLink>
            </td>
          </tr>
        );
      })}
    </TaskListFrame>
  );
};
