import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Create from "../utils/PopupComp/Create";
import Edit from "../utils/PopupComp/Edit";
import Container from "../utils/Container";
import { fetchTasks } from "../redux/slices/task.slice";
import CustomTableCopy from "../shared/table/table";
import useSearch from "../hooks/useSearch";
import useLimit from "../hooks/useLimit";
import usePage from "../hooks/usePage";
import useDebounce from "../hooks/useDebounce";
import useSortFilter from "../hooks/useSortFilter";
import CustomDateRangePicker from "../shared/datepicker";
import CustomPagination from "../shared/pagination";
import CustomSelect from "../shared/select";

const UserDashboard = () => {
    const { currentUser } = useSelector((state) => state.users);
    const tasks = useSelector((state) => state.tasks.items);
    const [filter, setFilter] = useState({ userId: currentUser.userId });

    const dispatch = useDispatch();
    const { q, setQ } = useSearch();
    const { limit, setLimit } = useLimit();
    const { page, setPage } = usePage();
    const { sort, handleSort } = useSortFilter();

    const debouncedValue = useDebounce(q, 400);

    useEffect(() => {
        setFilter((prev) => ({
            ...prev,
            q: debouncedValue ? debouncedValue : undefined,
            _limit: limit ? limit : undefined,
            _page: page ? page : undefined,
            _sort: sort.field ? sort.field : undefined,
            _order: sort.order ? sort.order : undefined,
        }));
    }, [debouncedValue, limit, page, sort, setFilter]);

    useEffect(() => {
        dispatch(
            fetchTasks({
                params: {
                    ...filter,
                },
            })
        );
    }, [dispatch, filter]);

    const handleDateRangeChange = useCallback(
        ({ start, end }) => {
            setFilter((prev) => ({
                ...prev,
                dueDate_gte: start || undefined,
                dueDate_lte: end || undefined,
            }));
        },
        [setFilter]
    );

    const columns = useCallback(
        () => [
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
        ],
        []
    );

    return (
        <>
            <Container className="flex flex-col space-y-6">
                {/* Table */}
                <div className="flex items-center justify-between">
                    <h2 className="text-black900 mb-2 text-2xl font-bold">My Tasks</h2>
                    <Create />
                </div>
                {/* Limit, Date Range & Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <CustomSelect limit={limit} setLimit={setLimit} setPage={setPage} />
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
                    <CustomPagination
                        limit={limit}
                        page={page}
                        setPage={setPage}
                        tasks={tasks}
                    />
                </div>
            </Container>
        </>
    );
};

export default UserDashboard;
