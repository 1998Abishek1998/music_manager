import { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';

const useCanAccess = () => {
  const { roleId } = useContext(AuthContext)

  if (!roleId) {
    return () => false;
  }
  return (...resource) => {
    return resource.includes(roleId)
  };
};

export default useCanAccess;
