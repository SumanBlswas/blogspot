import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Avatar,
  Button,
  Divider,
  VStack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Content {
  content: string;
  userName: string;
}

const CommentSection = ({ id }: { id: string | undefined }) => {
  const [comments, setComments] = useState<Content[]>([]);
  const [newComment, setNewComment] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getComment = async () => {
      try {
        const comment = await axios.get(
          `${import.meta.env.VITE_PORT}/comments/${id}`
        );
        setComments(comment.data);
      } catch (error) {
        console.error(error);
      }
    };
    getComment();
  }, [id]);

  const token = localStorage.getItem("token");

  const handleAddComment = async () => {
    try {
      if (!token) {
        toast({
          title: "Login Please",
          description: "You must login first",
          status: "warning",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
      } else {
        const data = { content: newComment, post_id: id };
        const comment = await axios.post(
          `${import.meta.env.VITE_PORT}/comments`,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setComments((prevComments) => [...prevComments, comment.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box mt={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Comments
      </Text>
      <Divider my={4} />
      <Flex align="center">
        <Avatar
          size="md"
          name="User"
          color={"white"}
          mr={3}
          display={{ base: "none", sm: "flex" }}
        />
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={2}
          mr={2}
          fontFamily={"mono"}
          fontWeight={"bold"}
          fontStyle={"italic"}
          fontSize={"xl"}
        />
        <Button colorScheme="blue" size="md" onClick={handleAddComment}>
          Comment
        </Button>
      </Flex>
      <Divider my={4} />
      <VStack spacing={4} align="stretch">
        {comments
          .slice()
          .reverse()
          .map((comment, index: number) => (
            <Flex key={index} p={3} bg="gray.100" borderRadius="md">
              <Avatar
                size="sm"
                name={comment.userName}
                mr={3}
                color={"white"}
              />
              <Text fontFamily={"mono"}>{comment.content}</Text>
            </Flex>
          ))}
      </VStack>
    </Box>
  );
};

export default CommentSection;
