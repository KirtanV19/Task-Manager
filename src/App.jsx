import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import Users from "./components/Users";
import Dashboard from "./components/Dashboard";
import Example from "./utils/PopupComp/Example";
import TaskForm from "./components/TaskForm";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/users" element={<Users />} />
      <Route path="/example" element={<Example />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/task" element={<TaskForm />} />
      <Route path="*" element={<h4>Page not found!!</h4>} />
    </Routes>
  </Router>
);

export default App;
