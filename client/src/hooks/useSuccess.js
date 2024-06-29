import { useNotify } from './useNotify';

export const useSuccessNotify = () => {
  const { notify } = useNotify();

  const successNotify = ({ message = 'Success', description, duration = 4.5 }) => {
    notify({
      message,
      description,
      type: 'success',
      duration,
    });
  };

  return successNotify;
};
