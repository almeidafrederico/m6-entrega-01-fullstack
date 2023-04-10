import { useToastForm } from "@/contexts/toastContext";
import api from "@/services/api";
import { iContact } from "@/types/contact";
import { Box, Button, Flex, Link, ListItem, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import ModalContactDelete from "./modalContactDelete";

interface iContactListCard {
  contact: iContact;
  index: number;
}

const ContactListCard = ({ index, contact }: iContactListCard) => {
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
    router.push("/contact");
  };

  return (
    <>
      <ListItem key={index}>
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          marginBottom={2}
          minWidth={250}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Link
              px={2}
              fontSize={18}
              as={NextLink}
              href={`/contact/${contact.id}`}
            >
              <Flex border={2} borderColor={"black"}>
                <Text>{contact.fullName}</Text>
              </Flex>
            </Link>
            <ModalContactDelete contact={contact} />
          </Flex>
        </Box>
      </ListItem>
    </>
  );
};

export default ContactListCard;
