import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/task.slice";
import { fetchUsers } from "../redux/slices/user.slice";
import Container from "../utils/Container";
import { Table } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Dashboard = () => {

    const [filter, setFilter] = useState({});
    const users = useSelector((state) => state.users.items)
    const tasks = useSelector((state) => state.tasks.items)

    const dispatch = useDispatch();

    console.log('filter', filter)
    useEffect(() => {
        dispatch(fetchTasks({
            params: {
                ...filter
            }
        }));
        dispatch(fetchUsers({}));
    }, [dispatch, filter]);

    { /*
    const handleAccept = (id) => {
        dispatch(updateTaskStatus({ id, status: "accepted" }));
    };

    const handleReject = (id) => {
        dispatch(updateTaskStatus({ id, status: "rejected" }));
    };
    */}

    return (
        <Container className="flex flex-col gap-5 py-4 px-4 md:px-8  min-h-screen">
            <div className="flex">
                <h1 className="text-4xl font-extrabold text-blue mb-2">Dashboard</h1>
                <div className="border border-gray-300 bg-gray-200 rounded focus-within:ring-2 focus-within:ring-blue-400 flex items-center px-3 py-1">
                    <MagnifyingGlassIcon className="text-gray-500 cursor-pointer mr-2 w-5 h-5" />
                    <input
                        type="text"
                        value={filter.search}
                        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                        className="bg-transparent w-full outline-none placeholder-gray-300"
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-6">
                <div className="flex-1 min-w-[220px] bg-white border border-gray-200 rounded-xl shadow p-6 flex flex-col items-center">
                    <p className="text-black700 text-lg font-semibold mb-1">
                        Total Tasks
                    </p>
                    <p className="text-3xl font-bold text-black900">{tasks.length}</p>
                </div>
                <div className="flex-1 min-w-[220px] bg-white border border-gray-200 rounded-xl shadow p-6 flex flex-col items-center">
                    <p className="text-black700 text-lg font-semibold mb-1">
                        Total Users
                    </p>
                    <p className="text-3xl font-bold text-black900">{users.length}</p>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-black900 mt-8 mb-2">
                Recent Tasks
            </h2>
            <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
                <Table.Root variant="surface" layout="auto" size="3" className="w-full">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell className="text-black">
                                Task
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="text-black">
                                Status
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="text-black">
                                Due Date
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="text-black">
                                Action
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table.Root>
                <div className="max-h-80 overflow-y-auto">
                    <Table.Root
                        variant="surface"
                        layout="auto"
                        size="3"
                        className="w-full table-fixed"
                    >
                        <Table.Body>
                            {tasks.map((task) => (
                                <Table.Row key={task.id}>
                                    <Table.RowHeaderCell>{task.title}</Table.RowHeaderCell>
                                    <Table.Cell>{task.status}</Table.Cell>
                                    <Table.Cell>{task.dueDate}</Table.Cell>
                                    <Table.Cell
                                        className="flex gap-5 items-center"
                                        justify="center"
                                    >
                                        <button
                                            className="bg-blue-600 text-white p-1 text-md rounded-md hover:bg-blue-700 transition"
                                            // onClick={() => handleAccept(task.id)}
                                            disabled={task.status === "accepted"}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="bg-red-600 text-white p-1 text-md rounded-md hover:bg-red-700 transition"
                                            // onClick={() => handleReject(task.id)}
                                            disabled={task.status === "rejected"}
                                        >
                                            Reject
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </div>
            </div>
        </Container>
    );
};

export default Dashboard;
