import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../contexts/AuthProvider"

const PrivateRoute = ({ children }) => {
        const { user, loading } = useContext(AuthContext)
        const location = useLocation()

        if(loading){
            return <Loading/>
        }

        if(user){
            return children
        }

        return <Navigate to='/login' state={{ from: location }} replace />
}

const Loading = () => {
    return (
        <>
            <p>Loading...</p>
        </>
    )
}

export default PrivateRoute