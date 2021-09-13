import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
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
      px={[6, 6, 8, 16]}
      justifyContent="space-between"
    >
      <Heading
        bgGradient={useColorModeValue(
          "linear(to-l, blue.600, blue.800)",
          "linear(to-r, blue.200, blue.400)"
        )}
        bgClip="text"
        size="lg"
        cursor="pointer"
        onClick={() => router.push("/")}
      >
        Casper Fundraising
      </Heading>

      {account ? (
        <Menu deactivate={deactivate} account={account} />
      ) : (
        <LoginButton>Login to start funding</LoginButton>
      )}
    </Flex>
  );
};

export default Header;
