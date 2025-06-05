import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/task.slice";
import { fetchUserOnly } from "../redux/slices/user.slice";
import Container from "../utils/Container";
import { Table } from "@radix-ui/themes";
import { statusAccept, statusReject } from "../redux/slices/task.slice";

const Dashboard = () => {

    const { items: users } = useSelector((state) => state.users);
    const { items: tasks } = useSelector((state) => state.tasks);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchUserOnly());
    }, [dispatch]);

    return (
        <Container className="flex flex-col gap-6 py-4 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
            <h1 className="text-4xl font-extrabold text-blue mb-2">Dashboard</h1>
            <div className="flex flex-wrap gap-6">
                <div className="flex-1 min-w-[220px] bg-white border border-gray-200 rounded-xl shadow p-6 flex flex-col items-center">
                    <p className="text-black700 text-lg font-semibold mb-1">Total Tasks</p>
                    <p className="text-3xl font-bold text-black900">{tasks.length}</p>
                </div>
                <div className="flex-1 min-w-[220px] bg-white border border-gray-200 rounded-xl shadow p-6 flex flex-col items-center">
                    <p className="text-black700 text-lg font-semibold mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-black900">{users.length}</p>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-black900 mt-8 mb-2">Recent Tasks</h2>
            <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
                <Table.Root variant="surface" layout="auto" size="3" className="w-full">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell className="text-black">Task</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="text-black">Status</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="text-black">Due Date</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="text-black">Action</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {tasks.map((task) => (
                            <Table.Row key={task.id}>
                                <Table.RowHeaderCell >{task.title}</Table.RowHeaderCell>
                                <Table.Cell>
                                    {task.status}
                                </Table.Cell>
                                <Table.Cell>{task.dueDate}</Table.Cell>
                                {/* <Table.Cell>
                                    <button className="bg-blue-blue10 text-white p-1 rounded-md">Accept</button>
                                </Table.Cell>
                                <Table.Cell>
                                    <button className="bg-red-red10 text-white p-1 rounded-md">Reject</button>
                                </Table.Cell> */}
                                <Table.Cell className="flex gap-5 items-center" justify='center'>
                                    <button className="bg-blue-blue10 text-white p-1 text-md rounded-md">Accept</button>
                                    <button className="bg-red-red10 text-white p-1 text-md rounded-md">Reject</button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </div>
        </Container>
    );
};

export default Dashboard;
