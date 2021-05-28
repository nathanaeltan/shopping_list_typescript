import { Avatar } from "@chakra-ui/avatar";
import { FormControl } from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Alert, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Redirect } from "react-router";
import { useActions } from "../hooks/useActions";
import { useSelector } from "../hooks/useTypedSelector";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login: React.FC = () => {
  const { login } = useActions();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  //   STATE
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  //   EVENT HANDLERS
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(inputs);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputs({ ...inputs, [name]: value });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      {error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      ) : null}

      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        backgroundColor="gray.100"
      >
        <Stack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="green.500" />
          <Heading color="green.400">Login</Heading>
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
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme="green"
                  isLoading={loading}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};
export default Login;
