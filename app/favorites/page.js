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
} from "@mui/material";
import { useSession } from "next-auth/react";

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

  if (loading) {
    return <Typography>Loading...</Typography>; // Show loading message
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Future Furiends ❤️🐶
      </Typography>
      <Grid container spacing={4}>
        {favorites.map((pet) => (
          <Grid item key={pet._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia component="img" image={pet.photoUrl} alt={pet.name} />
              <CardContent sx={{ flexGrow: 1, height: 200, overflow: "auto" }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {pet.name}
                </Typography>
                <Typography>{pet.breed}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {pet.description}
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button startIcon={<Close />} size="small" />
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
