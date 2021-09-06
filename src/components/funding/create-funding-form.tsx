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
import { useEthers, useConfig } from "@usedapp/core";
import LoginButton from "../common/login-button";

const CreateFundingForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { account } = useEthers();

  const onSubmit = (data) => console.log({ ...data, owner: account });

  return (
    <Box w="70%" mt={8}>
      <Stack spacing={6} as="form" onSubmit={handleSubmit(onSubmit)}>
        <Heading>Start creating your project </Heading>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
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
            <option>DeFi</option>
            <option>NFT</option>
            <option>Social</option>
          </Select>
        </FormControl>
        <FormControl id="category" isRequired>
          <FormLabel>Hosted on</FormLabel>
          <Select
            name="hostedOn"
            {...register("hostedOn", { required: true })}
            placeholder="Where is your project hosted?"
          >
            <option>Fantom</option>
            <option>Other blockchain</option>
            <option>It's not a blockchain-based project</option>
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
