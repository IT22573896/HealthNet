// controllers/appointmentController.js
import Appointment from '../models/appointmentModel.js';
import Doctor from '../models/doctorModel.js';

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


// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { approvalStatus } = req.body;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { approvalStatus },
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
  
export const appointmentdelete = async(req, res) => {
    try{
        const id = req.params.id;
        const appointmentsExist = await Appointment.findById(id);

        if(!appointmentsExist){
            return res.status(401).json({msg: "Appointment data not found"});
        }

       await Appointment.findByIdAndDelete(id);
        res.status(200).json({msg:"Doctor deleted successfully"});
    }catch(error){
        res.status(500).json({error: error});
    }
}
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
  