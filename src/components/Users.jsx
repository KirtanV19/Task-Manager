import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/slices/user.slice";
import { Table, Progress } from "@radix-ui/themes";
import Container from "../utils/Container";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Users = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.users);
    const [filter, setFilter] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        dispatch(fetchUsers({
            params: {
                ...filter,
            }
        }));
    }, [dispatch, filter]);


    return (
        <>
            {loading && <Progress size="3" duration="1000" variant="classic" />}
            <Container className="flex flex-col space-y-5 p-2">
                <p className="text-4xl font-bold ">User Management</p>
                <p className="text-slate-500 text-sm font-bold">
                    Manage all users within the organization.
                </p>
                <div className="border border-gray-300 bg-gray-200 rounded focus-within:ring-2 focus-within:ring-blue-400 flex items-center px-3 py-2">
                    <MagnifyingGlassIcon className="text-gray-500 cursor-pointer mr-2 w-5 h-5" />

                    <input
                        type="text"
                        name="q"
                        placeholder="Search Users..."
                        value={filter.q}
                        onChange={handleChange}
                        className="bg-transparent w-full outline-none placeholder-gray-400"
                    />
                </div>
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
                    <Table.Root
                        variant="surface"
                        layout="auto"
                        size="3"
                        className="w-full"
                    >
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
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
                                {items.map((item) => (
                                    <Table.Row key={item.id}>
                                        <Table.RowHeaderCell>{item.name}</Table.RowHeaderCell>
                                        <Table.Cell>{item.email}</Table.Cell>
                                        <Table.Cell>{item.role}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Users;
