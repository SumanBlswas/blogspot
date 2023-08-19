import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiReset } from "react-icons/bi";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import CommentSection from "./Comments";

interface Blog {
  title: string;
  updatedAt: string;
  image: string;
  description: string;
  id: number;
  topic: string;
  userName: string;
}

const BlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [textType, setTextType] = useState<string>("");
  const [textSize, setTextSize] = useState<string>("");
  const [textSize2, setTextSize2] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");
  const [textWeight, setTextWeight] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(true);
  const [toggle2, setToggle2] = useState<boolean>(true);
  const [toggle3, setToggle3] = useState<boolean>(true);
  const [toggle4, setToggle4] = useState<boolean>(true);
  const [toggle5, setToggle5] = useState<boolean>(true);
  const [data, setData] = useState<Blog | null>(null);
  const [dataTwo, setDataTwo] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBlogsById = async () => {
      try {
        const blogResponse = await axios.get<Blog>(
          `${import.meta.env.VITE_PORT}/blogs/${id}`
        );
        setData(blogResponse.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getBlogsById();
  }, [id]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogsResponse = await axios.get<Blog[]>(
          `${import.meta.env.VITE_PORT}/blogs`
        );
        setDataTwo(blogsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogs();
  }, []);

  const dataSet = [
    "Text-Mono",
    "Text-XL",
    "Read-Zoom",
    "Text-Pink",
    "Text-XBold",
  ];

  const handleTextChanger = (e: string) => {
    if (e === "Text-Mono") {
      setTextType("mono");
      setToggle(!toggle);
    } else if (e === "Text-XL") {
      setTextSize("xl");
      setToggle2(!toggle2);
    } else if (e === "Read-Zoom") {
      setTextSize2("2xl");
      setToggle3(!toggle3);
    } else if (e === "Text-Pink") {
      setTextColor("pink.500");
      setToggle4(!toggle4);
    } else if (e === "Text-XBold") {
      setTextWeight("extrabold");
      setToggle5(!toggle5);
    } else if (e === "BiReset") {
      setToggle(true);
      setToggle2(true);
      setToggle3(true);
      setToggle4(true);
      setToggle5(true);
    }
  };

  const handleShowToast = (str: string) => {
    toast.success(str, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  if (loading) {
    return <Heading pt={5}>...Loading</Heading>;
  }

  return (
    <>
      <Box
        pt={5}
        w="full"
        h="full"
        display="flex"
        justifyContent="space-around"
        fontFamily={toggle ? "" : textType}
        fontSize={toggle2 ? "" : textSize}
        color={toggle4 ? "" : textColor}
        fontWeight={toggle5 ? "" : textWeight}
        gap={5}
      >
        <Box
          p={3}
          pt={0}
          display="flex"
          w={"20%"}
          flexDir="column"
          gap={3}
          placeItems={"center"}
        >
          <Heading as="h3" color="red.500" fontWeight="black" fontSize="2xl">
            Trending News
          </Heading>
          <Box display="flex" flexDir="column" gap={7}>
            {dataTwo.slice(-2).map((el, id) => (
              <Link key={id} to={`/blog/${el.id}`}>
                <Box display="flex" flexDir="column" gap={3}>
                  <Box borderRadius="lg">
                    <Image
                      src={el.image}
                      alt="trending news"
                      width={225}
                      height="auto"
                      borderRadius="lg"
                    />
                  </Box>
                  <Text
                    as="h3"
                    color="red.500"
                    fontWeight="bold"
                    textAlign={"start"}
                  >
                    {el.topic}
                  </Text>
                  <Text as="h4" textAlign={"start"}>
                    {el.title}
                  </Text>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
        <Box pl={3} h="full" w={"80%"}>
          <Heading
            fontSize="3xl"
            textAlign="start"
            fontFamily="mono"
            fontWeight="bold"
            color="black"
          >
            {data?.title}
          </Heading>

          <Text
            fontFamily="mono"
            fontWeight="bold"
            color="black"
            textAlign="start"
          >
            by {data?.userName}
          </Text>

          <Text
            fontFamily="mono"
            fontWeight="bold"
            color="black"
            textAlign="start"
          >
            {data?.updatedAt}
          </Text>
          <Box pt={3} display="flex" justifyContent="space-between">
            <Image
              src={data?.image}
              alt="hello"
              width={700}
              height={400}
              borderRadius="xl"
            />
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              placeItems="center"
              fontFamily="mono"
              fontWeight="bold"
              gap={3}
              textAlign="start"
              color="black"
            >
              {dataSet.map((el, id) => (
                <Text
                  key={id}
                  cursor="pointer"
                  onClick={(e) => handleTextChanger(e.currentTarget.innerText)}
                >
                  {el}
                </Text>
              ))}
              <Box
                color="red.400"
                fontSize="2xl"
                _active={{ animation: "spin" }}
                cursor="pointer"
                onClick={() => {
                  handleTextChanger("BiReset");
                  handleShowToast("Texts Reset Successfully!");
                }}
              >
                <BiReset />
              </Box>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={3} pt={8}>
            {data?.description &&
              data.description.split("\n").map((el: string, id: number) => (
                <Text
                  as="h3"
                  key={id}
                  fontSize={toggle3 ? "xl" : textSize2}
                  textAlign={"start"}
                >
                  {el}
                </Text>
              ))}
          </Box>
        </Box>
      </Box>
      <CommentSection id={id} />
    </>
  );
};

export default BlogPage;
