import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalendarIcon,
    } from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"bio"} text={"jay shree ram"} />
      <ProfileCard heading={"username"} text={"sm"} Icon={<UserNameIcon/>}/>
      <ProfileCard heading={"name"} text={"subh"} Icon={<FaceIcon/>} />
      <ProfileCard
        heading={"Joined"}
        text={moment("2012-10-10").fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
    
  );
};
const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
    >
      {Icon && Icon}

      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color={"gray"} variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default Profile;
