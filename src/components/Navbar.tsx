import {
  Box,
  Text,
  Flex,
  Spacer,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLoggedIn } from "../Context/useLoggedIn";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn } = useLoggedIn();
  const token = localStorage.getItem("token");

  return (
    <Box bg="blue.500" color="white" rounded={"lg"} p={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Link to="/">
          <Text fontSize="2xl" fontWeight="bold" fontFamily="mono">
            BlogSpot
          </Text>
        </Link>
        <Spacer />
        <Flex gap={5} display={{ base: "none", sm: "flex" }}>
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
        </Flex>
        <Button onClick={onOpen} display={{ base: "block", sm: "none" }}>
          <HamburgerIcon />
        </Button>
      </Flex>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              <Link to="/" onClick={onClose}>
                <Text
                  fontFamily={"mono"}
                  fontSize={"md"}
                  fontWeight={"bold"}
                  textDecor={"overline"}
                >
                  Home
                </Text>
              </Link>
              <Link to="/addblog" onClick={onClose}>
                <Text
                  fontFamily={"mono"}
                  fontSize={"md"}
                  fontWeight={"bold"}
                  textDecor={"overline"}
                >
                  Add Blogs
                </Text>
              </Link>
              {isLoggedIn || token ? (
                <Link to="/account" onClick={onClose}>
                  <Text
                    fontFamily={"mono"}
                    fontSize={"md"}
                    fontWeight={"bold"}
                    textDecor={"overline"}
                  >
                    Account
                  </Text>
                </Link>
              ) : (
                <Link to="/login" onClick={onClose}>
                  <Text
                    fontFamily={"mono"}
                    fontSize={"md"}
                    fontWeight={"bold"}
                    textDecor={"overline"}
                  >
                    Login
                  </Text>
                </Link>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
