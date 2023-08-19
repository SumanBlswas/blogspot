import {
  Box,
  Text,
  Heading,
  Divider,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";

interface BlogState {
  id: string;
  topic: string;
  title: string;
  image: string;
  description: string;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogState[]>([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data: AxiosResponse = await axios.get(
          `${import.meta.env.VITE_PORT}/blogs`
        );
        setBlogs(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getBlogs();
  }, []);

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={6} fontFamily={"mono"}>
        Welcome to BlogSpot
      </Heading>
      <Divider />
      <SimpleGrid columns={[1, 1, 2, 3, 4, 5]} spacing={6} mt={8}>
        {blogs &&
          blogs.map((blog, id) => (
            <Link key={id} to={`/blog/${blog.id}`}>
              <Box
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                boxShadow="md"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.05)" }}
                display={"flex"}
                flexDirection={"column"}
                cursor={"pointer"}
                h={"280px"}
              >
                <Image src={blog.image} alt={blog.title} />
                <Box p={4} mb={3} overflow={"hidden"}>
                  <Heading as="h2" size="md" mb={2} fontFamily={"mono"}>
                    {blog.topic}
                  </Heading>
                  <Text
                    fontSize="md"
                    fontFamily={"monospace"}
                    
                  >
                    {blog.title}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default Blog;
