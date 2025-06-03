import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Users from './components/Users';

const App = () => {
  return (
    <>
      <Navbar />
      <Users />
    </>
  );
};

export default App;

