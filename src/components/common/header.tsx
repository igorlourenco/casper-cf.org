import { Flex, Image } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { useRouter } from "next/router";
import LoginButton from "./login-button";
import Menu from "./menu";

const Header = () => {
  const { deactivate, account } = useEthers();
  const router = useRouter();

  return (
    <Flex
      alignItems="center"
      shadow="sm"
      py={2}
      px={16}
      justifyContent="space-between"
    >
      <Image
        onClick={() => router.push("/")}
        src="/images/logo.svg"
        cursor="pointer"
        alt="logo"
        height="50px"
      />
      {account ? (
        <Menu deactivate={deactivate} account={account} />
      ) : (
        <LoginButton />
      )}
    </Flex>
  );
};

export default Header;
