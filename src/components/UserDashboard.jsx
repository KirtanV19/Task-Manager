// Task component for specific a user


// UX Addition, listing of tasks with Edit and Delete method
// New Task button to create a task.


import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Create from '../utils/PopupComp/Create'

const UserDashboard = () => {

    const { currentUser } = useSelector((state) => state.users);
    console.log("currentUser", currentUser);
    const { id } = useParams();
    console.log("id", id);

    return <div>Tasks</div>;
};

export default UserDashboard;
