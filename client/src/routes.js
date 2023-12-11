import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, CLIENTENV_ROUTE, CLIENT_BASE, BASE_FLOWERS, BOUQUETS, GUIDEFLOWER, ORDERS, HISTORY, INSPIRATION } from "./utils/consts";
import HomeFlower from "./pages/HomeFlower/HomeFlower";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import UserHomePage from "./pages/UserHomePage/UserHomePage";
import ClientBase from "./pages/ClientBase/ClientBase";
import BaseFlowers from "./pages/BaseFlowers/BaseFlowers";
import Bouquets from "./pages/Bouquets/Bouquets";
import GuideFlower from "./pages/GuideFlower/GuideFlower";
import Order from "./pages/Order/Order";
import History from "./pages/History/History";
import Inspiration from "./pages/Inspiration/Inspiration";

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: <HomeFlower/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Login/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <SignUp/>
    }
]

export const authRoutes = [
    {
        path: CLIENTENV_ROUTE,
        Component: <UserHomePage />
    },
    {
        path: CLIENT_BASE,
        Component: <ClientBase/>
    },
    {
        path: BASE_FLOWERS,
        Component: <BaseFlowers/>
    },
    {
        path: BOUQUETS,
        Component: <Bouquets/>
    },
    {
        path: GUIDEFLOWER,
        Component: <GuideFlower/>
    },
    {
        path: ORDERS,
        Component: <Order/>
    },
    {
        path: HISTORY,
        Component: <History/>
    },
    {
        path: INSPIRATION,
        Component: <Inspiration/>
    }
]