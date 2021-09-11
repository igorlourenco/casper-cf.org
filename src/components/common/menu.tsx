import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import CasperButton from "./casper-button";

interface MenuProps {
  account: string;
  deactivate: () => void;
}

const Menu = ({ account, deactivate }: MenuProps) => {
  const router = useRouter();

  return (
    <ChakraMenu>
      <MenuButton
        shadow="lg"
        borderRadius="xl"
        bgGradient="linear(to-br, blue.500, blue.400)"
        fontWeight="semibold"
        color="white"
        _hover={{ bgGradient: "linear(to-tr, blue.500, blue.400)" }}
        _active={{ bgGradient: "linear(to-tr, blue.500, blue.400)" }}
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {account.slice(0, 6)}...
        {account.slice(account.length - 4, account.length)}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => router.push("/my-fundings")}>
          My Fundings
        </MenuItem>
        <MenuItem onClick={() => router.push("/funding/create")}>
          Create Funding
        </MenuItem>
        <MenuItem size="sm" onClick={() => deactivate()}>
          Disconnect
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  );
};

export default Menu;
