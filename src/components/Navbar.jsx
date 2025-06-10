import { Menubar } from "radix-ui";
import { Link, useNavigate } from "react-router";
import { logout } from "../redux/slices/user.slice";
import { URLS } from "../constants/urls";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.users.currentUser);

    const handleLogout = () => {
        dispatch(logout());
        navigate(URLS.LOGIN);
    };

    return (
        <nav className="flex items-center bg-white justify-between px-6 py-3 shadow">
            <Link
                to={currentUser ? (currentUser.role === 'admin' ? URLS.DASHBOARD : URLS.USERDASHBOARD) : URLS.INITIAL}
                className="font-bold text-xl text-black transition hover:text-blue-800"
            >
                TaskMaster
            </Link>
            <Menubar.Root className="flex gap-4 p-1 rounded-md h-auto">
                {!currentUser ? (
                    <>
                        <Menubar.Menu>
                            <Link
                                to={URLS.LOGIN}
                                className="px-3 py-1.5 rounded hover:text-blue-800 hover:bg-blue-100 transition-all"
                            >
                                Login
                            </Link>
                        </Menubar.Menu>
                        <Menubar.Menu>
                            <Link
                                to={URLS.REGISTER}
                                className="px-3 py-1.5 rounded hover:text-blue-800 hover:bg-blue-100 transition-all"
                            >
                                Register
                            </Link>
                        </Menubar.Menu>
                        <Menubar.Menu>
                            <Link
                                to={URLS.FORGOT}
                                className="px-3 py-1.5 rounded hover:text-blue-800 hover:bg-blue-100 transition-all"
                            >
                                Forgot Password
                            </Link>
                        </Menubar.Menu>
                    </>
                ) : (
                    <Menubar.Menu>
                        <Menubar.Trigger
                            onClick={handleLogout}
                            className="px-3 py-1.5 rounded hover:text-blue-800 hover:bg-blue-100 transition-all"
                        >
                            Logout
                        </Menubar.Trigger>
                    </Menubar.Menu>
                )}
            </Menubar.Root>
        </nav>
    );
};

export default Navbar;
