import {
    EnvelopeClosedIcon,
    LockOpen1Icon,
    LockClosedIcon,
    EyeNoneIcon,
    EyeOpenIcon,
} from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { forgotSchema } from "../utils/helper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const ForgotPassword = () => {
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm({
        resolver: yupResolver(forgotSchema),
        mode: "onTouched",
        defaultValues: {
            email: "",
            new: "",
            confirm: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            // 1. Check if user exists
            const users = await api.USERS.getAll({ params: { email: data.email } });
            if (!Array.isArray(users) || users.length === 0) {
                setError("email", { message: "Not authorized user" });
                return;
            }
            const user = users[0];

            // 2. Check if new password is same as previous
            if (user.password === data.new) {
                setError("new", { message: "Please create unique password" });
                return;
            }

            // 4. Update password
            await api.USERS.patch({
                id: user.id,
                data: { password: data.new },
            });

            alert("Password updated successfully!");
            reset();
        } catch (error) {
            alert("Something went wrong!", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 ">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 hover:scale-105 hover:shadow-xl transition-all">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Forgot Password
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Email
                        </label>
                        <div className="relative">
                            <EnvelopeClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                                className={`w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 transition ${errors.email
                                        ? "border-red-400 focus:ring-red-200 bg-red-50"
                                        : "border-gray-300 focus:ring-blue-400"
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* New Password Field */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            New Password
                        </label>
                        <div className="relative">
                            <LockOpen1Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showPasswordNew ? "text" : "password"}
                                placeholder="Enter new password"
                                {...register("new")}
                                className={`w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 transition ${errors.new
                                        ? "border-red-400 focus:ring-red-200 bg-red-50"
                                        : "border-gray-300 focus:ring-blue-400"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswordNew(!showPasswordNew)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                tabIndex={-1}
                            >
                                {showPasswordNew ? <EyeNoneIcon /> : <EyeOpenIcon />}
                            </button>
                        </div>
                        {errors.new && (
                            <p className="text-red-500 text-xs mt-1">{errors.new.message}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showPasswordConfirm ? "text" : "password"}
                                placeholder="Confirm new password"
                                {...register("confirm")}
                                className={`w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 transition ${errors.confirm
                                        ? "border-red-400 focus:ring-red-200 bg-red-50"
                                        : "border-gray-300 focus:ring-blue-400"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                tabIndex={-1}
                            >
                                {showPasswordConfirm ? <EyeNoneIcon /> : <EyeOpenIcon />}
                            </button>
                        </div>
                        {errors.confirm && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.confirm.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
                    >
                        Reset Password
                    </button>
                    <Link
                        to="/login"
                        className="block text-sm text-center text-blue-600 hover:text-blue-800 mt-2"
                    >
                        Back to Login
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
