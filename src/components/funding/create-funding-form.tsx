import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack, Box } from "@chakra-ui/layout";
import {
  Heading,
  Textarea,
  Select,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import { FaTwitter, FaDiscord, FaGlobe } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEthers } from "@usedapp/core";
import LoginButton from "../common/login-button";
import { useState } from "react";
import { useRouter } from "next/router";

const CreateFundingForm = () => {
  const { register, handleSubmit } = useForm();
  const { account } = useEthers();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const response = await fetch("/api/funding/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, active: true, owner: account }),
    });

    const responseData = await response.json();

    console.log({ responseData });
    setLoading(false);
    router.push("/my-fundings");
  };

  return (
    <Box w="70%" mt={8}>
      <Stack spacing={6} as="form" onSubmit={handleSubmit(onSubmit)}>
        <Heading>Start creating your funding</Heading>
        <FormControl id="name" isRequired>
          <FormLabel>Project Name</FormLabel>
          <Input
            name="name"
            {...register("name", { required: true })}
            placeholder="My Amazing Project"
          />
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            {...register("description", { required: true })}
            placeholder="This is my amazing project!"
          />
        </FormControl>
        <FormControl id="category" isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            name="category"
            {...register("category", { required: true })}
            placeholder="Project category"
          >
            <option value="DeFi">DeFi</option>
            <option value="NFT">NFT</option>
            <option value="Social">Social</option>
          </Select>
        </FormControl>
        <FormControl id="hostedOn" isRequired>
          <FormLabel>Hosted on</FormLabel>
          <Select
            name="hostedOn"
            {...register("hostedOn", { required: true })}
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
        <FormControl id="recipient" isRequired>
          <FormLabel>Donation Recipient Address</FormLabel>
          <Input
            name="recipientAddress"
            {...register("recipientAddress", { required: true })}
            placeholder="0x123ABCLOVEMYJOB1"
          />
        </FormControl>
        <FormControl id="amount-needed" isRequired>
          <FormLabel>How many FTM do you need?</FormLabel>
          <Input
            name="amountNeeded"
            {...register("amountNeeded", { required: true })}
            type="number"
            placeholder="10,000"
          />
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
