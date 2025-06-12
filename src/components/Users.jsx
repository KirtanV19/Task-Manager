import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/slices/user.slice";
import { Table } from "@radix-ui/themes";
import Container from "../utils/Container";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import useDebounce from "../hooks/useDebounce";

const Users = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.users);
    const [filter, setFilter] = useState({});
    const debouncedFilter = useDebounce(filter, 400);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        dispatch(
            fetchUsers({
                params: debouncedFilter,
            })
        );
    }, [dispatch, debouncedFilter]);

    return (
        <>
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

                <Table.Root variant="surface" layout="auto" size="3" className="w-full">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell className="text-black text-center">
                                Name
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="text-black text-center">
                                Email
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className="text-black text-center">
                                Role
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {items.map((item) => (
                            <Table.Row key={item.id}>
                                <Table.Cell justify={"center"}>{item.name}</Table.Cell>
                                <Table.Cell justify={"center"}>{item.email}</Table.Cell>
                                <Table.Cell justify={"center"}>{item.role}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Container>
        </>
    );
};

export default Users;
