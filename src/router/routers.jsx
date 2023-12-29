import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from "../pages/Dashboard"
import Login from '../pages/Login'
import ErrorPage from '../pages/ErrorPage'
import StatisticBoard from '../pages/Statistic'
import ProtectedRouter from './protectedRouter'
import Home from '../pages/Home'
import Loan from '../pages/Loan'
import Saving from '../pages/Saving'
import Budget from '../pages/Budget'
import Setting from '../pages/Setting'
import { getBalanceOverview } from '../api/budget.api'
import { useSelector } from 'react-redux'

export default function MyRouter() {
    const { user } = useSelector(state => state.user)
    const router = createBrowserRouter([
        {
            path: "/",
            element: <ProtectedRouter><Dashboard /></ProtectedRouter>,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "home",
                    element: <ProtectedRouter><Home /></ProtectedRouter>,
                    // loader: async () => await getStatistics()
                },
                {
                    path: "statistic",
                    element: <ProtectedRouter><StatisticBoard /></ProtectedRouter>,
                    // loader: async () => await getStatistics()
                },
                {
                    path: "loan",
                    element: <ProtectedRouter><Loan /></ProtectedRouter>,
                    // loader: async () => await getStatistics()
                },
                {
                    path: "savings",
                    element: <ProtectedRouter><Saving /></ProtectedRouter>,
                    // loader: async () => await getStatistics()
                },
                {
                    path: "budget",
                    element: <ProtectedRouter><Budget /></ProtectedRouter>,
                    // loader: async () => await getBalanceOverview(user.id),
                },
                {
                    path: "settings",
                    element: <ProtectedRouter><Setting /></ProtectedRouter>,
                    // loader: async () => await getStatistics()
                },
            ]
        },
        {
            path: "/login",
            element: <Login />
        },
    ])
    return (
        <RouterProvider router={router} />
    )
}
