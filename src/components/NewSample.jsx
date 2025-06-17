import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/task.slice";
import useSearch from "../hooks/useSearch";
import useLimit from "../hooks/useLimit";
import usePage from "../hooks/usePage";
import useSortFilter from "../hooks/useSortFilter";
import CustomTableCopy from "../shared/table/table";
import { updateTaskStatus } from "../redux/slices/task.slice";

const NewSample = () => {
    const [filter, setFilter] = useState({});
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.items);
    const { q, setQ } = useSearch();
    const { limit, setLimit } = useLimit();
    const { page, setPage } = usePage();
    const { sort, handleSort } = useSortFilter();

    useEffect(() => {
        dispatch(
            fetchTasks({
                params: {
                    ...filter,
                },
            })
        );
    }, [dispatch, filter]);

    useEffect(() => {
        setFilter((prev) => ({
            ...prev,
            q: q ? q : undefined,
            _limit: limit ? limit : undefined,
            _page: page ? page : undefined,
            _sort: sort.field ? sort.field : undefined,
            _order: sort.order ? sort.order : undefined,
        }));
    }, [q, limit, page, sort]);

    // console.log("tasks", tasks);

    const handleAccept = (id) => {
        dispatch(updateTaskStatus({ id, status: "accepted" }));
    };

    const handleReject = (id) => {
        dispatch(updateTaskStatus({ id, status: "rejected" }));
    };

    const columns = [
        {
            id: "title",
            label: "Title",
            field_name: "title",
            render: ({ row }) => row.title, // [.title === key name given in row of data. ]
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
        <>
            {/* Limit & Search */}
            <div className="flex justify-between mb-4">
                <div className="flex items-center">
                    <select
                        value={limit}
                        className="border border-gray-300 rounded-lg px-2 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                        onChange={(e) => {
                            setLimit(e.target.value);
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
                <div className="flex items-center">
                    <label htmlFor="search" className="font-medium">
                        Search:
                    </label>
                    <input
                        type="text"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
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
            <div>
                <p>
                    Showing 1 to {limit} of {tasks.length} entries
                </p>
                <div className="flex justify-end items-center gap-4 mt-4">
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
        </>
    );
};

export default NewSample;
