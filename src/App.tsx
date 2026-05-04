// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { useRoutes } from 'react-router'

import './App.css'
import Home from './pages/Home'
import ShowCreators from './pages/ShowCreators'
import AddCreator from './pages/AddCreator'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'

function App() {

    let element = useRoutes([
        { path: "/", element: <Home /> },
        { path: "/creators", element: <ShowCreators /> },
        { path: "/creators/add", element: <AddCreator /> },
        { path: "/creators/:creatorId", element: <ViewCreator /> },
        { path: "/creators/:creatorId/edit", element: <EditCreator /> },
    ])

    return element
}

export default App
