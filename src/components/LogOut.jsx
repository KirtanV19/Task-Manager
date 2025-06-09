import React from 'react'
import { logout } from '../redux/slices/user.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

const LogOut = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = () => {
        dispatch(logout())
        navigate('/login')
    }
    return (
        <button className="px-3 py-1 rounded  hover:text-blue-800 hover:bg-blue-100 transition-all cursor-pointer" onClick={handleLogOut}>Log Out</button>
    )
}

export default LogOut