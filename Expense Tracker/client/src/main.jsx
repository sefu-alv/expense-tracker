import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Error from './pages/Error.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Income from './pages/Income.jsx'
import Expense from './pages/Expense.jsx'
import Debt from './pages/Debt.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error/>,
    children:[
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/income',
        element: <Income />
      }, {
        path: '/expense',
        element: <Expense />
      }, {
        path: '/debt',
        element: <Debt />
      }, {
        path: '/dashboard',
        element: <Dashboard />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);