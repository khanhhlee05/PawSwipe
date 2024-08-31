'use client';


//import { SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/nextjs";
import { Typography } from "@mui/material";
import { Button, Container, Box, AppBar, Toolbar, Grid } from "@mui/material";
import Head from "next/head";
import './globalsLanding.css'; 



export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
  
    if (checkoutSession.statusCode == 500){
      console.log(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }

  

  return (
    <Container maxWidth="100vw"
      sx={{
        background: "rgb(238,174,202)",
        background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        backgroundPosition: 'center',
        minHeight: '100vh',
        py: 4,
        backgroundColor: 'black',
        overflow: 'hidden',
      }}>
      <Head>
        <title>PawSwipe</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>


      <Box
        sx={{
          borderRadius: 2, // Adjust the border radius as needed
          overflow: 'hidden', // Ensure the rounded corners are applied correctly
          backgroundColor: 'rgba(135, 62, 113, 0.1)', // Semi-transparent background
          backdropFilter: 'blur(10px)', // Optional: adds a blur effect to the background
          boxShadow: 'none', // Remove box shadow if desired
          position: 'relative',
        }}
      >
      <AppBar position="static" sx={{ backgroundColor: 'transparent', width: '100%' }}>
        <Toolbar>
          <Typography className="professional-text-title"
            sx={{ fontSize: { xs: '2rem', sm: '3rem' }, flexGrow: 1 }}>
            PawSwipe
          </Typography>
        </Toolbar>
      </AppBar>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        height: 'calc(100vh - 64px)', // Adjust for the height of AppBar
        mt: 4,
      }}>
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          justifyContent: 'top',
          padding: 2,
          mt: 8,
        }}>
          <Typography variant="h3" gutterBottom className="professional-text-subtitle" sx={{ mb: 4 }}>
          Discover a smarter, more personalized way to find your perfect pet match.
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            className="button glowing-border"
            sx={{
              backgroundColor: '#8A7D72',
              borderRadius: '30px',
              padding: '10px 20px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#705E52',
              },
              mr: 3,
              fontSize: '1em',
              width: "200px"
            }}
            href=""
          >
            Get Started
          </Button>

          <Box sx={{ mt: 4 }}>
            <img 
                src="image.jpg" // Replace with your image path
                alt="Description of image"
                style={{
                width: '100%',       // Image will take up full width of its container
                maxWidth: '800px',    // Increase the maximum width to make it bigger
                borderRadius: '16px', // Add rounded corners with 16px radius
                }}
            />
            </Box>

        </Box>

        <Box
          sx={{
            width: '1.5px',
            backgroundColor: 'white',
            height: '80%',
            margin: '0 16px',
            position: 'relative',
            top: '20px',
          }}
        ></Box>

        

        <Box sx={{ my: 6, mb: 10, mt: 10, mr: 5, ml: 5 }}>
        <Grid container spacing={4} direction="column">
            <Grid item xs={12} md={12}>
            <Box sx={{ bgcolor: 'rgba(135, 62, 113, 0.4)', p: 3, borderRadius: 2, width: "500px" }}>
                <Typography variant="h6" gutterBottom color="rgb(225, 218, 199)">
                Title stat 1
                </Typography>
                <Typography variant="body1" color="rgb(225, 218, 199)">
                Content
                </Typography>
            </Box>
            </Grid>
            <Grid item xs={12} md={12}>
            <Box sx={{ bgcolor: 'rgba(135, 62, 113, 0.4)', p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="rgb(225, 218, 199)">
                Title stat 2
                </Typography>
                <Typography variant="body1" color="rgb(225, 218, 199)">
                Content
                </Typography>
            </Box>
            </Grid>
            <Grid item xs={12} md={12}>
            <Box sx={{ bgcolor: 'rgba(135, 62, 113, 0.4)', p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="rgb(225, 218, 199)">
                Title stat 3
                </Typography>
                <Typography variant="body1" color="rgb(225, 218, 199)">
                Content
                </Typography>
            </Box>
            </Grid>
        </Grid>
        </Box>


        
      </Box>
    </Container>
  );
}