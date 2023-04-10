import { useToastForm } from "@/contexts/toastContext";
import api from "@/services/api";
import { iContact, iContactUpdate } from "@/types/contact";
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
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface iProps {
  contact: iContact;
}

const ModalContactUpdate = ({ contact }: iProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toast } = useToastForm();
  const cookies = parseCookies();
  const router = useRouter();

  const formschame = yup.object().shape({
    fullName: yup.string(),
    email: yup.string().email("Deve ser um e-mail válido"),
    telephone: yup.string(),
  });

  const [inputFullName, setInputFullname] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputTelephone, setInputTelephone] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iContactUpdate>({ resolver: yupResolver(formschame) });

  const onFormSubmit = async (Data: iContactUpdate) => {
    try {
      if (!cookies["token"]) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      const response = await api.patch(`/contact/${contact.id}`, Data, {
        headers: { Authorization: `Bearer ${cookies["token"]}` },
      });
      if (response.status === 202) {
        toast({
          title: "sucess",
          message: `Contato alterado com SUCESSO!`,
          position: "top-left",
          color: "green.500",
        });
        router.push(`/contact/${contact.id}`);
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
      <Button onClick={onOpen}>MODIFICAR</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ALTERAR CONTATO</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nome completo</FormLabel>
              <Input
                defaultValue={contact.fullName}
                type="fullName"
                {...register("fullName")}
                onChange={(e) => setInputFullname(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>E-mail</FormLabel>
              <Input
                defaultValue={contact.email}
                type="email"
                {...register("email")}
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Telefone</FormLabel>
              <Input
                defaultValue={contact.telephone}
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

export default ModalContactUpdate;
