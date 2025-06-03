import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
const schema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password should be at least 8 characters.")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
            /[@$!%*?&#^()\-_=+{};:,<.>]/,
            "Password must contain at least one special character"
        ),
});

const getPasswordStrength = (password) => {
    return [
        {
            label: "At least 8 characters",
            passed: password.length >= 8,
        },
        {
            label: "One lowercase letter",
            passed: /[a-z]/.test(password),
        },
        {
            label: "One uppercase letter",
            passed: /[A-Z]/.test(password),
        },
        {
            label: "One number [0-9]",
            passed: /\d/.test(password),
        },
        {
            label: "One special character",
            passed: /[@$!%*?&#^()\-_=+{};:,<.>]/.test(password),
        },
    ];
};

const Register = () => {
    // const navigate = useNavigate();
    const [passwordValue, setPasswordValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema), mode: "all" });

    // const onSubmit = (data) => {
    //     const success = registerUser(data.email, data.password);
    //     if (success) {
    //         toast.success("Registered successfully");
    //         navigate("/login");
    //     } else {
    //         toast.error("User already exists");
    //     }
    // };

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Register
                </h2>
                <form className="space-y-5">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <div className="w-full border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-400 flex items-center px-3 py-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                {...register("password")}
                                onChange={(e) => setPasswordValue(e.target.value)}
                                className="flex-1 bg-transparent outline-none placeholder-gray-400"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                            </span>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}

                        {/* Password rule feedback */}
                        <div className="mt-3 space-y-1">
                            {getPasswordStrength(passwordValue).map((check, index) => (
                                <p
                                    key={index}
                                    className={`flex items-center gap-2 text-sm transform transition-all duration-300 ease-in-out ${check.passed
                                        ? "text-green-600 opacity-100 translate-y-0"
                                        : "text-gray-400 opacity-60 -translate-y-1"
                                        }`}
                                >
                                    <span>{check.passed ? "✓" : "✗"}</span>
                                    {check.label}
                                </p>
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition font-semibold"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
