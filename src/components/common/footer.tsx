import { Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { FaTwitter, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <Flex px={4} py={6} alignItems="center" justifyContent="space-between">
      <Text>FTM Funding</Text>
      <Flex gridGap={2}>
        <FaTwitter size={32} color="#1DA1F2" />
        <FaDiscord size={32} color="#5865F2" />
      </Flex>
    </Flex>
  );
};

export default Footer;
