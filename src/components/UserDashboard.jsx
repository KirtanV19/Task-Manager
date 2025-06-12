import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Create from "../utils/PopupComp/Create";
import Delete from "../utils/PopupComp/Delete";
import Edit from "../utils/PopupComp/Edit";
import Container from "../utils/Container";
import { fetchTasks } from "../redux/slices/task.slice";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";

const UserDashboard = () => {
    const { currentUser } = useSelector((state) => state.users);
    const tasks = useSelector((state) => state.tasks.items);
    const [filter, setFilter] = useState({ userId: currentUser.userId });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        dispatch(
            fetchTasks({
                params: {
                    ...filter,
                },
            })
        );
    }, [dispatch, filter]);

    return (
        <Container>
            {/* UX Addition */}
            <div className="flex flex-wrap gap-4 items-center mb-6">
                <p className="text-4xl font-extrabold text-black mb-2 mr-6">
                    Welcome {currentUser.name}
                </p>
                <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg focus-within:ring-2 focus-within:ring-blue-400 px-3 py-2 shadow-sm w-64">
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
                <input
                    type="date"
                    name="dueDate"
                    value={filter.dueDate}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                />
                <select
                    name="status"
                    value={filter.status || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                >
                    <option>All Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
                <select
                    name="_sort"
                    value={filter._sort || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                >
                    <option>Sort By</option>
                    <option value="dueDate">Due Date</option>
                    <option value="status">Status</option>
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
            </div>

            {/* Table */}
            <div className="flex items-center justify-between">
                <h2 className="text-black900 mb-2 text-2xl font-bold">My Tasks</h2>
                <Create />
            </div>
            <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
                <Table.Root variant="surface" layout="auto" size="3" className="w-full">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell className="text-black text-center">
                                Task
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="text-black text-center">
                                Description
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
                                <Table.Row key={task.id} className="text-center">
                                    <Table.RowHeaderCell className="py-3">
                                        {task.title}
                                    </Table.RowHeaderCell>
                                    <Table.RowHeaderCell className="py-3">
                                        {task.description}
                                    </Table.RowHeaderCell>
                                    <Table.RowHeaderCell className="py-3">
                                        {task.status}
                                    </Table.RowHeaderCell>
                                    <Table.RowHeaderCell className="py-3">
                                        {task.dueDate}
                                    </Table.RowHeaderCell>
                                    <Table.RowHeaderCell className="py-3">
                                        <div className="flex justify-center gap-3">
                                            <Edit task={task} />
                                            {/* <Delete taskId={task.id} /> */}
                                        </div>
                                    </Table.RowHeaderCell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </div>
            </div>
        </Container>
    );
};

export default UserDashboard;
