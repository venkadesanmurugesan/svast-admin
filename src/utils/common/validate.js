const validateEmail = (value) => {
  if (!value) {
    return "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return "Invalid email address";
  }
};

const validatePassword = (value) => {
  if (!value) {
    return "Password is required";
  } else if (value.length < 8) {
    return "At least 8 characters long";
  }
  // else if (
  //   !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
  //     value
  //   )
  // ) {
  //   errors.password = [
  //     "At least 8 characters long",
  //     "Contains at least one uppercase letter",
  //     "Contains at least one lowercase letter",
  //     "Contains at least one digit",
  //     "Contains at least one special character (e.g., @$!%*?&)",
  //   ];
  // }
};

export { validateEmail, validatePassword };
