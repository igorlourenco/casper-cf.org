import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack, Box, Text, Flex } from "@chakra-ui/layout";
import {
  Heading,
  Textarea,
  Select,
  InputGroup,
  InputLeftElement,
  Button,
  IconButton,
  Image,
  useToast,
} from "@chakra-ui/react";
import { FaTwitter, FaDiscord, FaGlobe } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useEthers } from "@usedapp/core";
import LoginButton from "../common/login-button";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import slug from "slug";
import { FiCopy } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { uploadToIpfs } from "../../utils/ipfs";

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  hostedOn: yup.string().required(),
  twitter: yup.string(),
  discord: yup.string(),
  site: yup.string(),
  recipientAddress: yup.string().required(),
  amountNeeded: yup.string().required(),
});

const CreateFundingForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { account } = useEthers();
  const router = useRouter();
  const toast = useToast();

  const profilePhotoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [slugUrl, setSlugUrl] = useState<string | null>(null);
  const [profilePhotoHash, setProfilePhotoHash] = useState(null);

  async function onProfilePhotoChange(e) {
    const file = e.target.files[0];
    const iconHash = await uploadToIpfs(file);
    setProfilePhotoHash(iconHash);
  }

  function randomString() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const copyUrlToClipboard = () => {
    async () => {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${slugUrl}`
      );

      toast({
        position: "bottom",
        duration: 3000,
        render: () => (
          <Box color="white" p={3} bg="purple.400" borderRadius="sm">
            <Text fontWeight="medium">URL Copied to your clipboard!</Text>
          </Box>
        ),
      });
    };
  };

  const onSubmit = async (data) => {
    setLoading(true);

    await fetch("/api/funding/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        profilePhotoHash,
        active: true,
        owner: account,
        slug: slugUrl,
      }),
    });

    setLoading(false);
    router.push("/my-fundings");
  };

  return (
    <Box w="70%" mt={8}>
      <Stack spacing={6} as="form" onSubmit={handleSubmit(onSubmit)}>
        <Heading>Start creating your funding</Heading>
        <FormControl id="name">
          <FormLabel>Project Name</FormLabel>
          <Input
            onKeyUp={(e: any) => {
              const endingUrl = randomString();
              const slugUrl = slug(e.target.value);
              setSlugUrl(`${slugUrl}-${endingUrl}`);
            }}
            name="name"
            {...register("name")}
            placeholder="My Amazing Project"
          />
        </FormControl>
        <Flex
          alignItems="center"
          gridGap={8}
          justifyContent="flex-start"
          w="100%"
        >
          <FormControl w="auto">
            <Input
              type="file"
              display="none"
              ref={profilePhotoRef}
              onChange={onProfilePhotoChange}
            />
            {profilePhotoHash ? (
              <Stack w="auto" alignItems="flex-end" gridGap={2} minW="150px">
                <Image
                  cursor="pointer"
                  onClick={() =>
                    profilePhotoRef!! &&
                    profilePhotoRef.current!! &&
                    profilePhotoRef.current.click()
                  }
                  width="150px"
                  height="150px"
                  rounded="md"
                  src={`https://ipfs.infura.io/ipfs/${profilePhotoHash}`}
                />
              </Stack>
            ) : (
              <Flex
                onClick={() =>
                  profilePhotoRef!! &&
                  profilePhotoRef.current!! &&
                  profilePhotoRef.current.click()
                }
                rounded="md"
                cursor="pointer"
                w="150px"
                alignItems="center"
                justifyContent="center"
                h="150px"
                borderWidth="2px"
                borderStyle="dashed"
                borderColor="gray.300"
                color="gray.300"
                _hover={{
                  borderColor: "gray.400",
                  color: "gray.400",
                }}
              >
                <FiImage size="40" />
              </Flex>
            )}
          </FormControl>
          <FormControl id="description" w="full">
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              {...register("description")}
              placeholder="This is my amazing project!"
            />
          </FormControl>
        </Flex>

        <FormControl id="category">
          <FormLabel>Category</FormLabel>
          <Select
            name="category"
            {...register("category")}
            placeholder="Project category"
          >
            <option value="DeFi">DeFi</option>
            <option value="NFT">NFT</option>
            <option value="Social">Social</option>
          </Select>
        </FormControl>
        <FormControl id="hostedOn">
          <FormLabel>Hosted on</FormLabel>
          <Select
            name="hostedOn"
            {...register("hostedOn")}
            placeholder="Where is your project hosted?"
          >
            <option value="Fantom">Fantom</option>
            <option value="Other blockchain">Other blockchain</option>
            <option value="It is not a blockchain-based project">
              It'= is not a blockchain-based project
            </option>
          </Select>
        </FormControl>
        <Stack spacing={0}>
          <FormLabel>Social & Community</FormLabel>
          <FormControl id="social">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaTwitter color="#1DA1F2" />}
              />
              <Input
                type="text"
                name="twitter"
                {...register("twitter")}
                borderRadius="none"
                borderTopRadius="md"
                placeholder="Only the handle (e.g. _igorlourenco)"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaDiscord color="#5865F2" />}
              />
              <Input
                type="text"
                name="discord"
                {...register("discord")}
                borderRadius="none"
                placeholder="Community invite link (e.g. _igorlourenco)"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaGlobe color="gray.600" />}
              />
              <Input
                name="site"
                {...register("site")}
                type="text"
                borderRadius="none"
                placeholder="https://site.com.br"
                borderBottomRadius="md"
              />
            </InputGroup>
          </FormControl>
        </Stack>
        <FormControl id="recipient">
          <FormLabel>Donation Recipient Address</FormLabel>
          <Input
            name="recipientAddress"
            {...register("recipientAddress")}
            placeholder="0x123ABCLOVEMYJOB1"
          />
        </FormControl>
        <FormControl id="amount-needed">
          <FormLabel>How many FTM do you need?</FormLabel>
          <Input
            name="amountNeeded"
            {...register("amountNeeded")}
            type="number"
            placeholder="10,000"
          />
        </FormControl>
        <FormControl id="slug">
          <FormLabel>Share your funding with this link</FormLabel>
          {slugUrl && (
            <Flex alignItems="center" gridGap={3}>
              <Text
                fontWeight="semibold"
                color="gray.500"
              >{`${process.env.NEXT_PUBLIC_BASE_URL}/${slugUrl}`}</Text>
              <IconButton
                onClick={copyUrlToClipboard}
                variant="ghost"
                size="sm"
                aria-label="copy"
                icon={<FiCopy />}
              />
            </Flex>
          )}
        </FormControl>
        {account ? (
          <Button
            isLoading={loading}
            type="submit"
            colorScheme="purple"
            shadow="md"
            transform="uppercases"
          >
            Create funding
          </Button>
        ) : (
          <LoginButton />
        )}
      </Stack>
    </Box>
  );
};

export default CreateFundingForm;
