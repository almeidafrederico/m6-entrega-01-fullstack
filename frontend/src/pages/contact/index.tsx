import { iContact } from "@/types/contact";
import { GetServerSideProps, NextPage } from "next";
import api from "../../services/api";
import { Center, Link, List, ListItem, OrderedList } from "@chakra-ui/react";
import NextLink from "next/link";
import nookies from "nookies";
import Header from "@/components/header";
import ContactListCard from "@/components/contactListCard";

interface Props {
  contacts: iContact[];
}

const Contacts: NextPage<Props> = ({ contacts }) => {
  return (
    <>
      <Header header="CONTACTS" btnCadastrar={true} btnLogout={true} />
      <Center>
        <List>
          {contacts.map((contact, index) => {
            return (
              <>
                <ContactListCard contact={contact} index={index} />
              </>
            );
          })}
        </List>
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
