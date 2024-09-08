"use client";

import "./PetCards.css";
import React, { useEffect, useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import { useSession } from "next-auth/react";

const PetCards = () => {
  const [pets, setPets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRefs = useRef([]);
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user)
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("/api/pets", {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);

        const email = user?.email;

        try {
          const myUser = await fetch(`/api/swipedright/${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const dataUser = await myUser.json();
          let wishList = dataUser.petId;

          let filteredData = data.filter((p) => !wishList.includes(p._id));
          // console.log(filteredData);
          setPets(filteredData);
          setCurrentIndex(filteredData.length - 1);
        } catch (error) {
          if (error.response?.status !== 404) {
            setPets(data);
            setCurrentIndex(data.length - 1);
          }
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (currentIndex < 0) {
        return;
      } // No more cards to swipe

      if (["ArrowLeft", "a"].includes(event.key)) {
        cardRefs.current[currentIndex]?.swipe("left"); // Trigger left swipe
      } else if (["ArrowRight", "d"].includes(event.key)) {
        cardRefs.current[currentIndex]?.swipe("right"); // Trigger right swipe
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const onSwipe = async (direction, pet) => {
    if (currentIndex >= 0) {
      setCurrentIndex(currentIndex - 1); // Move to the next card
    }
    if (direction === "right") {
      //Save pets to the wishlist array
      const email = user?.email;
      const updatedWishList = await fetch(`/api/swipedright/${email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ petId: pet._id, add: true }),
      });

      const pets = await updatedWishList.json();
      console.log(pets);
    }
  };
  return (
    <div className="card_container">
      {pets.map((pet, index) => (
        <TinderCard
          className="swipe"
          ref={(el) => (cardRefs.current[index] = el)}
          key={pet._id}
          preventSwipe={["up", "down"]}
          onSwipe={(direction) => onSwipe(direction, pet)}
        >
          <div
            className="card"
            style={{ backgroundImage: `url(${pet.photoUrl})` }}
          >
            <h3>{pet.name}</h3>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};
export default PetCards;
