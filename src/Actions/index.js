import { USER_DOCTOR, USER_GUEST , VIEW_PATIENT_DETAILS , CHECK_ROLE  , PATIENT_PROFILE , LOGIN , LOGOUT} from "./action-types";

export const userDoctor = (id) => {
  return {
    type: USER_DOCTOR,
    id,
  };
};

export const userGuest = (id) => {
  return {
    type: USER_GUEST,
    id,
  };
};

export const checkUser = role => {
  return {
    type : CHECK_ROLE,
    role
  }
}


export const viewPatientDetails = (count , id) => {
  return {
    type : VIEW_PATIENT_DETAILS,
    count,
    id
  }
}

export const viewPatientProfile = (data) => {
  return {
    type : PATIENT_PROFILE,
    data
  }
}

export const login = (val) => {
  return {
    type : LOGIN,
    val
  }
}


export const logout = () => {
  return {
    type : LOGOUT,
  }
}