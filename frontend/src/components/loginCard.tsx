import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Box,
  Flex,
  Spacer,
  FormHelperText,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/login";
import { useState } from "react";
import ModalRegister from "./modalRegister";
import { useLogin } from "@/contexts/loginContext";

const LoginCard = () => {
  const { login } = useLogin();
  const formschame = yup.object().shape({
    email: yup
      .string()
      .email("Deve ser um e-mail válido")
      .required("E-mail obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const emailError = inputEmail === "";
  const passwordError = inputPassword === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(formschame),
  });

  const onFormSubmit = (formData: ILogin) => {
    login(formData);
  };

  return (
    <>
      <Center>
        <Box p="5" w="500px" borderWidth="1px">
          <FormControl isRequired isInvalid={!!errors.email?.message}>
            <FormLabel>E-mail</FormLabel>
            <Input
              required
              type="email"
              {...register("email")}
              onChange={(e) => setInputEmail(e.target.value)}
            />
            {!emailError ? (
              <FormHelperText>Digite seu e-mail</FormHelperText>
            ) : (
              <FormHelperText>{errors.email?.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.password?.message}>
            <FormLabel>Password</FormLabel>
            <Input
              required
              type="password"
              {...register("password")}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            {!passwordError ? (
              <FormHelperText>Digite seu password</FormHelperText>
            ) : (
              <FormHelperText>{errors.password?.message}</FormHelperText>
            )}
          </FormControl>
          <Flex
            minWidth="max-content"
            alignItems="center"
            gap="2"
            paddingTop="5"
          >
            <Button variant={"ghost"} onClick={handleSubmit(onFormSubmit)}>
              ENTRAR
            </Button>
            <Spacer />
            <ModalRegister />
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export { LoginCard };
