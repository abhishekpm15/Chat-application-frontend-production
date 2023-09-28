import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";
import { Avatar } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";

export function NavbarDark({ onFriendFound, details }) {
  const { user, SignUp, SignOut } = useAuth();
  const [searchValue, setSearchValue] = useState();
  const handleSearch = () => {
    if (searchValue !== null) {
      console.log(searchValue);
      axios({
        method: "GET",
        url: `http://localhost:3001/get-user/${searchValue}`,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.length > 0) {
            toast.success("User found !");
            console.log("resdata",res.data[0]);
            onFriendFound(true, res.data[0]);
          } else {
            toast.error("User not found!");
            onFriendFound(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3 sticky top-0 z-50"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5"
        >
          Chat Application
        </Typography>
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            value={searchValue}
            color="white"
            label="Type here..."
            className="pr-20"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button
            size="sm"
            color="white"
            className="!absolute right-1 top-1 rounded"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        <div className="ml-auto flex gap-1 md:mr-4 items-center">
          {user && (
            <div className="flex items-center space-x-3">
              <Avatar src={user.photoURL} alt="avatar" size="sm" />
              <div className="text-sm">{user.displayName}</div>
            </div>
          )}
          <IconButton variant="text" color="white">
            <Cog6ToothIcon className="h-4 w-4" />
          </IconButton>
          <IconButton variant="text" color="white">
            <BellIcon className="h-4 w-4" />
          </IconButton>
        </div>
        <div className="relative">
          {user ? (
            <>
              {" "}
              <Button
                size="sm"
                color="white"
                className="right-1 rounded"
                onClick={SignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              {" "}
              <Button
                size="sm"
                color="white"
                className="right-1 rounded"
                onClick={SignUp}
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </div>
    </Navbar>
  );
}
