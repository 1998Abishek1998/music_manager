import { useContext } from 'react';
import { NotificationContext } from '../components/shared/Notify';

export const useNotify = () => useContext(NotificationContext);
