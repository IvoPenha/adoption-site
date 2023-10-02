import { useAuth } from "../../hooks"
import { ComponentType } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { CommonUsuarioClaims } from '../../types/CommonUsuario'

type Props = {
  component: ComponentType,
}

const ProtectedRoute: React.FC<Props> = ({component: RouteComponent}) => {
  const location = useLocation()
  const { getCurrentAccount } = useAuth()

  const currentAccount = getCurrentAccount<CommonUsuarioClaims>()

  if (currentAccount === undefined) {
    return <Navigate to="/login" replace state={{ from: location }}/>
  }

  return <RouteComponent />
}

export default ProtectedRoute
