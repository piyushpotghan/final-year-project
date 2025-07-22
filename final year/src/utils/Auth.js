// src/utils/auth.js

export const login = ({ email, password }) => {
  const adminEmail = "admin@clinic.com";

  if (email === adminEmail && password === "admin123") {
    return { role: "admin", email };
  } else if (email && password) {
    return { role: "patient", email };
  } else {
    return null;
  }
};