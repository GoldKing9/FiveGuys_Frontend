import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  text: string;
  type: string;
}

const autoClose = 1000;

export const notify = ({ type, text }: Props) => {
  switch (type) {
    case "Success":
      toast.success(text);
      break;
    case "Error":
      toast.error(text);
      break;
  }
};

const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={autoClose}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"
    />
  );
};

export default Toast;