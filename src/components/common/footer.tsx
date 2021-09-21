import {
  Flex,
  Text,
  Stack,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import { useRouter } from "next/router";
import { logEvent } from "@firebase/analytics";
import { analytics } from "../../utils/firebase";

const Footer = () => {
  const router = useRouter();

  return (
    <Stack
      borderTopWidth="1px"
      borderTopStyle="solid"
      borderTopColor={useColorModeValue(
        "linear(to-l, blue.600, blue.800)",
        "linear(to-r, blue.200, blue.400)"
      )}
      mt={8}
      pt={4}
    >
      <Flex alignItems="center" justifyContent="center" gridGap={4}>
        <Image src="/images/logo.png" w="4rem" h="4rem" />
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        gridGap={3}
        flexDir={["column", "column", "row", "row"]}
      >
        <Link
          fontSize="sm"
          textTransform="uppercase"
          _hover={{ color: "gray.500" }}
          href="/"
        >
          Home
        </Link>
        <Link
          fontSize="sm"
          textTransform="uppercase"
          _hover={{ color: "gray.500" }}
          href="/fundraising/create"
        >
          Start funding
        </Link>
        <Link
          fontSize="sm"
          textTransform="uppercase"
          _hover={{ color: "gray.500" }}
          href="https://twitter.com/casper_fundraising"
        >
          View Projects
        </Link>

        <Link
          fontSize="sm"
          onClick={() => logEvent(analytics, "feedback_clicked")}
          textTransform="uppercase"
          _hover={{ color: "gray.500" }}
          href="https://indbc0lvsaq.typeform.com/to/jkg6RbYG"
        >
          Feedback
        </Link>

        <Link
          fontSize="sm"
          isExternal
          textTransform="uppercase"
          _hover={{ color: "gray.500" }}
          href="https://ftmscan.com/address/0x237dEcaF67a3c64703577098D5817D7AE60E48D5"
        >
          Contract on FTMScan
        </Link>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        px={16}
        py={3}
        gridGap={4}
        flexDir={["column-reverse", "column-reverse", "row", "row"]}
      >
        <Text>
          Made with 💙 by{" "}
          <Link
            bgGradient={useColorModeValue(
              "linear(to-l, blue.600, blue.800)",
              "linear(to-r, blue.200, blue.400)"
            )}
            fontWeight="medium"
            bgClip="text"
            isExternal
            href="https://twitter.com/igorlourencox"
          >
            @igorlourencox
          </Link>
        </Text>
        <Flex gridGap={2}>
          <FaTwitter
            cursor="pointer"
            onClick={() =>
              window.open("https://twitter.com/CasperFunding", "_blank")
            }
            size={32}
            color="#1DA1F2"
          />

          <Image
            rounded="full"
            cursor="pointer"
            onClick={() =>
              window.open(
                "https://ftmscan.com/address/0x237dEcaF67a3c64703577098D5817D7AE60E48D5",
                "_blank"
              )
            }
            w="32px"
            src="/images/fantom.png"
          />
        </Flex>
      </Flex>
    </Stack>
  );
};

export default Footer;
