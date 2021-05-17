import getRole from "../../helpers/getRole";
import getId from "../../helpers/getId";
import getDb from "../../helpers/db";

export default async (req, res) => {
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
  const schoolId = await getId();
  const { db } = await getDb();
  const setupComplete =
    role === "admin" &&
    Boolean(
      await db.collection("schools").findOne({
        id: schoolId
      })
    );
  res.json({ role, setupComplete });
};
