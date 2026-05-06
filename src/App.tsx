import { useLocation, useRoutes } from 'react-router'

import './App.css'
import Home from './pages/Home'
import ShowCreators from './pages/ShowCreators'
import AddCreator from './pages/AddCreator'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import Navbar from './components/Navbar'

function App() {

    const location = useLocation()

    let element = useRoutes([
        { path: "/", element: <Home /> },
        { path: "/creators", element: <ShowCreators /> },
        { path: "/creators/add", element: <AddCreator /> },
        { path: "/creators/:creatorId", element: <ViewCreator /> },
        { path: "/creators/:creatorId/edit", element: <EditCreator /> },
    ])

    return (
        <>
            {location.pathname !== "/" && <Navbar />}
            {element}
        </>
    )
}

export default App
