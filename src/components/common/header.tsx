import { Flex, Image } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";

import LoginButton from "./login-button";
import Menu from "./menu";

const Header = () => {
  const { deactivate, account } = useEthers();

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Image src="/images/logo.svg" alt="logo" height="50px" />
      {account ? (
        <Menu deactivate={deactivate} account={account} />
      ) : (
        <LoginButton />
      )}
    </Flex>
  );
};

export default Header;
