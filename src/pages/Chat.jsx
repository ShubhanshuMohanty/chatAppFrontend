import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../components/layout/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { useDispatch } from "react-redux";
import { NEW_MESSAGE } from "../constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu } from "../redux/reducers/misc";

function Chat({ chatId, user }) {
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);

  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const params = useParams();
  // const chatId = params.chatId;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const members = chatDetails?.data?.chat?.members;

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );


  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];
  console.log("oldMessagesChunk", oldMessages);
  
  const handleFileOpen=(e)=>{
    dispatch(setIsFileMenu(true))
    dispatch(setFileMenuAnchor(e.currentTarget))
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessagesListener = useCallback(
    (data) => {
      console.log(data);
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );
  const eventHandler = {
    // [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    // [START_TYPING]: startTypingListener,
    // [STOP_TYPING]: stopTypingListener,
  };

  const allMessages =[...oldMessages,...messages]
  useSocketEvents(socket, eventHandler);

  useErrors(errors);
  /*
  useEffect(()=>{
    socket.on(NEW_MESSAGE,newMessagesListener);

    return ()=>{
      socket.off(NEW_MESSAGE,newMessagesListener);
    }
  },[])
  */
  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* message */}
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>
      {/* chat input */}
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type Message Here...."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              // rotate: "-30deg",
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
}

export default AppLayout()(Chat);
