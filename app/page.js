'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import validator from 'validator';

export default function Home() {
  const [email, setEmail] = useState("");

  const loadEmail = async () => {
    const trimEmail = email.trim();
    if (!trimEmail) {
      alert("Please enter a valid email");
      return;
    }



    if (!validator.isEmail(trimEmail)) {
      alert("Please enter a valid email format");
      return;
    }

    try{
      const myEmail = await fetch(`/api/user/${encodeURIComponent(trimEmail)}`, {
        method: "GET",
      });
      console.log(myEmail);
      if (myEmail.ok) {
        alert(`Welcome back, ${trimEmail}! You are in. Please stay tuned for updates`);
        setEmail("");
        return;
      }
      
     
    } catch (err) {
      console.log(err);
    }

    try {
      const response = await fetch(`/api/user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email : trimEmail }),
      });

      
      console.log(response);
      if (!response.ok) {
        alert("Failed to load email");
      } else {
        alert(`Welcome, ${trimEmail}!`);

      setEmail("");
      }

      

    } catch (err) {
      console.log(err);
      alert("Failed to load email. Please try again.");
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#F5F5DC"
    >
      <Typography variant="h4" gutterBottom>
        Welcome to PawSwipe
      </Typography>
      <Box mb={2}>
        <TextField
          label="Email"
          sx={{
            width: '300px',
            '& .MuiInputBase-root': {
              padding: '5px',
            },
            '& .MuiInputLabel-root': {
              fontSize: '15px',
            },
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box>
        <Button 
        variant="contained" 
        color="primary"
        onClick={loadEmail}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
