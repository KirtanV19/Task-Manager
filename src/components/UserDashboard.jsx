// Task component for specific a user

// UX Addition, listing of tasks with Edit and Delete method
// New Task button to create a task.

import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Create from "../utils/PopupComp/Create";
import Delete from "../utils/PopupComp/Delete";
import Edit from "../utils/PopupComp/Edit";

const UserDashboard = () => {
    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    console.log("currentUser", currentUser);

    return <div>Tasks</div>;
};

export default UserDashboard;
