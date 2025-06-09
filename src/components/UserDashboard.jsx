// Task component for specific a user

import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Create, Delete, Edit } from "../utils/PopupComp";

const UserDashboard = () => {
    const { id } = useParams();
    console.log("id", id);

    const { items, currentUser, loading } = useSelector(state.users);

    return <div>Tasks</div>;
};

export default UserDashboard;
