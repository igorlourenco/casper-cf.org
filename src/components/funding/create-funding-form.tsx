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
  useToast,
} from "@chakra-ui/react";
import { FaTwitter, FaDiscord, FaGlobe } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEthers } from "@usedapp/core";
import LoginButton from "../common/login-button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import slug from "slug";
import { FiCopy } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  const [loading, setLoading] = useState(false);
  const [slugUrl, setSlugUrl] = useState<string | null>(null);

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
            onKeyDown={(e: any) => {
              const endingUrl = randomString();
              const slugUrl = slug(e.target.value);
              setSlugUrl(`${slugUrl}-${endingUrl}`);
            }}
            name="name"
            {...register("name")}
            placeholder="My Amazing Project"
          />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            {...register("description")}
            placeholder="This is my amazing project!"
          />
        </FormControl>
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
