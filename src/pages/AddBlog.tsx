import { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import Login from "../components/Login";
import axios from "axios";

const AddBlog = () => {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(``);
  const [imageLink, setImageLink] = useState("");
  const [author, setAuthor] = useState("");
  const toast = useToast();

  const handleAddBlog = async () => {
    try {
      const data = { topic, title, description: content, image: imageLink };
      const blog = await axios.post(`${import.meta.env.VITE_PORT}/blogs`, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (blog.status === 200) {
        toast({
          title: "Post uploaded",
          description: "Successfully uploaded content",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        console.log(blog);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Some Error occured",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const token = localStorage.getItem("token");

  if (!token) {
    toast({
      title: "Login required.",
      description: "Please log in to add a new blog.",
      status: "warning",
      position: "top-right",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <>
      {token && token.length > 0 ? (
        <Box p={6} fontWeight={"bold"} fontFamily={"mono"}>
          <Heading as="h1" size="xl" mb={6}>
            Add a New Blog
          </Heading>
          <Box w={"full"}>
            <Box display={"flex"} gap={5}>
              <FormControl mb={4}>
                <FormLabel fontSize={"lg"} fontWeight={"black"}>
                  Topic
                </FormLabel>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter blog topic"
                  p={6}
                  fontWeight={"bold"}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel fontSize={"lg"} fontWeight={"black"}>
                  Title
                </FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog title"
                  p={6}
                  fontWeight={"bold"}
                />
              </FormControl>
            </Box>
            <Box display={"flex"} gap={5}>
              <FormControl mb={4}>
                <FormLabel fontSize={"lg"} fontWeight={"black"}>
                  Image Link
                </FormLabel>
                <Input
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  placeholder="Enter image link"
                  p={6}
                  fontWeight={"bold"}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel fontSize={"lg"} fontWeight={"black"}>
                  Author
                </FormLabel>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder={author}
                  disabled={true}
                  p={6}
                  fontWeight={"bold"}
                />
              </FormControl>
            </Box>
            <FormControl mb={4}>
              <FormLabel fontSize={"lg"} fontWeight={"black"}>
                Content
              </FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter blog content"
                rows={12}
                fontWeight={"bold"}
                fontSize={"xl"}
              />
            </FormControl>
            <Button colorScheme="blue" onClick={handleAddBlog}>
              Add Blog
            </Button>
          </Box>
        </Box>
      ) : (
        <Login />
      )}
    </>
  );
};

export default AddBlog;
