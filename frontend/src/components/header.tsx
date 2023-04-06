import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";

interface iHeader {
  header: string;
  btnCadastrar: boolean;
  btnLogout: boolean;
}

const Header = ({ header, btnCadastrar, btnLogout }: iHeader) => {
  const router = useRouter();
  const logoutSubmit = () => {
    destroyCookie(null, "token");
    router.push("/");
  };

  return (
    <>
      <Box bg={"green.300"} px={10} marginBottom={5}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box
            textTransform="uppercase"
            color={"black"}
            border={"2px"}
            borderRadius={"10px"}
            padding={2}
          >
            LIST PROJECT {header ? " -- " : ""}
            {header}
          </Box>
          {btnCadastrar ? <Button>CADASTRAR CONTATO</Button> : <></>}
          {btnLogout ? (
            <Button onClick={logoutSubmit} colorScheme="teal" variant="outline">
              LOGOUT
            </Button>
          ) : (
            <></>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Header;
