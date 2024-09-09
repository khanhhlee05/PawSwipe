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
  Box
} from "@mui/material";
import { useSession } from "next-auth/react";
import { Close } from "@mui/icons-material";
import Image from "next/image";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

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
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Future Furiends ❤️🐶
      </Typography>
      {favorites.length > 0 ? (
        <Grid container spacing={4}>
          {favorites.map((pet) => (
            <Grid item key={pet._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "50vh",
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
                  component="img"
                  image={pet.photoUrl}
                  alt={pet.name}
                />
                <CardContent
                  sx={{ flexGrow: 1, height: 200, overflow: "auto" }}
                >
                  <Typography gutterBottom variant="h5" component="h2">
                    {pet.name}
                  </Typography>
                  <Typography>{pet.breed}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.description}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    startIcon={<Close />}
                    size="small"
                    onClick={() => removeFavorite(pet)}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src="/notFound.jpg"
            width={400}
            height={400}
            alt="No favorites"
          />
          <Typography variant="h6" align="center">
            No favorites found.
          </Typography>
        </div>
      )}
    </Container>
  );
}
