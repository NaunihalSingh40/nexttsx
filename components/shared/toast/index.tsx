import React, { useEffect } from "react";
import { toast_types } from "@/components/shared/toast/utils/toast"; // Assuming this is the correct path
import { ONDC_COLORS } from "@/components/shared/color";
import CrossIcon from "@/components/shared/svg/cross-icon";
import ToastError from "@/components/shared/svg/toast-error";
import ToastSuccess from "@/components/shared/svg/toast-success";
import styles from "./toast.module.scss";

type ToastType = keyof typeof toast_types; // This will create a union type: 'error' | 'success' | 'warning'

interface ToastProps {
  message: string;
  type: ToastType; // Use the ToastType here
  onRemove: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [onRemove]);

  return (
    <div className={`${styles.toast_position} d-flex align-items-center`}>
      <div
        className={styles.toast_type_wrapper}
        style={{
          backgroundColor:
            type === toast_types.error
              ? ONDC_COLORS.ERROR
              : type === toast_types.warning
              ? ONDC_COLORS.WARNING
              : ONDC_COLORS.SUCCESS, // Add a warning color style here
        }}
      >
        {type === toast_types.error ? (
          <ToastError width="25" height="25" color={ONDC_COLORS.WHITE} />
        ) : type === toast_types.warning ? (
          // Assuming you want to have an icon for warning
          <ToastError width="25" height="25" color={ONDC_COLORS.WHITE} />
        ) : (
          <ToastSuccess width="25" height="25" color={ONDC_COLORS.WHITE} />
        )}
      </div>
      <div className={styles.toast_message_wrapper}>
        <p className={styles.toast_message}>{message}</p>
      </div>
      <div className={styles.toast_remove_wrapper}>
        <CrossIcon style={{ cursor: "pointer" }} onClick={onRemove} />
      </div>
    </div>
  );
};

export default Toast;
