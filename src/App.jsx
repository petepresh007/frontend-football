import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./components/errorPage";
import { SharedLayout } from "./components/sharedlayout";
import { HomePage } from "./pages/homepage";
import { News } from "./pages/news";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { CreatedContext } from './components/constext';
import { CreateNews } from './components/createNews';
import { EPL } from "./pages/epl";
import { Laliga } from "./pages/laliga";
import { Bundesliga } from "./pages/bundesliga";
import { SerieA } from "./pages/seriea";
import { NPFL } from "./pages/npfl";
import { UCL } from "./pages/ucl";
import { About } from './pages/about';
import { Football } from "./pages/football";
import { Search } from "./components/search";
import { Bettips } from "./pages/bettips";
import {BetSingle} from './pages/betone';
import {Livescores} from "./pages/livescores";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/news/:id",
        element: <News />
      },
      {
        path: "/adminlogin",
        element: <Login />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/createnews",
        element: <CreateNews />
      },
      {
        path: "/epl",
        element: <EPL />
      },
      {
        path: "/laliga",
        element: <Laliga />
      },
      {
        path: "/bundesliga",
        element: <Bundesliga />
      },
      {
        path: "/seriea",
        element: <SerieA />
      },
      {
        path: "/npfl",
        element: <NPFL />
      },
      {
        path: "/ucl",
        element: <UCL />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: "/football",
        element: <Football />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/bettips",
        element: <Bettips />
      },
      {
        path:"/bet/:id",
        element: <BetSingle/>
      },
      {
        path:"/livescores",
        element: <Livescores/>
      }
    ]
  }
])



function App() {
  return (
    <CreatedContext>
      <RouterProvider router={router} >
      </RouterProvider>
    </CreatedContext>
  )
}

export default App