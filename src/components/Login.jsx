import { useState } from "react";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { loginUser } from "../redux/slices/user.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URLS } from "../constants/urls";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser({ email, password })).unwrap();
            navigate("/");
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 ">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 hover:scale-105 hover:shadow-xl transition-all">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Login
                </h2>
                <form className="space-y-5" onSubmit={handleLogin}>
                    <div className="border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-400 flex items-center px-3 py-2">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-transparent w-full outline-none placeholder-gray-400"
                        />
                    </div>
                    <div className="w-full border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-400 flex items-center px-3 py-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="flex-1 bg-transparent outline-none placeholder-gray-400"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            {showPassword ? (
                                <EyeNoneIcon size={20} />
                            ) : (
                                <EyeOpenIcon size={20} />
                            )}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
                    >
                        Login
                    </button>

                    <div className="flex gap-4 items-center place-content-center">
                        <p>Forgot Password? </p>
                        <Link
                            to={URLS.FORGOT}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Click here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
