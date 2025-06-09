import withPublic from "../hoc/with-Public";
import { Outlet } from "react-router-dom";

const PublicLayout = withPublic(Outlet);

export default PublicLayout