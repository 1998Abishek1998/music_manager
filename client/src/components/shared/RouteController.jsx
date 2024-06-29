import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { bearerTest } from '../../api/apiClient'
import Loading from './Loading'
import { AuthContext } from '../../store/AuthContext'

const RouteController = () => {
  const loading = true
  const navigate = useNavigate()

  const { toggleIsSignedIn } = useContext(AuthContext)

  const apiTest = async () => {
    const data = await bearerTest();
    return data
  }

  useEffect(() => {
    apiTest()
      .then(() => toggleIsSignedIn(true))
      .catch(() => {
        toggleIsSignedIn(false)
        navigate('/')
      })

    return () => apiTest()
  }, [navigate, toggleIsSignedIn])

  if (loading) return <Loading />
}

export default RouteController
