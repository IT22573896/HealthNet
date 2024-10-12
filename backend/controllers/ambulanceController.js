// ambulanceController.js
import asyncHandler from 'express-async-handler';
import Ambulance from '../models/ambulanceModel.js';

// @desc    Create a new ambulance
// @route   POST /api/ambulances
// @access  Public or Protected (based on your needs)
const createAmbulance = asyncHandler(async (req, res) => {
  const {
    ambulancenumber,
    vehiclenumber,
    drivername,
    drivercontact,
    driveremail,
    ambulancetype,
    availability
  } = req.body;

  const ambulance = new Ambulance({
    ambulancenumber,
    vehiclenumber,
    drivername,
    drivercontact,
    driveremail,
    ambulancetype,
    availability
  });

  const createdAmbulance = await ambulance.save();
  res.status(201).json(createdAmbulance);
});

// @desc    Get all ambulances
// @route   GET /api/ambulances
// @access  Public or Protected
const getAmbulances = asyncHandler(async (req, res) => {
  const ambulances = await Ambulance.find({});
  res.json(ambulances);
});

// @desc    Get ambulance by ID
// @route   GET /api/ambulances/:id
// @access  Public or Protected
const getAmbulanceById = asyncHandler(async (req, res) => {
  const ambulance = await Ambulance.findById(req.params.id);

  if (ambulance) {
    res.json(ambulance);
  } else {
    res.status(404);
    throw new Error('Ambulance not found');
  }
});

// @desc    Update ambulance details
// @route   PUT /api/ambulances/:id
// @access  Public or Protected
const updateAmbulance = asyncHandler(async (req, res) => {
  const {
    ambulancenumber,
    vehiclenumber,
    drivername,
    drivercontact,
    driveremail,
    ambulancetype,
    availability
  } = req.body;

  const ambulance = await Ambulance.findById(req.params.id);

  if (ambulance) {
    ambulance.ambulancenumber = ambulancenumber || ambulance.ambulancenumber;
    ambulance.vehiclenumber = vehiclenumber || ambulance.vehiclenumber;
    ambulance.drivername = drivername || ambulance.drivername;
    ambulance.drivercontact = drivercontact || ambulance.drivercontact;
    ambulance.driveremail = driveremail || ambulance.driveremail;
    ambulance.ambulancetype = ambulancetype || ambulance.ambulancetype;
    ambulance.availability = availability || ambulance.availability;

    const updatedAmbulance = await ambulance.save();
    res.json(updatedAmbulance);
  } else {
    res.status(404);
    throw new Error('Ambulance not found');
  }
});

// @desc    Delete an ambulance
// @route   DELETE /api/ambulances/:id
// @access  Public or Protected
// ambulanceController.js
// @desc    Delete an ambulance
// @route   DELETE /api/ambulances/:id
// @access  Public or Protected
const deleteAmbulance = asyncHandler(async (req, res) => {
    const ambulance = await Ambulance.findById(req.params.id);
  
    if (ambulance) {
      // Replace .remove() with .deleteOne() or .findByIdAndDelete()
      await ambulance.deleteOne(); // Correct usage for deletion
      res.json({ message: 'Ambulance removed' });
    } else {
      res.status(404);
      throw new Error('Ambulance not found');
    }
  });
  

export {
  createAmbulance,
  getAmbulances,
  getAmbulanceById,
  updateAmbulance,
  deleteAmbulance
};
