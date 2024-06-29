import { createContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [roleId, setRoleId] = useState(null)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const [artist, setArtists] = useState(null)

  const toggleIsSignedIn = useCallback((val) => {
    setIsSignedIn(val)
  }, [])

  useEffect(() => {
    const roleId = localStorage.getItem("roleId")
    setRoleId(roleId ? Number(roleId) : null)

    const userId = localStorage.getItem("userId")
    setUserId(userId ? Number(userId) : null)

    const art = localStorage.getItem("artist")
    setArtists(art ? JSON.parse(localStorage.getItem('artist')) : null)
  }, [])

  const handleSetAuth = useCallback((newToken, roleId, userId, artist) => {
    setRoleId(roleId)
    setUserId(userId)
    setArtists(artist)
    setIsSignedIn(true)
    localStorage.setItem('roleId', roleId)
    localStorage.setItem('userId', userId)
    localStorage.setItem('token', newToken)
    localStorage.setItem('artist', JSON.stringify(artist));
  }, []);

  const handleClearAuth = useCallback(() => {
    setRoleId(null)
    setIsSignedIn(false)
    setUserId(null)
    setArtists(null)
    localStorage.removeItem('token');
    localStorage.removeItem('roleId');
    localStorage.removeItem('userId');
    localStorage.removeItem('artist');
  }, []);


  return (
    <AuthContext.Provider value={{ isSignedIn, artist, roleId, userId, handleSetAuth, handleClearAuth, toggleIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
}

export { AuthProvider, AuthContext }
