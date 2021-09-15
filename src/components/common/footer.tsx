import { Flex, Heading, Stack, Image, Text } from "@chakra-ui/react";
import { FaTwitter, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <Flex
      borderTopColor="gray.200"
      borderTopStyle="solid"
      borderTopWidth="1px"
      px={[6, 6, 8, 16]}
      py={6}
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex alignItems="center" gridGap={3}>
        <Image src="/images/logo.png" w="3rem" h="3rem" />
        <Stack spacing={0}>
          <Heading size="md">Casper Fundraising</Heading>
          <Text size="sm" fontWeight="semibold">
            From builders to builders.
          </Text>
        </Stack>
      </Flex>
      <Flex gridGap={2}>
        <FaTwitter
          cursor="pointer"
          onClick={() =>
            window.open("https://twitter.com/CasperFunding", "_blank")
          }
          size={32}
          color="#1DA1F2"
        />
        {/* <FaDiscord size={32} color="#5865F2" /> */}
      </Flex>
    </Flex>
  );
};

export default Footer;
