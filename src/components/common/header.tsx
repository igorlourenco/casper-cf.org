import { Flex, Text } from "@chakra-ui/layout";
import StartFunding from "../funding/start-funding";

const Header = () => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text>FTM Funding</Text>
      <StartFunding />
    </Flex>
  );
};

export default Header;
