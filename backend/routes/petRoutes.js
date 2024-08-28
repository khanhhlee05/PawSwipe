/* const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');

router.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.find({ isAdopted: false }).limit(20);
    res.json(pets);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/pets/swipe', async (req, res) => {
  const { petId, action } = req.body;
  try {
    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).send('Pet not found');

    if (action === 'like') {
      console.log(`User liked pet: ${pet.name}`);
    } else if (action === 'dislike') {
      console.log(`User disliked pet: ${pet.name}`);
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/pets/adopt/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, { isAdopted: true });
    if (!pet) return res.status(404).send('Pet not found');

    res.send('Pet adopted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router; */