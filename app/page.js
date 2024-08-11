'use client'
import { Box, Button, TextField, Typography } from "@mui/material"
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [email, setEmail] = useState("")

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
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>

  );
}
