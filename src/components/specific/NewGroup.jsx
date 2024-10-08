import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'
import {useInputValidation} from '6pp'

const NewGroup = () => {
  const groupName = useInputValidation("")
  const[members,setMembers]=useState(sampleUsers)
  const [selectedMembers,setSelectedMembers]=useState([])
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentElement) => currentElement !== id)
        : [...prev, id]
    );
    console.log("select Member: " + selectedMembers);
    
  }
  const submitHandler = () => {
    // Create group logic here
  }

  const closeHandler=()=>{
    
  }
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} spacing={"2rem"} width={"25rem"}>
        <DialogTitle textAlign={"center"} variant='h4'>New Group</DialogTitle>
        <Stack>
          <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/>
          <Typography variant='body1'>Members</Typography>
        {sampleUsers.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant='outlined' color='error' size='large'>
            Cancel
          </Button>
          <Button variant='contained' size='large' onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup