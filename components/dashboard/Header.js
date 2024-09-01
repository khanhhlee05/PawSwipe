"use client";

import "./Header.css";
import { Person, Forum, Pets, Favorite } from "@mui/icons-material";
import { IconButton, Box } from "@mui/material";

export default function Header() {
  return (
    <div className="header">
      <IconButton>
        <Person className="header__icon" fontSize="large" />
      </IconButton>
      <Pets fontSize="large" />
      <Box>
        <IconButton>
          <Favorite className="header__icon" fontSize="large" />
        </IconButton>
        <IconButton>
          <Forum className="header__icon" fontSize="large" />
        </IconButton>
      </Box>
    </div>
  );
}
