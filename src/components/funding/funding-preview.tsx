import { Flex, Text, Stack } from "@chakra-ui/layout";
import Funding from "../../types/funding";
import { format } from "date-fns";
import { Button, IconButton } from "@chakra-ui/button";
import { FiCheck, FiCopy, FiSettings, FiShare2, FiUsers } from "react-icons/fi";
import { useRouter } from "next/router";
import {
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/accordion";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  useToast,
} from "@chakra-ui/react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { getDonators } from "../../utils/donate";

const FundingPreview = ({ ...funding }: Funding) => {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [funded, setFunded] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function fetchData() {
      const projectId = funding._id.toString().replaceAll('"', "");

      const { donated } = await getDonators(projectId);
      setFunded(donated);
    }
    fetchData();
  }, [funding._id]);

  var url = `${process.env.NEXT_PUBLIC_BASE_URL}/${funding.slug}`;
  var text = "Replace this with your text";

  const shareOnTwitter = () => {
    window.open(
      "http://twitter.com/share?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(text),
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
  };

  const copyUrlToClipboard = async () => {
    await navigator.clipboard.writeText(url);

    toast({
      title: "Success",
      description: "URL copied to your clipboard",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const activateOrDeactivate = async () => {
    setLoading(true);

    const response = await fetch("/api/funding/edit", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ active: !funding.active, id: funding._id }),
    });

    const responseData = await response.json();

    setLoading(false);
    router.push("/my-fundraising-projects");
  };

  return (
    <AccordionItem>
      <Flex
        px={2}
        py={3}
        as={AccordionButton}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontWeight="semibold">{funding.name}</Text>
        <Flex alignItems="center" gridGap={3}>
          <Text fontWeight="medium">
            {new Intl.NumberFormat("en-IN").format(funded)}/
            {new Intl.NumberFormat("en-IN").format(
              Number(funding.amountNeeded)
            )}{" "}
            FTM
          </Text>

          <AccordionIcon />
        </Flex>
      </Flex>
      <Stack as={AccordionPanel} pb={4}>
        <Flex alignItems="center" justifyContent="space-between" gridGap={3}>
          <Text fontSize="xs" fontWeight="semibold" color="gray.500">
            Created at {format(new Date(funding.registeredAt), "MM/dd/yyyy")}
          </Text>
          <Flex alignItems="center" justifyContent="flex-end" gridGap={3}>
            <Button
              textTransform="uppercase"
              size="sm"
              variant="ghost"
              colorScheme="blue"
              onClick={() => router.push(`/supporters/${funding.slug}`)}
              leftIcon={<FiUsers />}
            >
              Supporters
            </Button>
            <Button
              isLoading={loading}
              onClick={activateOrDeactivate}
              textTransform="uppercase"
              size="sm"
              variant="ghost"
              colorScheme="blue"
              leftIcon={<FiCheck />}
            >
              {funding.active ? "End" : "Reactivate"} Fundraising
            </Button>
            <IconButton
              aria-label="Edit"
              size="sm"
              variant="ghost"
              onClick={onOpen}
              icon={<FiShare2 />}
              colorScheme="blue"
            />
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Share {funding.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody gridGap={4} padding={6}>
                  <Flex
                    alignItems="center"
                    justifyContent="space-around"
                    gridGap={2}
                  >
                    <Stack alignItems="center">
                      <FaTwitter
                        size={48}
                        cursor="pointer"
                        onClick={shareOnTwitter}
                        color="#1DA1F2"
                      />
                      <Text>Share on Twitter</Text>
                    </Stack>
                    <Stack alignItems="center">
                      <FiCopy
                        size={48}
                        cursor="pointer"
                        onClick={copyUrlToClipboard}
                        color="gray.500"
                      />
                      <Text>Copy link</Text>
                    </Stack>
                  </Flex>
                </ModalBody>
              </ModalContent>
            </Modal>
            {/* <IconButton
              aria-label="Edit"
              size="sm"
              variant="ghost"
              onClick={() => router.push(`/fundraising/edit/${funding._id}`)}
              icon={<FiSettings />}
              colorScheme="gray"
            /> */}
          </Flex>
        </Flex>
        <Flex
          alignItems="flex-start"
          justifyContent="space-between"
          gridGap={4}
        >
          <Text fontSize="sm" w={"80%"}>
            {funding.description}
          </Text>
          <Image
            w="150px"
            h="150px"
            rounded="lg"
            src={
              `https://ipfs.io/ipfs/${funding.profilePhotoHash}` ||
              "https://via.placeholder.com/150"
            }
          />
        </Flex>
      </Stack>
    </AccordionItem>
  );
};

export default FundingPreview;
