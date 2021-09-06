import { Flex, Text } from "@chakra-ui/layout";
import { useEthers, useConfig } from "@usedapp/core";
import { useEffect } from "react";

import LoginButton from "./login-button";
import Menu from "./menu";

const Header = () => {
  const { deactivate, account } = useEthers();
  const config = useConfig();

  useEffect(() => {
    config.supportedChains = [...config.supportedChains, 250, 4002];

    if (account) {
      console.log({ account });
    }
  }, [account]);

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
