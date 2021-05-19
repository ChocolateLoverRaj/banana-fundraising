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
  const schools = db.collection("schools");
  const school = await schools.findOne({
    id: schoolId
  });
  if (role === "student") {
    if (!school) {
      res.status(404).end();
      return;
    }
    if (
      school.students.find((student) => student.email === email) === undefined
    ) {
      await schools.updateOne(
        { _id: school._id },
        {
          $push: { students: { email } }
        }
      );
    }
    res.json({ role });
  } else {
    res.json({ role, setupComplete: Boolean(school) });
  }
};
