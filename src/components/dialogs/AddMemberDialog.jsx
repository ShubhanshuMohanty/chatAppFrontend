import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ chatId, isLoadingMember }) => {
  const [members, setMembers] = useState
  (sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentElement) => currentElement !== id)
        : [...prev, id]
    );
    console.log("select Member: " + selectedMembers);
  };

  
  const closeHandler = () => {
    // Close dialog logic here
    console.log("Close dialog");
    setSelectedMembers([])
    setMembers([]);
  };
  const addMemberSubmitHandler = () => {
    // Add member logic here
    console.log("Add member submit");
    closeHandler();
  };
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((i) => (
              <UserItem key={i.id} user={i} handler={selectMemberHandler}  isAdded={selectedMembers.includes(i._id)}/>
            ))
          ) : (
            <Typography textAlign={"center"}>No friend</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoadingMember}
            onClick={addMemberSubmitHandler}
          >
            submit changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
