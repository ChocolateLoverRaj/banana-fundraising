import getRole from "../../helpers/getRole";
import getDb from "../../helpers/db";
import getId from "../../helpers/getId";

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
  if (role !== "admin") {
    res.status(403).end();
    return;
  }
  const { db } = await getDb();
  const demoId = await getId();
  const schools = db.collection("schools");
  const existing = await schools.findOne({
    id: demoId
  });
  if (existing !== null) {
    res.status(409).end();
    return;
  }
  await schools.insertOne({
    id: demoId
  });
  res.status(201).end();
};
