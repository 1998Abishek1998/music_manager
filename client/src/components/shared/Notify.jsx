import { createContext, useMemo } from 'react';
import { notification } from 'antd';

export const NotificationContext = createContext();

// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const notify = ({ message, description, type = 'info', duration = 4.5 }) => {
    api[type]({
      message: message || 'Notification Title',
      description: description || 'This is the default description.',
      duration,
    });
  };

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
