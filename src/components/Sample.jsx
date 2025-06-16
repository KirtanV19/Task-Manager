import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/task.slice";

// Update columns to use MUI DataGrid supported keys
const columns = [
    {
        field: "title",
        headerName: "Task",
        flex: 1,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
    },
    {
        field: "dueDate",
        headerName: "Due Date",
        flex: 1,
    },
    {
        field: "action",
        headerName: "Action",
        sortable: false,
        flex: 1,
        renderCell: ({ row }) => (
            <div className="flex items-center justify-between w-full">
                <button
                    className="bg-blue-600 text-white px-3 py-1 text-md rounded-md hover:bg-blue-700 transition"
                    // onClick={() => handleAccept(row.id)}
                    disabled={row.status === "accepted"}
                >
                    Accept
                </button>
                <button
                    className="bg-red-600 text-white px-3 py-1 text-md rounded-md hover:bg-red-700 transition"
                    // onClick={() => handleReject(row.id)}
                    disabled={row.status === "rejected"}
                >
                    Reject
                </button>
            </div>
        ),
    },
];

const paginationModel = { page: 0, pageSize: 5 };

const Sample = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks({}));
    }, [dispatch]);
    const tasks = useSelector((state) => state.tasks.items);
    console.log('tasks', tasks)
    return (
        <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={tasks}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
};

export default Sample;
