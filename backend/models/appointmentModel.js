// models/appointmentModel.js
import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  starttime: {
    type: String,
    required: true,
  },
 
  fee: {
    type: Number,
    required: true,
    
  },  hospitalName: {
    type: String,
    required: true,

  },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
