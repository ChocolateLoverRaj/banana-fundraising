import getRole from "../../helpers/getRole";

export default (req, res) => {
  if (req.method !== "POST") {
    res.status(503).end();
    return;
  }
  const email = req.body.toLowerCase();
  if (email === "") {
    res.status(400).end();
    return;
  }
  const role = getRole(email);
  if (role === "none") {
    res.status(403).end();
    return;
  }
  res.json(`"${role}"`);
};
