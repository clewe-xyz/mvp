"use client";

import { ReactNode, createContext, useContext, useRef, useState } from "react";
import { ErrorToast } from "./ErrorToast";

type Props = {
  children: ReactNode;
};

const ToastsContext = createContext({
  displayErrorToast: (msg: string) => {},
  closeErrorToast: () => {},
});

export function ToastProvider({ children }: Props) {
  const [errorOpened, setErrorOpened] = useState(false);
  const [message, setMessage] = useState<string>();
  const toastTimer = useRef<NodeJS.Timer>();

  const displayErrorToast = (msg: string) => {
    clearTimeout(toastTimer.current);
    setErrorOpened(true);
    setMessage(msg);
    toastTimer.current = setTimeout(closeErrorToast, 7000);
  };

  const closeErrorToast = () => {
    setErrorOpened(false);
    setMessage(undefined);
  };

  return (
    <ToastsContext.Provider value={{ displayErrorToast, closeErrorToast }}>
      {children}
      {errorOpened ? (
        <ErrorToast onClose={closeErrorToast}>{message}</ErrorToast>
      ) : null}
    </ToastsContext.Provider>
  );
}

export function useToasts() {
  const { displayErrorToast } = useContext(ToastsContext);
  return { displayErrorToast };
}
