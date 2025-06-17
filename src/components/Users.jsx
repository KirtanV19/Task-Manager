import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/slices/user.slice";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import CustomTableCopy from "../shared/table/table";
import useFilter from "../hooks/useFilter";
import useSearch from "../hooks/useSearch";
import useLimit from "../hooks/useLimit";
import useSortFilter from "../hooks/useSortFilter";

const Users = () => {
    const dispatch = useDispatch();
    const { filter, setFilter } = useFilter();
    const { q, setQ } = useSearch();
    const { limit, setLimit } = useLimit();
    const { sort, handleSort } = useSortFilter();

    const { items } = useSelector((state) => state.users);

    useEffect(() => {
        setFilter((prev) => ({
            ...prev,
            q: q ? q : undefined,
            _limit: limit ? limit : undefined,
            _sort: sort.field ? sort.field : undefined,
            _order: sort.order ? sort.order : undefined,
        }));
    }, [q, limit, sort, setFilter]);

    useEffect(() => {
        dispatch(fetchUsers({
            params: {
                ...filter
            }
        }))
    }, [dispatch, filter])

    const columns = [
        {
            id: "name",
            label: "Name",
            field_name: "name",
            render: ({ row }) => row.name,
        },
        {
            id: "email",
            label: "Email",
            field_name: "email",
            render: ({ row }) => row.email,
        },
        {
            id: "role",
            label: "Role",
            field_name: "role",
            render: ({ row }) => row.role,
        },
    ];

    return (
        <div className="flex flex-col space-y-5 p-2">
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
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    className="bg-transparent w-full outline-none placeholder-gray-400"
                />
            </div>
            <CustomTableCopy columns={columns} data={items} onSort={handleSort} sort={sort} />
        </div>
    );
};

export default Users;
