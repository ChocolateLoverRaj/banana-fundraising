import validateEmail from "validate-email";

const getRole = (email) =>
  validateEmail(email)
    ? email.endsWith("@pewaukeeschools.org")
      ? /\d/.test(email)
        ? "student"
        : email === "admin@pewaukeeschools.org"
        ? "admin"
        : "teacher"
      : "none"
    : "none";

export default getRole;
