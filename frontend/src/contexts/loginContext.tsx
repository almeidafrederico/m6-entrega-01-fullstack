import api from "@/pages/services/api";
import { ILogin, IProviderProps } from "@/types/login";
import { useToast, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { createContext, useContext } from "react";

interface iLoginProviderData {
  login: (userData: ILogin) => void;
}

const LoginContext = createContext<iLoginProviderData>(
  {} as iLoginProviderData
);

export const LoginProvider = ({ children }: IProviderProps) => {
  const router = useRouter();
  const toast = useToast();
  const login = async (userData: ILogin) => {
    await api
      .post("/login", userData)
      .then((res) => {
        setCookie(null, "token", res.data.token, {
          maxAge: 60 * 30,
          path: "/",
        });
        toast({
          title: "sucess",
          variant: "solid",
          position: "top-left",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"green.500"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Login realizado com sucesso !
            </Box>
          ),
        });
        router.push("/contact");
      })
      .catch((err) => {
        toast({
          title: "error",
          variant: "solid",
          position: "top-left",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"red.500"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Erro ao logar, verifique se o e-mail e senha estão corretos
            </Box>
          ),
        });
      });
  };

  return (
    <LoginContext.Provider value={{ login }}>{children}</LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
