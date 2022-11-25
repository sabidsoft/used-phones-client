import { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loading from '../components/Loading'
import { AuthContext } from '../contexts/AuthProvider'
import DOMAIN_NAME from '../utilities/DOMAIN_NAME'

const AdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, isLoading] = useState(true)
    const location = useLocation()

    useEffect(() => {
        fetch(`${DOMAIN_NAME}/users/admin/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data.isAdmin)
                isLoading(false)
            })
            .catch(err => console.log(err))
    }, [user?.email])


    if(loading){
        return <Loading/>
    }

    if(isAdmin){
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace />
}

export default AdminRoute