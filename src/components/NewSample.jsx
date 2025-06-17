import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/task.slice";
import { fetchUsers } from "../redux/slices/user.slice";
import useSearch from "../hooks/useSearch";
import useLimit from "../hooks/useLimit";
import usePage from "../hooks/usePage";
import useFilter from "../hooks/useFilter";
import useSortFilter from "../hooks/useSortFilter";
import CustomTableCopy from "../shared/table/table";
import { updateTaskStatus } from "../redux/slices/task.slice";
import CustomDateRangePicker from "../shared/datepicker";

const NewSample = () => {
    const dispatch = useDispatch();
    const { filter, setFilter } = useFilter();
    const { q, setQ } = useSearch();
    const { limit, setLimit } = useLimit();
    const { page, setPage } = usePage();
    const { sort, handleSort } = useSortFilter();

    const tasks = useSelector((state) => state.tasks.items);
    const users = useSelector((state) => state.users.items);

    useEffect(() => {
        dispatch(fetchUsers({}));
    }, [dispatch]);

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

    // console.log("tasks", tasks);

    const handleAccept = (id) => {
        dispatch(updateTaskStatus({ id, status: "accepted" }));
    };

    const handleReject = (id) => {
        dispatch(updateTaskStatus({ id, status: "rejected" }));
    };

    const handleDateRangeChange = ({ start, end }) => {
        setFilter((prev) => ({
            ...prev,
            dueDate_gte: start || undefined,
            dueDate_lte: end || undefined,
        }));
    };

    const columns = [
        {
            id: "title",
            label: "Title",
            field_name: "title",
            render: ({ row }) => row.title, // [.title === key name given in row of data (db.json). ]
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
            sortable: false,
            render: ({ row }) => (
                <div className="flex items-center gap-2">
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
        <div className="flex flex-col space-y-6">
            {/* Statistics */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4">
                <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl shadow p-6 flex flex-col items-center">
                    <p className="text-black text-lg font-medium mb-1">Total Tasks</p>
                    <p className="text-3xl font-light text-black">{tasks.length}</p>
                </div>
                <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl shadow p-6 flex flex-col items-center">
                    <p className="text-black text-lg font-medium mb-1">Total Users</p>
                    <p className="text-3xl font-light text-black">{users.length}</p>
                </div>
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

            {/* Custom Table */}
            <CustomTableCopy
                columns={columns}
                data={tasks}
                onSort={handleSort}
                sort={sort}
            />

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
        </div>
    );
};

export default NewSample;
