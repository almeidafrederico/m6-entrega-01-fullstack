import { Box, ToastPosition, useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useContext } from "react";

interface iToast {
  title: "sucess" | "error";
  message: string;
  position: ToastPosition;
  color: string;
}

interface iToastProviderData {
  toast: (toastData: iToast) => void;
}

export interface IProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<iToastProviderData>(
  {} as iToastProviderData
);

export const ToastProvider = ({ children }: IProviderProps) => {
  const toastForm = useToast();
  const toast = async (toastData: iToast) => {
    await toastForm({
      title: toastData.title,
      variant: "solid",
      position: toastData.position,
      isClosable: true,
      render: () => (
        <Box
          color={"gray.200"}
          p={3}
          bg={toastData.color}
          fontWeight={"bold"}
          borderRadius={"md"}
        >
          {toastData.message}
        </Box>
      ),
    });
  };
  return (
    <ToastContext.Provider value={{ toast }}>{children}</ToastContext.Provider>
  );
};

export const useToastForm = () => useContext(ToastContext);
