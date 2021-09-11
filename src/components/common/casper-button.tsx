import { Button, ButtonProps } from "@chakra-ui/button";

const CasperButton = (props: ButtonProps) => {
  return (
    <Button
      shadow="lg"
      borderRadius="xl"
      bgGradient="linear(to-br, blue.500, blue.400)"
      fontWeight="semibold"
      color="white"
      _hover={{ bgGradient: "linear(to-tr, blue.500, blue.400)" }}
      _active={{ bgGradient: "linear(to-tr, blue.500, blue.400)" }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default CasperButton;
