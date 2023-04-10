import { iContact } from "@/types/contact";
import { Badge, Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ModalContactUpdate from "./modalContactUpdate";

interface IContactCard {
  contact: iContact;
}

const ContactCard = ({ contact }: IContactCard) => {
  const router = useRouter();
  const backSubmit = () => {
    router.push("/contact");
  };

  return (
    <Box
      maxW="sm"
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      minWidth={350}
    >
      <Box p="6">
        <Box display="" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal" marginBottom={2}>
            {contact.fullName}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="18"
            ml="2"
          >
            E-mail: {contact.email}
          </Box>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="18"
            ml="2"
          >
            Telefone: {contact.telephone}
          </Box>
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            Created {String(contact.createdAt)}
          </Box>
          <Flex justifyContent="space-between" marginTop={5}>
            <Button onClick={backSubmit}>VOLTA</Button>
            <ModalContactUpdate contact={contact} />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactCard;
