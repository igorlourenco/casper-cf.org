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
import CasperButton from "../common/casper-button";

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  hostedOn: yup.string().required(),
  twitter: yup.string(),
  discord: yup.string(),
  site: yup.string(),
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
  const [amount, setAmount] = useState(0);

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

  const copyUrlToClipboard = async () => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${slugUrl}`
    );

    toast({
      title: "Success",
      description: "URL copied to your clipboard",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const onSubmit = async (data) => {
    if (!profilePhotoHash) {
      toast({
        title: "Oops",
        description: "You should upload a picture.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

      return;
    }
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
        recipientAddress: account,
        active: true,
        owner: account,
        slug: slugUrl,
      }),
    });

    toast({
      title: "Success",
      description: "Fundraising project created.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setLoading(false);
    router.push("/my-fundraising-projects");
  };

  return (
    <Box w={["100%", "100%", "100%", "70%"]} mt={8}>
      <Stack spacing={6} as="form" onSubmit={handleSubmit(onSubmit)}>
        <Heading size="lg">
          Register your project to receive community funding
        </Heading>
        <FormControl id="name">
          <FormLabel>Project Name</FormLabel>
          <Input
            rounded="lg"
            shadow="sm"
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
          alignItems="flex-start"
          gridGap={8}
          justifyContent="flex-start"
          w="100%"
        >
          <FormControl w="auto">
            <Input
              rounded="lg"
              type="file"
              display="none"
              ref={profilePhotoRef}
              onChange={onProfilePhotoChange}
            />
            {profilePhotoHash ? (
              <Stack w="auto" alignItems="flex-end" gridGap={2} minW="150px">
                <Image
                  rounded="lg"
                  shadow="sm"
                  cursor="pointer"
                  onClick={() =>
                    profilePhotoRef!! &&
                    profilePhotoRef.current!! &&
                    profilePhotoRef.current.click()
                  }
                  width="150px"
                  height="150px"
                  src={`https://ipfs.infura.io/ipfs/${profilePhotoHash}`}
                />
              </Stack>
            ) : (
              <Flex
                rounded="lg"
                onClick={() =>
                  profilePhotoRef!! &&
                  profilePhotoRef.current!! &&
                  profilePhotoRef.current.click()
                }
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
              rounded="lg"
              shadow="sm"
              name="description"
              {...register("description")}
              placeholder="This is my amazing project!"
            />
          </FormControl>
        </Flex>

        <FormControl id="category">
          <FormLabel>Category</FormLabel>
          <Select
            rounded="lg"
            shadow="sm"
            name="category"
            {...register("category")}
            placeholder="Project category"
          >
            <option value="DeFi">DeFi</option>
            <option value="NFT Collection">NFT Collection</option>
            <option value="NFT Marketplace">NFT Marketplace</option>
            <option value="Game">Game</option>
            <option value="For community">For community</option>
          </Select>
        </FormControl>
        <FormControl id="hostedOn">
          <FormLabel>Hosted on</FormLabel>
          <Select
            rounded="lg"
            shadow="sm"
            name="hostedOn"
            {...register("hostedOn")}
            placeholder="Where is your project hosted?"
          >
            <option value="Fantom">Fantom</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Polygon">Polygon</option>
            <option value="Avalanche">Avalanche</option>
            <option value="Cardano">Cardano</option>
            <option value="Solana">Solana</option>
            <option value="Binance Smart Chain">Binance Smart Chain</option>
          </Select>
        </FormControl>
        <Stack spacing={0} shadow="sm">
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
                placeholder="Only the handle (e.g. CasperFunding)"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaDiscord color="#5865F2" />}
              />
              <Input
                type="url"
                name="discord"
                {...register("discord")}
                borderRadius="none"
                placeholder="Community invite link (e.g. CasperFunding)"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaGlobe color="gray.600" />}
              />
              <Input
                name="url"
                {...register("site")}
                type="text"
                borderRadius="none"
                placeholder="https://casper-cf.org"
                borderBottomRadius="md"
              />
            </InputGroup>
          </FormControl>
        </Stack>
        <FormControl id="amount-needed">
          <FormLabel>How many FTM do your project need?</FormLabel>
          <Input
            shadow="sm"
            rounded="lg"
            name="amountNeeded"
            {...register("amountNeeded")}
            onChange={(e: any) => setAmount(e.target.value)}
            type="number"
            placeholder="10000"
          />
          {amount > 0 && (
            <Text>
              You will receive {(amount * 99) / 100} FTM (1% for platform
              maintenance)
            </Text>
          )}
        </FormControl>
        <FormControl id="recipient">
          <FormLabel>Donations will be sent to your address</FormLabel>
          <Text fontWeight="semibold" color="gray.500">
            {account}
          </Text>
        </FormControl>
        <FormControl id="slug">
          <FormLabel>
            Share your project with your community using this link
          </FormLabel>
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
          <CasperButton isLoading={loading} type="submit" transform="uppercase">
            Create Fundraising project
          </CasperButton>
        ) : (
          <LoginButton>Login to start</LoginButton>
        )}
      </Stack>
    </Box>
  );
};

export default CreateFundingForm;
