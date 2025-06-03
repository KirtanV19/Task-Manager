import { EnvelopeClosedIcon } from "@radix-ui/react-icons";

const ForgotPassword = () => {
    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 ">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 hover:scale-105 hover:shadow-xl transition-all">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Forgot Password
                </h2>
                <form className="space-y-5">
                    <label>Email:</label>
                    <div className="border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-400 flex items-center px-3 py-2">
                        <EnvelopeClosedIcon className="text-gray-500 mr-2 w-5 h-5" />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-transparent w-full outline-none placeholder-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
                    >
                        Reset my Password
                    </button>
                    <p className="w-full text-sm text-center text-blue-600 hover:text-blue-800 hover:cursor-pointer">
                        Back to Login
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
