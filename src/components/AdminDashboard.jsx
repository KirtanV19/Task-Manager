import { useState } from "react";
import Dashboard from "./Dashboard";
import Users from "./Users";
import {
    DragHandleHorizontalIcon,
    PersonIcon,
    ArrowLeftIcon,
} from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import { NavigationMenu } from "radix-ui";
import { useNavigate } from 'react-router-dom'
import { logout } from "../redux/slices/user.slice";
import { useSelector, useDispatch } from "react-redux";
import { URLS } from "../constants/urls";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("tasks"); // Better state management
    const { currentUser } = useSelector((state) => state.users);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log('Admin', currentUser);

    const handleLogout = () => {
        dispatch(logout())
        navigate(URLS.LOGIN)
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
                <NavigationMenu.Root orientation="vertical" className="p-4">
                    <NavigationMenu.List className="space-y-2 flex flex-col">
                        <div>
                            <NavigationMenu.Item>
                                <h2 className="w-full text-2xl font-bold hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-2 transition-all ">
                                    TaskMaster
                                </h2>
                            </NavigationMenu.Item>
                            <NavigationMenu.Item>
                                <NavigationMenu.Trigger
                                    onClick={() => setActiveTab("tasks")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === "tasks"
                                        ? "bg-gray-200 text-gray-700"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    <DragHandleHorizontalIcon className="w-5 h-5" />
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
                                <NavigationMenu.Trigger onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-white bg-red-500 hover:bg-red-600">
                                    <ArrowLeftIcon className="w-5 h-5" />
                                    <Text weight="medium">Logout</Text>
                                </NavigationMenu.Trigger>
                            </NavigationMenu.Item>
                        </div>
                    </NavigationMenu.List>
                </NavigationMenu.Root>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {activeTab === "tasks" && <Dashboard />}
                {activeTab === "users" && <Users />}
            </main>
        </div>
    );
};

export default AdminDashboard;
