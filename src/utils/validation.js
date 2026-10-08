export const validateUsername = (username) => {
  if (!username.trim()) {
    return "Username is required";
  }

  if (username.length < 3) {
    return "Username must be at least 3 characters";
  }

  if (username.length > 20) {
    return "Username must be less than 20 characters";
  }

  return "";
};

export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!pattern.test(email)) {
    return "Please enter a valid email";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};

export const validateFullName = (fullName) => {
  if (!fullName.trim()) {
    return "Full name is required";
  }

  if (fullName.trim().length < 2) {
    return "Full name must be at least 2 characters";
  }

  return "";
};