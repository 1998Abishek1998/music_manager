import { useContext } from 'react'
import RouteController from './RouteController'
import PropTypes from 'prop-types'
import { AuthContext } from '../../store/AuthContext'

function Protected({ children }) {

  const { isSignedIn } = useContext(AuthContext)
  if (!isSignedIn)
    return <RouteController />
  else {
    return children
  }

}

Protected.propTypes = {
  children: PropTypes.node
}

export default Protected
