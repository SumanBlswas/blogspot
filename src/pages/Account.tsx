import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLoggedIn } from "../Context/useLoggedIn";

interface DataIterface {
  name: string;
  email: string;
}

interface BlogInterface {
  topic: string;
  image: string;
  id: string;
}

const Account = () => {
  const [data, setData] = useState<DataIterface | null>(null);
  const [blog, setBlog] = useState<BlogInterface[]>([]);
  const { setIsLoggedIn } = useLoggedIn();
  const toast = useToast();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast({
      title: "Logout Successfull",
      description: "You have logged out Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_PORT}/users/account`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setData(data.data);

        const response = await axios.get(
          `${import.meta.env.VITE_PORT}/perticular_blogs`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setBlog(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <Box pt={10}>
      <Flex justifyContent={"space-around"}>
        {data && (
          <Box fontFamily={"mono"}>
            <Heading>{data.name}</Heading>
            <Text fontSize={"lg"}>{data.email}</Text>
          </Box>
        )}
        <Text
          onClick={handleLogout}
          fontFamily={"heading"}
          fontSize={"xl"}
          fontWeight={"bold"}
          textDecor={"underline"}
          cursor={"pointer"}
        >
          Log Out
        </Text>
      </Flex>
      <Heading pt={10} pb={10}>
        All Your Blogs
      </Heading>
      <Divider />
      <Box display={"flex"} gap={5} justifyContent={"left"} flexWrap={"wrap"}>
        {blog.map((el, id: number) => (
          <Link key={id} to={`/blog/${el.id}`}>
            <Box display={"flex"} gap={3} flexDirection={"column"}>
              <Image
                src={el?.image}
                alt={el?.image}
                width={250}
                height={250}
                className={"rounded-xl"}
              />
              <Text as={"h3"}>{el.topic}</Text>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Account;
