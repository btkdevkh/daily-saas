import { toast } from "react-toastify";

const notify = (
  success: boolean,
  message: string,
  toastId: string,
  autoClose: number = 5000
) => {
  if (success) {
    toast.success(message, {
      toastId,
      pauseOnHover: false,
      autoClose: autoClose,
      className: "toast-compact",
      position: "bottom-center",
    });
  } else {
    toast.error(message, {
      toastId,
      pauseOnHover: false,
      autoClose: autoClose,
      className: "toast-compact",
      position: "bottom-center",
    });
  }
};

export { notify };
