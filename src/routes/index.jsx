import React from 'react'
import useRoute from '../hooks/useRoute'
import { Route, Routes } from 'react-router'

const Routing = () => {

    const { privateRoutes, publicRoutes } = useRoute()

    return (
        <Routes>
            {/* Auth routes */}
            <Route element={<WithAuth />}>
                {publicRoutes.map(({ id, element: Component, path, ...otherData }) => (
                    <Route key={id} path={path} element={<Component />} {...otherData} />
                ))}
            </Route>

            {/* Private routes */}
            <Route element={<WithUser />}>
                {privateRoutes.map(({ id, element: Component, path, ...otherData }) => (
                    <Route key={id} path={path} element={<Component />} {...otherData} />
                ))}
            </Route>

            {/* 404 route */}
            <Route path="*" element={<p>404 | Not Found</p>} />
        </Routes>
    )
}

export default Routing;