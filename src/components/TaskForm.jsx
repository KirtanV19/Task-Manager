import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useEffect } from "react";

const schema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    status: yup.string().required("Status is required"),
    dueDate: yup
        .string()
        .required("Due Date is required")
        .test("is-valid-date", "Due date must be a valid date", (value) => {
            new Date(value) > new Date();
        }),
});

const TaskForm = ({ defaultValues = {}, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onTouched",
        defaultValues,
    });

    // useEffect(() => {
    //     reset(defaultValues);
    // }, [defaultValues]);

    return (
        <div className="flex items-center justify-center min-h-[70vh] mt-3">
            <div className="w-full max-w-md bg-white shadow-xl border-gray-600 p-8 ">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            placeholder="Task Title"
                            {...register("title")}
                            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.title
                                    ? "border-red-400 focus:ring-red-200"
                                    : "border-gray-300 focus:ring-blue-400"
                                }`}
                        />
                        {errors.title && (
                            <p className="text-red-600 text-xs mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Description
                        </label>
                        <input
                            type="text"
                            placeholder="Task Description"
                            {...register("description")}
                            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.description
                                    ? "border-red-400 focus:ring-red-200"
                                    : "border-gray-300 focus:ring-blue-400"
                                }`}
                        />
                        {errors.description && (
                            <p className="text-red-600 text-xs mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Due Date
                        </label>
                        <input
                            type="date"
                            {...register("dueDate")}
                            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.dueDate
                                    ? "border-red-400 focus:ring-red-200"
                                    : "border-gray-300 focus:ring-blue-400"
                                }`}
                        />
                        {errors.dueDate && (
                            <p className="text-red-600 text-xs mt-1">
                                {errors.dueDate.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            {...register("status")}
                            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${errors.status
                                    ? "border-red-400 focus:ring-red-200"
                                    : "border-gray-300 focus:ring-blue-400"
                                }`}
                            defaultValue="pending"
                        >
                            <option value="pending">Pending</option>
                        </select>
                        {errors.status && (
                            <p className="text-red-600 text-xs mt-1">
                                {errors.status.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
                    >
                        {defaultValues?.id ? "Update Task" : "Add Task"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
