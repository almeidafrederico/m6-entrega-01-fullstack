import { useToastForm } from "@/contexts/toastContext";
import api from "@/services/api";
import { iContact } from "@/types/contact";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

interface iProps {
  contact: iContact;
}

const ModalContactDelete = ({ contact }: iProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const cookies = parseCookies();
  const { toast } = useToastForm();

  const deleteSubmit = async () => {
    try {
      const responde = await api.delete(`/contact/${contact.id}`, {
        headers: { Authorization: `Bearer ${cookies["token"]}` },
      });
      if (responde.status) {
        toast({
          title: "sucess",
          message: `DELETADO`,
          position: "top-left",
          color: "red.500",
        });
      } else {
        toast({
          title: "error",
          message: `Error ao Deletar`,
          position: "top-left",
          color: "red.500",
        });
      }
    } catch (error) {
      toast({
        title: "error",
        message: `Error na API ao Deletar`,
        position: "top-left",
        color: "red.500",
      });
    }
    onClose();
    router.push("/contact");
  };
  return (
    <>
      <Button onClick={onOpen}>DELETE</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>DESEJAR DELETAR </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>
                Tem certeza que quer deletar o contato "{contact.fullName}"
              </FormLabel>
            </FormControl>
          </ModalBody>
          <Box marginBottom={5}>
            <Flex justifyContent="space-around" marginTop={5}>
              <Button backgroundColor={"green"} onClick={deleteSubmit}>
                SIM
              </Button>
              <Button backgroundColor={"red"} onClick={onClose}>
                NAO
              </Button>
            </Flex>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalContactDelete;
