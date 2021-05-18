import getId from "../../helpers/getId";
import getDb from "../../helpers/db";
import getRole from "../../helpers/getRole";

export default async (req, res) => {
  if (getRole(req.headers.token) === "none") {
    res.status(403).end();
    return;
  }
  if (req.method === "GET") {
    const { db } = await getDb();
    const schools = db.collection("schools");
    const id = await getId();
    const school = await schools.findOne({ id });
    if (!school) {
      res.status(404).end();
      return;
    }
    res.json({ goal: school.goal, progress: school.goalProgress });
  } else if (req.method === "PUT") {
    if (typeof req.body !== "number" || req.body <= 0) {
      res.status(400).end();
      return;
    }
    const { db } = await getDb();
    const schools = db.collection("schools");
    const id = await getId();
    const { matchedCount } = await schools.updateOne(
      {
        id
      },
      {
        $set: { goal: req.body }
      }
    );
    if (!Boolean(matchedCount)) {
      res.status(404).end();
      return;
    }
    res.status(200).end();
  }
};
