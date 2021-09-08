import { Flex, Text } from "@chakra-ui/layout";
import { useEthers } from "@usedapp/core";

import LoginButton from "./login-button";
import Menu from "./menu";

const Header = () => {
  const { deactivate, account } = useEthers();

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text>FTM Funding</Text>
      {account ? (
        <Menu deactivate={deactivate} account={account} />
      ) : (
        <LoginButton />
      )}
    </Flex>
  );
};

export default Header;
