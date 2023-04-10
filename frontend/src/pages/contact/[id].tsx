import iContact from "@/types/contact";
import { GetServerSideProps, NextPage } from "next";
import api from "../../services/api";
import nookies from "nookies";
import Header from "@/components/header";
import ContactCard from "@/components/contactCard";
import { Center } from "@chakra-ui/react";

interface Props {
  contact: iContact;
}

const Contact: NextPage<Props> = ({ contact }) => {
  return (
    <>
      <Header header={contact.fullName} btnCadastrar={false} btnLogout={true} />
      <Center>
        <ContactCard contact={contact} />
      </Center>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const id = ctx.params!.id;
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
  const response = await api.get(`/contact/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const contact: iContact = response.data;
  return { props: { contact } };
};

export default Contact;
