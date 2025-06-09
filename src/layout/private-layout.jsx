import withPrivate from "../hoc/with-Private";
import { Outlet } from "react-router-dom";

const PrivateLayout = withPrivate(Outlet);

export default PrivateLayout