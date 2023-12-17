"use client";

import { useId } from "react";

export const TaskForm = () => {
  const id = useId();
  const taskNameId = `task-name-${id}`;
  const taskDescriptionId = `task-description-${id}`;

  return (
    <form className="max-w-lg">
      <div className="flex flex-col gap-y-4 mb-4">
        <div className="form-control">
          <p className="label">
            <label htmlFor={taskNameId} className="label-text">
              タスク名
            </label>
          </p>
          <input id={taskNameId} type="text" className="input input-bordered" />
        </div>
        <div className="form-control">
          <p className="label">
            <label htmlFor={taskDescriptionId} className="label-text">
              内容
            </label>
          </p>
          <textarea
            id={taskDescriptionId}
            className="textarea textarea-bordered"
          ></textarea>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        作成
      </button>
    </form>
  );
};
