import { useState } from "react";
import Users from "./Users";
import {
    CardStackIcon,
    PersonIcon,
    ArrowLeftIcon,
    TextAlignJustifyIcon,
    ChevronLeftIcon
} from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import { NavigationMenu } from "radix-ui";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/user.slice";
import { useDispatch } from "react-redux";
import { URLS } from "../constants/urls";
import NewSample from "./NewSample";

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("tasks");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate(URLS.LOGIN);
    };

    const openSide = () => setOpen((prev) => !prev);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar Toggle Button */}
            {!open && (
                <aside >
                    <TextAlignJustifyIcon onClick={openSide} className="w-7 h-7 cursor-pointer text-black transition-colors hover:bg-gray-50" />
                </aside>
            )}

            {/* Sidebar Navigation */}
            {open && (
                <aside className="w-64 bg-white shadow-lg border-r  border-gray-200">
                    <NavigationMenu.Root orientation="vertical" className="p-4">
                        <NavigationMenu.List className="space-y-2 flex flex-col">
                            <div>
                                <NavigationMenu.Item className="flex justify-between items-center">
                                    <h2 className="w-full text-2xl font-bold text-gray-700 rounded-lg px-4 py-2 transition-all">
                                        TaskMaster
                                    </h2>
                                    <ChevronLeftIcon onClick={openSide} className="w-6 h-6 cursor-pointer text-black transition-colors hover:bg-gray-50 rounded-3xl" />
                                </NavigationMenu.Item>
                                <NavigationMenu.Item>
                                    <NavigationMenu.Trigger
                                        onClick={() => setActiveTab("tasks")}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === "tasks"
                                            ? "bg-gray-200 text-gray-700"
                                            : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        <CardStackIcon className="w-5 h-5" />
                                        <Text weight="medium">Tasks</Text>
                                    </NavigationMenu.Trigger>
                                </NavigationMenu.Item>
                                <NavigationMenu.Item>
                                    <NavigationMenu.Trigger
                                        onClick={() => setActiveTab("users")}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === "users"
                                            ? "bg-gray-200 text-gray-700"
                                            : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        <PersonIcon className="w-5 h-5" />
                                        <Text weight="medium">Users</Text>
                                    </NavigationMenu.Trigger>
                                </NavigationMenu.Item>
                            </div>
                            <div>
                                <NavigationMenu.Item>
                                    <NavigationMenu.Trigger
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-white bg-red-400 hover:bg-red-600"
                                    >
                                        <ArrowLeftIcon className="w-5 h-5" />
                                        <Text weight="medium">Logout</Text>
                                    </NavigationMenu.Trigger>
                                </NavigationMenu.Item>
                            </div>
                        </NavigationMenu.List>
                    </NavigationMenu.Root>
                </aside>
            )}

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8">
                {activeTab === "tasks" && <NewSample />}
                {activeTab === "users" && <Users />}
            </main>
        </div>
    );
};

export default AdminDashboard;
