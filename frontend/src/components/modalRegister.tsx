import { useToastForm } from "@/contexts/toastContext";
import { UserRegisterContext } from "@/contexts/userRegisterContext";
import api from "@/pages/services/api";
import { iUserRegister } from "@/types/user";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const ModalRegister = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formschame = yup.object().shape({
    email: yup
      .string()
      .email("Deve ser um e-mail válido")
      .required("E-mail obrigatório"),
    username: yup.string().required("Username obrigatório"),
    password: yup.string().required("Senha obrigatória"),
    fullName: yup.string().required("Nome completo obrigatório"),
    telephone: yup.string().required("Nome completo obrigatório"),
  });

  const [inputEmail, setInputEmail] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputFullName, setInputFullname] = useState("");
  const [inputTelephone, setInputTelephone] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUserRegister>({
    resolver: yupResolver(formschame),
  });

  const { toast } = useToastForm();

  const onFormSubmit = async (Data: iUserRegister) => {
    try {
      const respApi = await api.post("/user", Data);
      if (respApi.status === 201) {
        toast({
          title: "error",
          message: `Usuario criado com SUCESSO!`,
          position: "top-left",
          color: "green.500",
        });
      }
    } catch (error: any) {
      toast({
        title: "error",
        message: `${error?.response.data.message}`,
        position: "top-left",
        color: "red.500",
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>CADASTRAR</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>CADASTRA-SE</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>E-mail</FormLabel>
              <Input
                required
                type="email"
                {...register("email")}
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                required
                type="username"
                {...register("username")}
                onChange={(e) => setInputUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                required
                type="password"
                {...register("password")}
                onChange={(e) => setInputPassword(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Fullname</FormLabel>
              <Input
                required
                type="fullName"
                {...register("fullName")}
                onChange={(e) => setInputFullname(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Telefone</FormLabel>
              <Input
                required
                type="telephone"
                {...register("telephone")}
                onChange={(e) => setInputTelephone(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleSubmit(onFormSubmit)}>
              CADASTRAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRegister;
