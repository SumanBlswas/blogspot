import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLoggedIn } from "../Context/useLoggedIn";

const Navbar = () => {
  const { isLoggedIn } = useLoggedIn();
  const token = localStorage.getItem("token");
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={4}
      bg="blue.500"
      color="white"
      rounded={"lg"}
    >
      <Link to="/">
        <Text fontSize="2xl" fontWeight="bold" fontFamily="mono">
          BlogSpot
        </Text>
      </Link>
      <Box display="flex" gap={5}>
        <Link to="/">
          <Text fontSize="xl" fontFamily="mono">
            Home
          </Text>
        </Link>
        <Link to="/addblog">
          <Text fontSize="xl" fontFamily="mono">
            Add_Blogs
          </Text>
        </Link>
        {isLoggedIn || token ? (
          <Link to="/account">
            <Text fontSize="xl" fontFamily="mono" rounded={"full"}>
              Account
            </Text>
          </Link>
        ) : (
          <Link to="/login">
            <Text fontSize="xl" fontFamily="mono" rounded={"full"}>
              Login
            </Text>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
