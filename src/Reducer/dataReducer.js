import { USER_DOCTOR, USER_GUEST , VIEW_PATIENT_DETAILS ,CHECK_ROLE ,PATIENT_PROFILE , LOGIN , LOGOUT } from "../Actions/action-types";
// import storage from 'redux-persist/lib/storage'

const initState = {
  userID : '',
  userCount : '',
  userRole :'',
  patientProfile : {},
  isAuthenticated : ''
};

const dataReducer = (state = initState, action) => {
  state = state || initState;

  if (action.type === USER_DOCTOR) {
    console.log("Doctor");
  }

  if (action.type === USER_GUEST) {
    console.log("Guest");
  }
  
  if (action.type === VIEW_PATIENT_DETAILS) {
      state.userID = action.id
      state.userCount = action.count
      return{
        ...state
      }
  }

  if(action.type === CHECK_ROLE){
    state.userRole = action.role
    return{
      ...state
    }
  }

  if(action.type === PATIENT_PROFILE){
    state.patientProfile = action.data
    return{
      ...state
    }
  }

  if(action.type === LOGIN){
    state.isAuthenticated = action.val

    return{
      ...state
    }
  }

  if(action.type === LOGOUT){
    state.isAuthenticated = false
    // state = undefined;
    localStorage.clear()
    return{
        ...state
    }
  }
  
  
  else {
    return state;
  }
};

export default dataReducer;
