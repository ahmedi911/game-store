import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Auth ,{PageType} from './pages/Auth.jsx'
import { CookiesProvider } from 'react-cookie';
import Addpost from './compo/Addpost.jsx'
import PostDetails from './cont/PostDetails.jsx'
import GameList from './compo/GameList.jsx';
import GameForm from './compo/GameForm';
import GameDetails from './compo/GameDetails';
import Cart from './compo/Cart';

const router = createBrowserRouter([{
  path:"/",element:<App/>
},
{
  path: "/login", element: <Auth pageType={PageType.LOGIN} />
},
{
  path: "/register", element: <Auth pageType={PageType.REGISTER} />
},
{
  path: "/add-post", element: <Addpost />
},
{
  path: "/posts/:id", element: <PostDetails/>
}
,
{
  path: "/games/new", element: <GameForm />
}
,
{
  path: "/games/:id", element: <GameDetails />
}
,
{
  path: "/cart", element: <Cart />
}
,
{
  path: "/games/:id/edit", element: <GameForm  />
}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
    <RouterProvider router={router}/>
    </CookiesProvider>
  </StrictMode>
)
