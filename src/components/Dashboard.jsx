import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/task.slice";
import { fetchUsers } from "../redux/slices/user.slice";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { updateTaskStatus } from "../redux/slices/task.slice";
import CustomTable from "../shared/table";

const Dashboard = () => {
    const [filter, setFilter] = useState({});

    const users = useSelector((state) => state.users.items);
    const tasks = useSelector((state) => state.tasks.items);
    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers({}));
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            fetchTasks({
                params: {
                    ...filter,
                },
            })
        );
    }, [dispatch, filter]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAccept = (id) => {
        dispatch(updateTaskStatus({ id, status: "accepted" }));
    };

    const handleReject = (id) => {
        dispatch(updateTaskStatus({ id, status: "rejected" }));
    };

    const columns = [
        {
            id: "title",
            label: "Task",
            field_name: "title",
            render: ({ row }) => row.title, // [.title === key name given in row of data. ]

        },
        {
            id: "status",
            label: "Status",
            field_name: "status",
            render: ({ row }) => row.status,
        },
        {
            id: "dueDate",
            label: "Due Date",
            field_name: "dueDate",
            render: ({ row }) => row.dueDate,
        },
        {
            id: "action",
            label: "Action",
            field_name: "action",
            render: ({ row }) => (
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-600 text-white px-3 py-1 text-md rounded-md hover:bg-blue-700 transition"
                        onClick={() => handleAccept(row.id)}
                        disabled={row.status === "accepted"}
                    >
                        Accept
                    </button>
                    <button
                        className="bg-red-600 text-white px-3 py-1 text-md rounded-md hover:bg-red-700 transition"
                        onClick={() => handleReject(row.id)}
                        disabled={row.status === "rejected"}
                    >
                        Reject
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            {/* UX Addition */}
            {/* <div className="flex  sm:flex-row flex-wrap gap-4 items-center mb-6 w-full">
                <p className="text-lg sm:text-3xl font-medium text-black mb-2 sm:mb-0 mr-0 sm:mr-6 w-full sm:w-auto  sm:text-left">
                    Welcome, {currentUser.name}
                </p>
                <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg focus-within:ring-2 focus-within:ring-blue-400 px-2 sm:px-3 py-2 shadow-sm w-full sm:w-64 max-w-xs">
                    <MagnifyingGlassIcon className="text-gray-500 mr-2 w-5 h-5" />
                    <input
                        type="text"
                        name="q"
                        placeholder="Search tasks..."
                        value={filter.q}
                        onChange={handleChange}
                        className="bg-transparent w-full outline-none placeholder-gray-400 text-base"
                    />
                </div>

                <label className="flex items-center text-sm font-medium text-gray-700">
                    Start:
                    <input
                        type="date"
                        name="dueDate_gte"
                        value={filter.dueDate_gte || ""}
                        onChange={handleChange}
                        placeholder="Start Date"
                        className="border border-gray-300 rounded-lg px-2 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                    />
                </label>
                <label className="flex items-center text-sm font-medium text-gray-700 sm:ml-2">
                    End:
                    <input
                        type="date"
                        name="dueDate_lte"
                        value={filter.dueDate_lte || ""}
                        onChange={handleChange}
                        placeholder="End Date"
                        className="border border-gray-300 rounded-lg px-2 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                    />
                </label>

                <select
                    name="status"
                    value={filter.status || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 sm:px-3 ml-0 sm:ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm "
                >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
                <select
                    name="_sort"
                    value={filter._sort || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                >
                    <option>Sort By</option>
                    <option value="dueDate">Due Date</option>
                </select>
                <select
                    name="_order"
                    value={filter._order || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                >
                    <option>Order</option>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
            </div> */}

            {/* Statistics - Done */}
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

            {/* Table - Done */}
            <h2 className="text-2xl font-bold text-black900 mt-8 mb-2">
                Recent Tasks
            </h2>

            <div className="flex justify-between">
                <div>
                    <label>
                        Entries per page:
                        <select
                            name="_limit"
                            value={filter._limit}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 sm:px-3 ml-0 sm:ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm "
                        >
                            <option value="10">10</option>
                            <option value="2">2</option>
                            <option value="5">5</option>
                        </select>
                    </label>
                </div>
                <div>
                    <input
                        className="border rounded-lg px-3 py-2 border-gray-500 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-base shadow-sm"
                        type="text"
                        name="q"
                        value={filter.q}
                        onChange={handleChange}
                        placeholder="Search..."
                    />
                </div>
            </div>

            <CustomTable data={tasks} columns={columns} />
            {/* <Table.Root variant="surface" layout="auto" size="3" className="w-full">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell className="text-black text-center">
                            Task
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="text-black text-center">
                            Status
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="text-black text-center">
                            Due Date
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="text-black text-center">
                            Action
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tasks.map((task) => (
                        <Table.Row key={task.id}>
                            <Table.Cell justify={"center"}>{task.title}</Table.Cell>
                            <Table.Cell justify={"center"}>{task.status}</Table.Cell>
                            <Table.Cell justify={"center"}>{task.dueDate}</Table.Cell>
                            <Table.Cell justify={"center"}>
                                <div className="flex justify-center gap-3">
                                    <button
                                        className="bg-blue-600 text-white px-3 py-1 text-md rounded-md hover:bg-blue-700 transition"
                                        onClick={() => handleAccept(task.id)}
                                        disabled={task.status === "accepted"}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-3 py-1 text-md rounded-md hover:bg-red-700 transition"
                                        onClick={() => handleReject(task.id)}
                                        disabled={task.status === "rejected"}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root> */}
        </>
    );
};

export default Dashboard;
