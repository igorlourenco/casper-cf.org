import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack, Box } from "@chakra-ui/layout";
import {
  Heading,
  Flex,
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
import { FiCheck, FiMinus } from "react-icons/fi";

const EditFundingForm = ({ ...funding }: any) => {
  const { register, handleSubmit } = useForm();
  const { account } = useEthers();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

    console.log({ responseData });
    setLoading(false);
    router.push("/my-fundings");
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const response = await fetch("/api/funding/edit", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, id: funding._id }),
    });

    const responseData = await response.json();

    console.log({ responseData });
    setLoading(false);
    router.push("/my-fundings");
  };

  if (!funding || !account) return null;

  return (
    <Box w="70%" mt={8}>
      <Stack spacing={6} as="form" onSubmit={handleSubmit(onSubmit)}>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading>Edit {funding.name}</Heading>
          {funding.active ? (
            <Button
              isLoading={loading}
              onClick={activateOrDeactivate}
              leftIcon={<FiMinus />}
              colorScheme="red"
            >
              Deactivate
            </Button>
          ) : (
            <Button
              isLoading={loading}
              onClick={activateOrDeactivate}
              leftIcon={<FiCheck />}
              colorScheme="green"
            >
              Reactivate
            </Button>
          )}
        </Flex>
        <FormControl id="name" isRequired>
          <FormLabel>Project Name</FormLabel>
          <Input
            name="name"
            defaultValue={funding.name}
            {...register("name", { required: true })}
            placeholder="My Amazing Project"
          />
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            defaultValue={funding.description}
            name="description"
            {...register("description", { required: true })}
            placeholder="This is my amazing project!"
          />
        </FormControl>
        <FormControl id="category" isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            value={funding.category}
            name="category"
            {...register("category", { required: true })}
            placeholder="Project category"
          >
            <option value="DeFi">DeFi</option>
            <option value="NFT">NFT</option>
            <option value="Social">Social</option>
          </Select>
        </FormControl>
        <FormControl id="hosted" isRequired>
          <FormLabel>Hosted on</FormLabel>
          <Select
            value={funding.hostedOn}
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
                defaultValue={funding.twitter}
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
                defaultValue={funding.discord}
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
                defaultValue={funding.website}
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
            defaultValue={funding.recipientAddress}
            name="recipientAddress"
            {...register("recipientAddress", { required: true })}
            placeholder="0x123ABCLOVEMYJOB1"
          />
        </FormControl>
        <FormControl id="amount-needed" isRequired>
          <FormLabel>How many FTM do you need?</FormLabel>
          <Input
            defaultValue={funding.amountNeeded}
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
            Update funding
          </Button>
        ) : (
          <LoginButton />
        )}
      </Stack>
    </Box>
  );
};

export default EditFundingForm;
