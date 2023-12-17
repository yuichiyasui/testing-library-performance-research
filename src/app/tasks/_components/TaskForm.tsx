"use client";

import { useId } from "react";
import { object, string, maxLength, minLength, type Output } from "valibot";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";

const formSchema = object({
  name: string([
    minLength(1, "タスク名が入力されていません"),
    maxLength(30, "タスク名は30文字以内で入力してください"),
  ]),
  description: string([
    maxLength(1000, "タスクの内容は1000文字以内で入力してください"),
  ]),
});

type FormSchema = Output<typeof formSchema>;

export const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: valibotResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  const id = useId();
  const taskNameId = `task-name-${id}`;
  const taskNameErrorId = `task-name-error-${id}`;
  const taskDescriptionId = `task-description-${id}`;
  const taskDescriptionErrorId = `task-description-error-${id}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
      <div className="flex flex-col gap-y-4 mb-4">
        <div className="form-control">
          <p className="label">
            <label htmlFor={taskNameId} className="label-text">
              タスク名
            </label>
          </p>
          <input
            {...register("name")}
            id={taskNameId}
            type="text"
            aria-invalid={!!errors.name ? "true" : "false"}
            aria-required="true"
            aria-errormessage={taskNameErrorId}
            className="input input-bordered"
          />
          <div className="label">
            {errors.name && (
              <p id={taskNameErrorId} className="label-text-alt text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>
        <div className="form-control">
          <p className="label">
            <label htmlFor={taskDescriptionId} className="label-text">
              内容
            </label>
          </p>
          <textarea
            {...register("description")}
            id={taskDescriptionId}
            aria-invalid={!!errors.description ? "true" : "false"}
            className="textarea textarea-bordered"
          ></textarea>
          <div className="label">
            {errors.description && (
              <p
                id={taskDescriptionErrorId}
                className="label-text-alt text-red-600"
              >
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        作成
      </button>
    </form>
  );
};
