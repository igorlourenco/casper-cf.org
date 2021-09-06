import { Flex, Text } from "@chakra-ui/layout";
import StartFunding from "../funding/start-funding";
import { useEthers, useConfig } from "@usedapp/core";
import { useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import LoginButton from "./login-button";

interface LoggedInHeaderProps {
  pathname: string;
  account: string;
  deactivate: () => void;
}

const LoggedInHeader = ({
  pathname,
  account,
  deactivate,
}: LoggedInHeaderProps) => {
  return pathname === "/" ? (
    <StartFunding />
  ) : (
    <Menu>
      <MenuButton
        colorScheme="purple"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {account.slice(0, 6)}...
        {account.slice(account.length - 4, account.length)}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => deactivate()}>Your Projects</MenuItem>
        <MenuItem size="sm" onClick={() => deactivate()}>
          Disconnect
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const Header = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const router = useRouter();
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
        <LoggedInHeader
          pathname={router.pathname}
          deactivate={deactivate}
          account={account}
        />
      ) : (
        <LoginButton />
      )}
    </Flex>
  );
};

export default Header;
