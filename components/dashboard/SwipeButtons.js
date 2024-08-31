"use client";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatIcon from "@mui/icons-material/Chat";
import ListIcon from "@mui/icons-material/List";
import { IconButton } from "@mui/material";

const SwipeButtons = () => {
  return (
    <div className="swipeButtons">
      <IconButton className="">
        <FavoriteBorderIcon fontSize="large" />
      </IconButton>
      <IconButton>
        <ChatIcon fontSize="large" />
      </IconButton>
      <IconButton>
        <Listicon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default SwipeButtons;
