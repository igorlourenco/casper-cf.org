import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  FiLogOut,
  FiHeart,
  FiLayers,
  FiSun,
  FiMoon,
  FiBox,
} from "react-icons/fi";
import { analytics } from "../../utils/firebase";
import { logEvent } from "@firebase/analytics";
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
          onClick={() => {
            router.push("/fundraising/create");
            logEvent(analytics, "create_fundraising_clicked");
          }}
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
          icon={<FiBox />}
          onClick={() => {
            logEvent(analytics, "feedback_clicked");

            window.open(
              "https://indbc0lvsaq.typeform.com/to/jkg6RbYG",
              "_blank"
            );
          }}
        >
          Feedback
        </MenuItem>
        <MenuItem
          icon={<FiLogOut />}
          fontSize="sm"
          onClick={() => {
            logEvent(analytics, "logout_clicked");
            deactivate();
          }}
        >
          Disconnect
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  );
};

export default Menu;
