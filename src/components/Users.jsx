import { useEffect } from "react";
import { fetchUsers } from "../redux/slices/user.slice";
import { useSelector, useDispatch } from "react-redux";
import { Table, Progress } from "@radix-ui/themes/dist/cjs/index.js";

const Users = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);



    return (
        <>
            {loading && <Progress duration="1000" variant="classic" />}
            <Table.Root variant="surface" layout='auto' size='3'>
                <Table.Header>
                    <Table.Row align='baseline'>
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
        </>
    );
};

export default Users;
