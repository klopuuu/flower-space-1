import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

// user.isAuth && 
const AppRouter = observer(() => {
    const {user} = useContext(Context)
    console.log(user.isAuth)
    {publicRoutes.map(({path, Component}) =>
                console.log(path, Component)
    )}
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component} exact></Route>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component} exact></Route>
            )}
        </Routes>
    )
})

export default AppRouter;