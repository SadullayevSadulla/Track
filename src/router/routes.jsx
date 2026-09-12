import Contacts from "../pages/Contacts/contacts";
import Home from "../pages/Home/home";
import Katolg from "../pages/Katolg/katolg";
import News from "../pages/News/news";
import Onac from "../pages/Onac/oNac";
import Repair from "../pages/Repair/repair";
import Service from "../pages/Service/service";

export const router = [
    {
        id: 1,
        path: '/',
        element: <Home />,
    },
    {
        id: 2,
        path: '/service',
        element: <Service />,
    },
    {
        id: 3,
        path: '/repair',
        element: <Repair />,
    },
    { 
        id: 4,
        path: '/news',
        element: <News />,
    }, 
    {
        id: 5,
        path: '/contacts',
        element: <Contacts />,
    },
    {
        id: 6,
        path: '/katolg',
        element: <Katolg />,
    },
    {
        id:7,
        path:'/onac',
        element:<Onac/>
    }
]