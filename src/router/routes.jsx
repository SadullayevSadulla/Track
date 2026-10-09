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
        path: '/catalog/Шторные-автомобили',
        element: <CatalogPage />
    },
    {
        id: 22,
        path: '/catalog/kran-manipulyatory',
        element: <CatalogCran />
    },
    {
        id: 23,
        path: '/catalog/toplivovozy',
        element: <CatalogFuel />
    },
    {
        id: 24,
        path: '/catalog/avtomobilnye-masterskie',
        element: <CatalogAwp />
    },
    {
        id: 25,
        path: '/catalog/vodovozy',
        element: <CatalogWater />
    },
    {
        id: 26,
        path: '/catalog/evakuatory',
        element: <CatalogEvkrator />
    },
    {
        id: 27,
        path: '/catalog/bortovye-avtomobili',
        element: <CatalogBord />
    },
    {
        id: 28,
        path: '/catalog/furgony',
        element: <CatalogFurgon />
    },
    {
        id: 29,
        path: '/catalog/cementovozy',
        element: <CatalogCanto />
    },
    {
        id: 30,
        path: '/catalog/il',
        element: <CatalogIl />
    },
    {
        id: 31,
        path: '/catalog/search',
        element: <SearchPage />
    },
    {
        id: 32,
        path: '/catalog/gruzoviki',
        element: <CatalogYuk />
    },
    {
        id: 33,
        path: '/catalog/dopolnitelnoe-oborudovanie',
        element: <CatalogDopt />
    },

    {
        id: 34,
        path: '/CatalogDopt',
        element: <CatalogDopt />
    },
]