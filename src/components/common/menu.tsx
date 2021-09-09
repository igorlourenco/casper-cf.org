import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface MenuProps {
  account: string;
  deactivate: () => void;
}

const Menu = ({ account, deactivate }: MenuProps) => {
  const router = useRouter();

  return (
    <ChakraMenu>
      <MenuButton
        colorScheme="blue"
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
