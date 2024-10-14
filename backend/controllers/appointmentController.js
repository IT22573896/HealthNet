// controllers/appointmentController.js
import Appointment from '../models/appointmentModel.js';
import Doctor from '../models/doctorModel.js';
import DeletedAppointment from '../models/deletedAppointmentModel.js'; // Import the DeletedAppointment model

// Create appointment
export const createAppointment = async (req, res) => {
  try {
    const appointmentData = new Appointment(req.body);
    await appointmentData.save();
    res.status(201).json({ msg: "Appointment created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get all appointments for patient
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all appointments for Admin
export const getAllAppointmentsAdmin = async (req, res) => {
    try {
      const appointments = await Appointment.find();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //get one appointment update -admin
  export const appointmentgetone = async(req, res) => {
    try{
        const id = req.params.id;
        const appointmentExist = await Appointment.findById(id);

        if(!appointmentExist){
            return res.status(404).json({msg: "Doctor data not found"});
        }

        res.status(200).json(appointmentExist);
    }catch(error){
        res.status(500).json({error: error});
    }
}




export const updateAppointment = async (req, res) => {
    const { date, starttime } = req.body;
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { date, starttime },
        { new: true }
      );
  
      if (!updatedAppointment) {
        return res.status(404).json({ msg: "Appointment not found" });
      }
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
// Fetch all deleted appointments
export const getDeletedAppointments = async (req, res) => {
  try {
    const deletedAppointments = await DeletedAppointment.find();
    res.status(200).json(deletedAppointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all deleted appointments
export const getDeletedAppointmentsPatient = async (req, res) => {
  try {
    const deletedAppointments = await DeletedAppointment.find();
    res.status(200).json(deletedAppointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete an appointment and move it to DeletedAppointment
export const appointmentdelete = async (req, res) => {
  try {
    const id = req.params.id;
    const appointmentExist = await Appointment.findById(id);

    if (!appointmentExist) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    // Create a new entry in the DeletedAppointment collection
    const deletedAppointment = new DeletedAppointment({
      name: appointmentExist.name,
      hospitalName: appointmentExist.hospitalName,
      doctorName: appointmentExist.doctorName,
      date: appointmentExist.date,
      starttime: appointmentExist.starttime,
      status: appointmentExist.status,
    });
    await deletedAppointment.save(); // Save the deleted appointment data

    // Delete the original appointment from the Appointment collection
    await Appointment.findByIdAndDelete(id);

    res.status(200).json({ msg: "Appointment moved to deleted appointments successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get doctors by specialization
export const getDoctorsBySpecialization = async (req, res) => {
  const { specialization } = req.params;
  try {
    const doctors = await Doctor.find({ specialization });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get doctor by name to retrieve date and start time
export const getDoctorByName = async (req, res) => {
    const { doctorname } = req.params;
    try {
      const doctor = await Doctor.findOne({ doctorname });
      if (!doctor) {
        return res.status(404).json({ msg: "Doctor not found" });
      }
      res.status(200).json(doctor); // This returns the date and starttime of the doctor
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


