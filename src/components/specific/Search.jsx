import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useInputValidation } from "6pp";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api";
const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const [searchUser]=useLazySearchUserQuery()
  const [sendFriendRequest]=useSendFriendRequestMutation();
  const search = useInputValidation("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const addFriendHandler = async(id)=> {
    // Add friend logic here
    try {
      const res=await sendFriendRequest({userId: id})
      if(res.data){
        toast.success("Friend request sent successfully!");
      }
      else{
        console.log(res);
        
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const isLoadingSendFriendRequest=()=>{
    console.log("isLoadingSendFriendRequest");
  }
  useEffect(()=>{
    const timeOutId=setTimeout(()=>{
      searchUser(search.value)
      .then(({data})=>setUsers(data.users))
      .catch((e)=>console.log(e))
    },1000)
    return ()=>{
      clearTimeout(timeOutId)
    }

  },[search.value])
  const searchCloseHandler = () => dispatch(setIsSearch(false));
  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {/* List of search results */}
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
