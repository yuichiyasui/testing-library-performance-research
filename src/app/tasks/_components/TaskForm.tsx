"use client";

import { useEffect, useId } from "react";
import { object, string, maxLength, minLength, type Output } from "valibot";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  useCreateTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
} from "@/api/__generated__/task-api";
import { useRouter } from "next/navigation";

const formSchema = object({
  title: string([
    minLength(1, "タスク名が入力されていません"),
    maxLength(30, "タスク名は30文字以内で入力してください"),
  ]),
  description: string([
    maxLength(1000, "タスクの内容は1000文字以内で入力してください"),
  ]),
});

type FormSchema = Output<typeof formSchema>;

type Props = { isEdit: true; taskId: string } | { isEdit: false };

export const TaskForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<FormSchema>({
    resolver: valibotResolver(formSchema),
  });
  const router = useRouter();

  const { data: initialData } = useGetTaskQuery(
    { taskId: props.isEdit ? Number(props.taskId) : 0 },
    {
      query: {
        enabled: props.isEdit,
      },
    },
  );

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("description", initialData.description);
    }
  }, [initialData, setValue]);

  const { mutateAsync: createTaskMutation, isPending: isCreatePending } =
    useCreateTaskMutation();
  const { mutateAsync: updateTaskMutation, isPending: isUpdatePending } =
    useUpdateTaskMutation();

  const onSubmit = async (data: FormSchema) => {
    try {
      if (props.isEdit) {
        await updateTaskMutation({
          pathParams: {
            taskId: Number(props.taskId),
          },
          data: {
            title: data.title,
            description: data.description,
          },
        });
      } else {
        await createTaskMutation({
          data: {
            title: data.title,
            description: data.description,
          },
        });
      }

      router.push("/tasks");
    } catch (error) {
      setError("root", { message: "エラーが発生しました" });
    }
  };

  const isPending = props.isEdit ? isUpdatePending : isCreatePending;

  const id = useId();
  const taskTitleId = `task-title-${id}`;
  const taskTitleErrorId = `task-title-error-${id}`;
  const taskDescriptionId = `task-description-${id}`;
  const taskDescriptionErrorId = `task-description-error-${id}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
      <div className="flex flex-col gap-y-4 mb-4">
        <div className="form-control">
          <p className="label">
            <label htmlFor={taskTitleId} className="label-text">
              タスク名
            </label>
          </p>
          <input
            {...register("title")}
            id={taskTitleId}
            type="text"
            aria-invalid={!!errors.title ? "true" : "false"}
            aria-required="true"
            aria-errormessage={taskTitleErrorId}
            className="input input-bordered"
          />
          <div className="label">
            {errors.title && (
              <p id={taskTitleErrorId} className="label-text-alt text-red-600">
                {errors.title.message}
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
      {errors.root && (
        <p className="text-red-600" role="alert">
          {errors.root.message}
        </p>
      )}
      <button type="submit" className="btn btn-primary" disabled={isPending}>
        {props.isEdit ? "更新" : "作成"}
        {isPending && (
          <span className="ml-2 loading loading-spinner loading-sm"></span>
        )}
      </button>
    </form>
  );
};
