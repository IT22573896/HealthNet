// routes/appointmentRoutes.js
import express from 'express';
import {
  createAppointment,
  getAllAppointments,
  updateAppointmentStatus,
  getDoctorsBySpecialization,getDoctorByName,appointmentdelete,appointmentgetone,updateAppointment
} from '../controllers/appointmentController.js';

const router = express.Router();

// Route to create appointment
router.post('/createAppointment', createAppointment);

// Route to get all appointments (for patient)
router.get('/getAllAppointments', getAllAppointments);

// Route to get all appointments (for admin)
router.get('/getAllAppointmentsAdmin', getAllAppointments);

router.get("/appointmentgetone/:id",appointmentgetone);

// Route to update appointment status (for admin)
router.put('/updateAppointmentStatus/:id', updateAppointmentStatus);

router.put('/updateAppointment/:id', updateAppointment); // Ensure this route is registered

// Route to delete appointment status (for admin)
router.put('/appointmentdelete/:id', appointmentdelete);

// Route to get doctors by specialization
router.get('/doctor/:specialization/:hospitalName', getDoctorsBySpecialization);

// Fetch doctor by name (for date and time auto-fill)
router.get('/doctor/:doctorname', getDoctorByName);

export default router; 
