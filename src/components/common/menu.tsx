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
import { FiLogOut, FiHeart, FiLayers, FiSun, FiMoon } from "react-icons/fi";

interface MenuProps {
  account: string;
  deactivate: () => void;
}

const Menu = ({ account, deactivate }: MenuProps) => {
  const router = useRouter();
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <ChakraMenu>
      <MenuButton
        shadow="lg"
        bgGradient="linear(to-br, blue.500, blue.400)"
        fontWeight="semibold"
        color="white"
        textTransform="uppercase"
        fontFamily="Goldman"
        _hover={{ bgGradient: "linear(to-tr, blue.500, blue.400)" }}
        _active={{ bgGradient: "linear(to-tr, blue.500, blue.400)" }}
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {account.slice(0, 6)}...
        {account.slice(account.length - 4, account.length)}
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<FiHeart />}
          onClick={() => router.push("/fundraising/create")}
        >
          Create Funding Project
        </MenuItem>
        <MenuItem
          icon={<FiLayers />}
          onClick={() => router.push("/my-fundraising-projects")}
        >
          My Fundraising Projects
        </MenuItem>

        <MenuItem
          icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
        >
          Change to {colorMode === "light" ? "dark" : "light"} mode
        </MenuItem>
        <MenuItem
          icon={<FiLogOut />}
          fontSize="sm"
          onClick={() => deactivate()}
        >
          Disconnect
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  );
};

export default Menu;
