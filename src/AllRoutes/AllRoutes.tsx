import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Blog from "../pages/Blog";
import { Text } from "@chakra-ui/react";
import BlogPage from "../components/BlogPage";
import AddBlog from "../pages/AddBlog";
import Account from "../pages/Account";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/signup"} element={<Signup />} />
      <Route path={"/blog"} element={<Blog />} />
      <Route path={"/blog/:id"} element={<BlogPage />} />
      <Route path={"/addblog"} element={<AddBlog />} />
      <Route path={"/account"} element={<Account />} />
      <Route
        path={"*"}
        element={
          <Text
            fontFamily={"monospace"}
            fontWeight={"black"}
            fontSize={"2xl"}
            display={"flex"}
            justifyContent={"center"}
            placeItems={"center"}
            height={"container.sm"}
          >
            Certainly you jumped into wrong page.
          </Text>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
