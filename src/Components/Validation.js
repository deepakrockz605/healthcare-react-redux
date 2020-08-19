export const userBasicValidation = (e) => {
    const fields = e.values.userResponse
    const errors = []
    let count = 0

  
    if (!fields.fullName) {
      errors.fullName = 'LastName cannot be Empty !!'
      count = count + 1
    } else {
      if (fields.fullName.length <= 2) {
        errors.fullName = 'LastName length should be more than 2 !!'
        count = count + 1
      }
      if (!fields.fullName.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
        errors.fullName = 'LastName cannot contaims spaces or Numbers !!'
        count = count + 1
      }
    }


    if (!fields.password) {
        errors.password = 'Password cannot be Empty !!'
        count = count + 1
      } else {
        if (fields.password.length <= 7) {
          errors.password = 'Minimum Password Length is 8!!'
          count = count + 1
        }
        if (!fields.password.match(/^[a-zA-Z]+$/)) {
          errors.password = 'Password cannot contains Spaces !!'
          count = count + 1
        }
      }
  
    if (!fields.pincode) {
      errors.pincode = 'Pincode cannot be Empty !!'
      count = count + 1
    }
  
    return { errors, count }
  }