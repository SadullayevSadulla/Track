import { Certeficat } from "../pages/certeficat/certeficat";
import Cart from "../pages/Cart/cart";
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
import CatalogPage from "../pages/Katolg/Catalog/catalog";
import CatalogCran from "../pages/Katolg/CatalogKran/catalogCran";
import CatalogFuel from "../pages/Katolg/CatalogFuel/catalogFuel";
import CatalogAwp from "../pages/Katolg/CatalogAwp/catalogAwp";
import CatalogWater from "../pages/Katolg/CatalogWater/catalogWater";
import CatalogEvkrator from "../pages/Katolg/CatalogEvkrator/catalogEvkrator";
import CatalogBord from "../pages/Katolg/CatalogBord/catalogBord";
import CatalogFurgon from "../pages/Katolg/CatalogFurgon/catalogFurgon";
import CatalogCanto from "../pages/Katolg/CatalogCanto/catalogCanto";
import CatalogIl from "../pages/Katolg/CatalogIL/catalogIl";
import SearchPage from "../pages/Search/search";
import CatalogYuk from "../pages/Katolg/CatalogYuk/catalogYuk";
import CatalogDopt from "../pages/Katolg/CatalogDopt/catalogDopt";

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
        element: <Production />
    },
    {
        id: 18,
        path: '/favorit',
        element: <Favorit />
    },
    {
        id: 19,
        path: '/Отзывы',
        element: <Otqaz />
    },
    {
        id: 20,
        path: '/cart',
        element: <Cart />
    },
    {
        id: 21,
        path: '/CatalogPage',
        element: <CatalogPage />
    },
    {
        id: 23,
        path: '/CatalogKran',
        element: <CatalogCran />
    },
    {
        id: 24,
        path: '/CatalogFuel',
        element: <CatalogFuel />
    },
    {
        id: 25,
        path: '/CatalogAwp',
        element: <CatalogAwp />
    },
    {
        id: 26,
        path: '/CatalogWater',
        element: <CatalogWater />
    },
    {
        id: 27,
        path: '/CatalogEvkrator',
        element: <CatalogEvkrator />
    },
    {
        id: 28,
        path: '/CatalogBord',
        element: <CatalogBord />
    },
    {
        id: 29,
        path: '/CatalogFurgon',
        element: <CatalogFurgon />
    },
    {
        id: 30,
        path: '/CatalogCanto',
        element: <CatalogCanto />
    },
    {
        id: 31,
        path: '/CatalogIL',
        element: <CatalogIl />
    },
    {
        id: 32,
        path: '/CatalogIl',
        element: <CatalogIl />
    },
    {
        id: 33,
        path: '/search',
        element: <SearchPage />
    },
    {
        id: 34,
        path: '/CatalogYuk',
        element: <CatalogYuk />
    },
    {
        id: 35,
        path: '/CatalogDopt',
        element: <CatalogDopt />
    },
]