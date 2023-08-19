import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoggedIn } from "../Context/useLoggedIn";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useLoggedIn();

  const handleLogin = async () => {
    const payload = {
      email,
      password,
    };
    try {
      const sendData = await axios.post(
        `${import.meta.env.VITE_PORT}/users/login`,
        payload
      );
      if (sendData.status === 200) {
        localStorage.setItem("token", sendData.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `${sendData.data.token}`;
        toast({
          title: "logged in Successfully.",
          description: `You have successfully logged in`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Wrong Credentials.",
        description: `Check your Email and password before login`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box display={"flex"} justifyContent={"center"} mt={20}>
      <Box
        width="350px"
        p={6}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="lg"
      >
        <Heading size="lg" mb={6}>
          Login
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mb={6}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" size="lg" onClick={handleLogin} width="100%">
          Login
        </Button>
        <Divider my={6} />
        <Link to={"/signup"}>
          <Text fontFamily={"mono"}>SignUp Now!</Text>
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
