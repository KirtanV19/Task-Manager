import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/slices/user.slice";
import { Table, Progress } from "@radix-ui/themes";
import Container from "../utils/Container";
const Users = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <>
            {loading && <Progress size="3" duration="1000" variant="classic" />}
            <Container>
                <h1 className="text-2xl font-semibold mb-6">User List</h1>

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
            </Container>
        </>
    );
};

export default Users;
