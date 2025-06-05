import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { registerUser } from "../redux/slices/user.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const schema = yup.object({
    name: yup.string().required("Name is required"),
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
    role: yup.string().required("Role is required"),
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordValue, setPasswordValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            // Add a unique id to the user object
            const userWithId = { ...data, id: Date.now() };
            await dispatch(registerUser(userWithId)).unwrap();
            console.log('userWithId', userWithId)
            navigate("/login");
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Register
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name")}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                    </div>
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
                            {showPassword ? <EyeNoneIcon /> : <EyeOpenIcon />}
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

                    <div className="flex gap-6 items-center mt-2">
                        <span className="block mb-1 font-medium text-gray-700">Role:</span>
                        <div className="flex gap-6 items-center">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="admin"
                                    className="accent-blue-600"
                                    {...register("role", {
                                        required: "Role is required",
                                    })}
                                />
                                Admin
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="user"
                                    className="accent-blue-600"
                                    {...register("role", {
                                        required: "Role is required",
                                    })}
                                />
                                User
                            </label>
                        </div>
                        {errors.role && (
                            <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
                        )}
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
