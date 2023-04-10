import { useToastForm } from "@/contexts/toastContext";
import api from "@/services/api";
import { iContact, iContactRegister } from "@/types/contact";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

interface iProps {
  token: string;
}

const ModalRegisterContact: NextPage<iProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toast } = useToastForm();
  const cookies = parseCookies();
  const router = useRouter();

  const formschame = yup.object().shape({
    fullName: yup.string().required("Nome completo obrigatório"),
    email: yup
      .string()
      .email("Deve ser um e-mail válido")
      .required("E-mail obrigatório"),
    telephone: yup.string().required("Nome completo obrigatório"),
  });

  const [inputFullName, setInputFullname] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputTelephone, setInputTelephone] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iContactRegister>({
    resolver: yupResolver(formschame),
  });

  const onFormSubmit = async (Data: iContactRegister) => {
    try {
      if (!cookies["token"]) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      const response = await api.post("/contact", Data, {
        headers: { Authorization: `Bearer ${cookies["token"]}` },
      });
      if (response.status === 201) {
        toast({
          title: "sucess",
          message: `Contato cadastro com SUCESSO!`,
          position: "top-left",
          color: "green.500",
        });
        router.push("/contact");
        onClose();
      } else {
        toast({
          title: "error",
          message: `${response.data.message}`,
          position: "top-left",
          color: "green.500",
        });
      }
    } catch (error) {
      toast({
        title: "error",
        message: `Erro na API`,
        position: "top-left",
        color: "green.500",
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>CADASTRAR CONTATO</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>CADASTRE UM CONTATO</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nome completo</FormLabel>
              <Input
                required
                type="fullName"
                {...register("fullName")}
                onChange={(e) => setInputFullname(e.target.value)}
              />
            </FormControl>
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
            <Button variant={"ghost"} onClick={handleSubmit(onFormSubmit)}>
              CADASTRAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRegisterContact;
