import React, { forwardRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainerWrapper } from "@/components/ToastNotification/ToastNotification.styled"

  const toastOptions = {
    position: "top-right",
    color:"white",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }
   
const handleSuccessToast = (message: string) => {
    toast.success(message, toastOptions);
  };
  
  const handleWarningToast = (message: string) => {
    toast.warning(message, toastOptions);
  };
  
  const handleErrorToast = (message: string) => {
    toast.error(message, toastOptions);
  };
  
type ToastNotificationProps = {};

const ToastNotification = forwardRef<HTMLDivElement, ToastNotificationProps>(
    (props, ref) => {
      return (
        <ToastContainerWrapper ref={ref}>
        <ToastContainer
          position={toastOptions.position}
          autoClose={toastOptions.autoClose}
          hideProgressBar={toastOptions.hideProgressBar}
          newestOnTop={false}
          closeOnClick={toastOptions.closeOnClick}
          rtl={false}
          pauseOnFocusLoss
          draggable={toastOptions.draggable}
          pauseOnHover={toastOptions.pauseOnHover}
        />
      </ToastContainerWrapper>
    );
}
);

export { ToastNotification, handleSuccessToast, handleWarningToast, handleErrorToast };