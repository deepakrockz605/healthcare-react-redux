import axios from "./index";

export const guestLogin = (user) => {
  return axios
    .post("/guest-login", {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const doctorLogin = (user) => {
  return axios
    .post("/doctor-login", {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllPatients = () => {
  return axios
    .get("/")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletePatient = (id) => {
  return axios.delete(`http://localhost:5000/api/${id}`).then((res) => {
    return res.data;
  });
};

export const getPatient = (id) => {
  return axios
    .get(`/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addNewPatient = (patientData) => {
  return axios
    .post("/", {
      fullName: patientData.fullName,
      age: patientData.age,
      email: patientData.email,
      password: patientData.password,
      phone: patientData.phone,
      diagnosis: patientData.diagnosis,
      prescribedMedication: patientData.prescribedMedication,
      address: patientData.address,
      city: patientData.city,
      state: patientData.state,
      country: patientData.country,
      pincode: patientData.pincode,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updatePatient = (id, patientData) => {
  return axios
    .put(`/${id}`, {
      fullName: patientData.fullName,
      age: patientData.age,
      email: patientData.email,
      phone: patientData.phone,
      diagnosis: patientData.diagnosis,
      prescribedMedication: patientData.prescribedMedication,
      address: patientData.address,
      city: patientData.city,
      state: patientData.state,
      country: patientData.country,
      pincode: patientData.pincode,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updatePassword = (id, newPassword) => {
  return axios
    .put(`/password-update/${id}`, {
      password: newPassword,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
