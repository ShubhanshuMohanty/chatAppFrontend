import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid, Grid2, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import { samepleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";

const AppLayout = () => (WrappedComponents) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    console.log("data : ", data);

    const handleDeleteChat = () => {
      console.log("delete chat");
    };

    return (
      <>
        <Title />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={samepleChats}
                chatId={chatId}
                // newMessagesAlert={[
                //   {
                //     chatId,
                //     count: 4,
                //   },
                // ]}
                // onlineUsers={["1", "2"]}
                handleDeleteChat={() => console.log("delete chat")}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
            bgcolor="primary.main"
          >
            <WrappedComponents {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
