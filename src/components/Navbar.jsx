import { Menubar } from "radix-ui";
import { useNavigate, Link } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center bg-blue-blue7 justify-between px-6 py-1 shadow">
            <Link
                to="/"
                className="font-bold text-xl text-black hover:text-blue-800 cursor-pointer"
            >
                TaskMaster
            </Link>
            <Menubar.Root className="flex gap-4 p-1 rounded-md h-auto">
                <Menubar.Menu>
                    <Menubar.Trigger
                        onClick={() => navigate("/login")}
                        className="px-3 py-1 rounded  hover:text-blue-800 hover:bg-blue-100 transition-all cursor-pointer"
                    >
                        Login
                    </Menubar.Trigger>
                </Menubar.Menu>
                <Menubar.Menu>
                    <Menubar.Trigger
                        onClick={() => navigate("/register")}
                        className="px-3 py-1 rounded  hover:text-blue-800 hover:bg-blue-100 transition-all cursor-pointer"
                    >
                        Register
                    </Menubar.Trigger>
                </Menubar.Menu>
                <Menubar.Menu>
                    <Menubar.Trigger
                        onClick={() => navigate("/forgot-password")}
                        className="px-3 py-1 rounded hover:text-blue-800 hover:bg-blue-100 transition-all cursor-pointer"
                    >
                        Forgot Password
                    </Menubar.Trigger>
                </Menubar.Menu>
            </Menubar.Root>
        </nav>
    );
};

export default Navbar;
