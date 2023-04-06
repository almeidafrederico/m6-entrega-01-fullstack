import iContact from "@/types/contact";
import { GetServerSideProps, NextPage } from "next";
import api from "../services/api";
import {
  Center,
  Link,
  List,
  ListIcon,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import ContactCard from "@/components/contactCard";
import nookies from "nookies";
import Header from "@/components/header";

interface Props {
  contacts: iContact[];
}

const Contacts: NextPage<Props> = ({ contacts }) => {
  return (
    <>
      <Header header="CONTACTS" btnCadastrar={true} btnLogout={true} />
      <Center>
        <OrderedList>
          {contacts.map((contact, index) => {
            return (
              <ListItem
                key={index}
                margin={4}
                width={200}
                border={2}
                color="blue"
              >
                <Link px={10} as={NextLink} href={`/contact/${contact.id}`}>
                  {contact.fullName}
                </Link>
              </ListItem>
            );
          })}
        </OrderedList>
      </Center>
    </>
  );
};

export default Contacts;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const cookies = nookies.get(ctx);
  if (!cookies["token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const token = cookies["token"];
  const response = await api.get("/contact", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const contacts: iContact[] = response.data;
  return { props: { contacts } };
};
