import getId from "../../helpers/getId";
import getDb from "../../helpers/db";
import getRole from "../../helpers/getRole";

export default async (req, res) => {
  if (getRole(req.headers.token) === "none") {
    res.status(403).end();
    return;
  }
  const { db } = await getDb();
  const schools = db.collection("schools");
  const id = await getId();
  const school = await schools.findOne({ id });
  if (!school) {
    res.status(404).end();
    return;
  }
  res.json({ goal: school.goal, progress: school.goalProgress });
};
