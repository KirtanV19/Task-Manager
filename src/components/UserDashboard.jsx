import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Create from "../utils/PopupComp/Create";
import Edit from "../utils/PopupComp/Edit";
import Container from "../utils/Container";
import { fetchTasks } from "../redux/slices/task.slice";
import Navbar from "./Navbar";
import CustomTableCopy from "../shared/table/table";
import useSearch from "../hooks/useSearch";
import useLimit from "../hooks/useLimit";
import usePage from "../hooks/usePage";
import useSortFilter from "../hooks/useSortFilter";
import CustomDateRangePicker from "../shared/datepicker";

const UserDashboard = () => {
    const { currentUser } = useSelector((state) => state.users);
    const tasks = useSelector((state) => state.tasks.items);
    const [filter, setFilter] = useState({ userId: currentUser.userId });

    const dispatch = useDispatch();
    const { q, setQ } = useSearch();
    const { limit, setLimit } = useLimit();
    const { page, setPage } = usePage();
    const { sort, handleSort } = useSortFilter();

    useEffect(() => {
        setFilter((prev) => ({
            ...prev,
            q: q ? q : undefined,
            _limit: limit ? limit : undefined,
            _page: page ? page : undefined,
            _sort: sort.field ? sort.field : undefined,
            _order: sort.order ? sort.order : undefined,
        }));
    }, [q, limit, page, sort, setFilter]);

    useEffect(() => {
        dispatch(
            fetchTasks({
                params: {
                    ...filter,
                },
            })
        );
    }, [dispatch, filter]);

    const handleDateRangeChange = ({ start, end }) => {
        setFilter((prev) => ({
            ...prev,
            dueDate_gte: start || undefined,
            dueDate_lte: end || undefined,
        }));
    };

    const columns = [
        {
            id: "task",
            label: "Task",
            field_name: "task",
            render: ({ row }) => row.title,
        },
        {
            id: "description",
            label: "Description",
            field_name: "description",
            render: ({ row }) => row.description,
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
            render: ({ row }) => <Edit task={row} />,
        },
    ];

    return (
        <>
            <Navbar />
            <Container>
                {/* Table */}
                <div className="flex items-center justify-between">
                    <h2 className="text-black900 mb-2 text-2xl font-bold">My Tasks</h2>
                    <Create />
                </div>
                {/* Limit, Date Range & Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div className="flex items-center mb-2 md:mb-0">
                        <select
                            value={limit}
                            className="border border-gray-300 rounded-md px-2 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            onChange={(e) => {
                                setLimit(Number(e.target.value));
                                setPage(1);
                            }}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
                        <label htmlFor="entries" className="font-medium ml-2">
                            entries per page
                        </label>
                    </div>
                    <div className="mb-2 md:mb-0">
                        <CustomDateRangePicker
                            value={{
                                start: filter.dueDate_gte || "",
                                end: filter.dueDate_lte || "",
                            }}
                            onChange={handleDateRangeChange}
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="search" className="font-medium">
                            Search:
                        </label>
                        <input
                            type="text"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className="border border-gray-300 rounded-md px-2 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                        />
                    </div>
                </div>
                <CustomTableCopy columns={columns} data={tasks} onSort={handleSort} sort={sort} />

                {/* Total items and Pagination */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 gap-2">
                    <p className="text-sm">
                        Showing 1 to {limit} of {tasks.length} entries
                    </p>
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                        <button
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                            disabled={page <= 1}
                        >
                            Previous
                        </button>
                        <span>Page {page}</span>
                        <button
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={tasks.length < limit}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default UserDashboard;

