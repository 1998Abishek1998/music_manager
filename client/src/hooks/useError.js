import { useNotify } from './useNotify';

export const useErrorNotify = () => {
  const { notify } = useNotify();

  const errorNotify = ({ description, error }) => {
    if (error && error.errors) {
      const errMessage = Object.entries(error.errors)

      notify({
        message: `Error in ${errMessage[0][0]}`,
        description: errMessage[0][1],
        type: "error",
        duration: 4.5,
      });
    } else {
      notify({
        message: "Error",
        description,
        type: "error",
        duration: 4.5,
      });
    }
  };

  return errorNotify;
};
