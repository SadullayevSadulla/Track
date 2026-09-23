import { Certeficat } from "../pages/certeficat/certeficat";
import Contacts from "../pages/Contacts/contacts";
import Favorit from "../pages/Favorit/favorit";
import Foto from "../pages/Foto/foto";
import Hamkor from "../pages/Hamkor/hamkor";
import Home from "../pages/Home/home";
import Information from "../pages/Information/information";
import Katolg from "../pages/Katolg/katolg";
import Kredit from "../pages/Kredit/kredit";
import MainNewsCard from "../pages/mainNewsCard/mainNewsCard";
import News from "../pages/News/news";
import Onac from "../pages/Onac/oNac";
import { Otqaz } from "../pages/Otqaz/otqaz";
import Production from "../pages/Production/production";
import Reklama from "../pages/Reklama/reklama";
import Repair from "../pages/Repair/repair";
import Service from "../pages/Service/service";
import Vaqansiva from "../pages/vaqansiva/vaqansiva";
import Vido from "../pages/Video/vido";

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
        id: 7,
        path: '/onac',
        element: <Onac />
    },
    {
        id: 8,
        path: '/information',
        element: <Information />
    },
    {
        id: 9,
        path: '/mainNewsCard',
        element: <MainNewsCard />
    },
    {
        id: 10,
        path: '/foto',
        element: <Foto />
    },
    {
        id: 11,
        path: '/vido',
        element: <Vido />
    },
    {
        id: 12,
        path: '/reklama',
        element: <Reklama />
    },
    {
        id: 13,
        path: '/hamkor',
        element: <Hamkor />
    },
    {
        id: 14,
        path: '/certeficat',
        element: <Certeficat />
    },
    {
        id: 15,
        path: '/vaqansiya',
        element: <Vaqansiva />
    },
    {
        id: 16,
        path: '/kredit',
        element: <Kredit />
    },
    {
        id: 17,
        path: '/production',
        element: <Production/>
    },
    {
        id: 18,
        path: '/favorit',
        element: <Favorit/>
    },
    {
        id: 19,
        path: '/otqaz',
        element: <Otqaz/>
    }
]