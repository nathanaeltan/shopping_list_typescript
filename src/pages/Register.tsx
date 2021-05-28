import { Avatar } from "@chakra-ui/avatar";
import { FormControl } from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import React, { useState } from "react";
import { FaUserAlt, FaLock, FaUserTie } from "react-icons/fa";
import { useActions } from "../hooks/useActions";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaUserTie = chakra(FaUserTie);

const Register: React.FC = () => {
  // ACTIONS
  const { register } = useActions();

  //   STATE
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  //   EVENT HANDLERS
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(inputs);
    console.log("SUBMITTING")
    register(inputs);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputs({ ...inputs, [name]: value });
  };
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray.100"
    >
      <Stack flexDirection="column" justifyContent="center" alignItems="center">
        <Avatar bg="green.500" />
        <Heading color="green.400">Register</Heading>
        <Box minW={{ base: "100%", md: "560px" }}>
          <form onSubmit={onSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserTie />}
                  />
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={inputs.firstName}
                    name="firstName"
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserTie />}
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={inputs.lastName}
                    onChange={handleInputChange}
                    name="lastName"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt />}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={inputs.email}
                    onChange={handleInputChange}
                    name="email"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaLock />}
                  />
                  <Input
                    type={!showPassword ? "password" : "text"}
                    placeholder="Password"
                    value={inputs.password}
                    onChange={handleInputChange}
                    name="password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button type="submit" variant="solid" colorScheme="green">
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
export default Register;
