import { toast } from "react-toastify";

export const handleError = (error) => {
  console.log(error?.data?.message);
  toast.error(error?.data?.message);
};
