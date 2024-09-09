"use client";

import React from "react";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { Close } from "@mui/icons-material";
import Image from "next/image";
import Header from "../../components/dashboard/Header"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [open, setOpen] = useState(false); // Add open state
  const [selectedPet, setSelectedPet] = useState(null)
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);


  const handleCardClick = (pet) => {
    setSelectedPet(pet);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedPet(null);
  };

  const fetchFavorites = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const pets = [];
      const getWishlistResponse = await fetch(
        `/api/swipedright/${user?.email}`
      );
      const wishlistData = await getWishlistResponse.json();
      const petIds = wishlistData.petId;
      for (const petId of petIds) {
        const getPetDataResponse = await fetch(`api/pets/${petId}`);
        const pet = await getPetDataResponse.json();
        pets.push(pet);
      }
      setFavorites(pets);
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const removeFavorite = async (pet) => {
    try {
      const updatedWishList = await fetch(`/api/swipedright/${user?.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ petId: pet._id, add: false }),
      });

      if (updatedWishList.ok) {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((favorite) => favorite._id !== pet._id)
        );
      }
    } catch (error) {
      console.error("Error removing favorite: ", error.message);
      return error.message;
    }
  };


 
    if (loading) {
      return (
        <Box
          sx={{
            position: "fixed", // Use fixed positioning
            top: "50%", // Center vertically
            left: "50%", // Center horizontally
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
  

    return (
      <Box
        width="100vw"
        height="100vh"
        sx={{ backgroundImage: 'url(/background1.jpg)', py: 8, backgroundSize: 'cover', backgroundAttachment: { xs: 'fixed', sm: 'scroll' } }} >
          <Header />
      
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Future Furiends ❤️🐶
        </Typography>
        {favorites.length > 0 ? (
          <Box
            sx={{
              maxHeight: '70vh', // Set the maximum height for scrollability
              overflowY: 'auto', // Enable vertical scrolling
            }}
          >
            <Grid container spacing={4}>
              {favorites.map((pet) => (
                <Grid item key={pet._id} xs={12} sm={6} md={4}>
                  <Card

                    sx={{
                      height: "100",
                      display: "flex",
                      flexDirection: "column",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardMedia
                      onClick={() => handleCardClick(pet)}
                      component="img"
                      image={pet.photoUrl}
                      alt={pet.name}
                      sx={{ height: "200" }} // Optional: Set height of image
                    />
                    <CardContent
                      sx={{ flexGrow: 1, height: 150 }} // Scrollable content
                    >
                      <Typography variant="h6" component="h2" color="black">
                        {pet.name} {pet.breed ? `| ${pet.breed}` : "Mystery"}
                      </Typography>
                      <Typography>{pet.location}</Typography>

                    </CardContent>

                    <CardActions>
                      <Button
                        startIcon={<Close />}
                        size="medium"
                        onClick={() => removeFavorite(pet)}
                      />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Image
              src="/notFound.jpg"
              width={400}
              height={400}
              alt="No favorites"
            />
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              No favorites found.
            </Typography>
          </Box>
        )}

        {/*Modal for pet info*/}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedPet?.name}</DialogTitle>
          <DialogContent>
            <img
              src={selectedPet?.photoUrl}
              alt={selectedPet?.name}
              style={{ width: "100%" }}
            />
            <Typography variant="h6">{selectedPet?.breed}</Typography>
            <Typography>{selectedPet?.description}</Typography>
          </DialogContent>
        </Dialog>
      </Box>
    );

  }
