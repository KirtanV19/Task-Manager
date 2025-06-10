import { useState } from 'react'
import Dashboard from './Dashboard'
import Users from './Users'
import { DragHandleHorizontalIcon, PersonIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import { NavigationMenu } from "radix-ui";

const AdminDashboard = () => {

    const [handleTask, setHandleTask] = useState(false);
    const [handleUser, setHandleUser] = useState(false);

    const handleTasks = () => {
        setHandleTask(true)
        setHandleUser(false)
    }
    const handleUsers = () => {
        setHandleUser(true)
        setHandleTask(false)
    }

    return (
        <div>
            <NavigationMenu.Root orientation="vertical" className="w-2/5 col-span-2">
                <NavigationMenu.List>
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger
                            onClick={handleTasks}
                            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-200 transition-all text-gray-700 font-semibold"
                        >
                            <DragHandleHorizontalIcon className="w-5 h-5" />
                            <Text weight={"bold"}>Tasks</Text>
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger
                            onClick={handleUsers}
                            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-200 transition-all text-gray-700 font-semibold"
                        >
                            <PersonIcon className="w-5 h-5" />
                            <Text weight={"bold"}  >Users</Text>
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item>
                </NavigationMenu.List>
            </NavigationMenu.Root>

            <div className='w-3/5 col-span-3'>
                {handleTask === true && <Dashboard />}
                {handleUser === true && <Users />}
            </div>
        </div>
    )
}

export default AdminDashboard