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
  Image,
} from "@chakra-ui/react";
import { FaTwitter, FaDiscord, FaGlobe } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useEthers } from "@usedapp/core";
import LoginButton from "../common/login-button";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
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

const EditFundingForm = ({ ...funding }: any) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: funding,
    resolver: yupResolver(schema),
  });
  const { account } = useEthers();
  const router = useRouter();

  const profilePhotoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [profilePhotoHash, setProfilePhotoHash] = useState(
    funding.profilePhotoHash
  );

  async function onProfilePhotoChange(e) {
    const file = e.target.files[0];
    const iconHash = await uploadToIpfs(file);
    setProfilePhotoHash(iconHash);
  }

  useEffect(() => {
    reset({ ...funding });
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    const response = await fetch("/api/funding/edit", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, id: funding._id, profilePhotoHash }),
    });

    const responseData = await response.json();

    setLoading(false);
    router.push("/my-fundings");
  };

  if (!funding || !account) return null;

  return (
    <Box w="70%" mt={8}>
      <Stack spacing={6} as="form" onSubmit={handleSubmit(onSubmit)}>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading>Edit {funding.name}</Heading>
        </Flex>
        <FormControl>
          <FormLabel>Project Name</FormLabel>
          <Input
            name="name"
            defaultValue={funding.name}
            {...register("name", { required: true })}
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
                  rounded="lg"
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
                onClick={() =>
                  profilePhotoRef!! &&
                  profilePhotoRef.current!! &&
                  profilePhotoRef.current.click()
                }
                rounded="lg"
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
              defaultValue={funding.description}
              name="description"
              {...register("description")}
              placeholder="This is my amazing project!"
            />
          </FormControl>
        </Flex>
        <FormControl>
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
        <FormControl>
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
          <FormControl>
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
                defaultValue={funding.site}
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
        <FormControl>
          <FormLabel>Donation Recipient Address</FormLabel>
          <Input
            defaultValue={funding.recipientAddress}
            name="recipientAddress"
            {...register("recipientAddress", { required: true })}
            placeholder="0x123ABCLOVEMYJOB1"
          />
        </FormControl>
        <FormControl>
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
            colorScheme="blue"
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
