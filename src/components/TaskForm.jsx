import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { createTask } from "../redux/slices/task.slice";
import { useSelector } from "react-redux";

const today = new Date();
today.setHours(0, 0, 0, 0);

const schema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    status: yup.string().required("Status is required"),
    dueDate: yup
        .date()
        .transform((value) => value && new Date(value)) // Transform string to Date
        .min(today, "Due date cannot be in the past")
        .required("Due date is required"),
});

const TaskForm = ({ defaultValues = {} }) => {

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.users);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onTouched",
        defaultValues,
    });

    const onSubmit = async (data) => {
        try {
            const formattedDate = new Date(data.dueDate).toISOString().split('T')[0];
            const formdataWithId = {
                ...data,
                dueDate: formattedDate, // Ensure consistent YYYY-MM-DD format
                userId: currentUser.userId
            }
            await dispatch(createTask(formdataWithId)).unwrap()
            console.log('formdataWithId', formdataWithId)
        } catch (error) {
            console.error(error);
        }
    }

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
