import getId from "../../helpers/getId";
import getDb from "../../helpers/db";
import getRole from "../../helpers/getRole";
import Ajv from "ajv";

const keys = {
  student: new Set().add("goal").add("goalProgress").add("name"),
  admin: new Set().add("goal").add("goalProgress").add("students").add("name")
};

const patchSchema = {
  type: "object",
  properties: {
    goal: {
      type: "number",
      exclusiveMinimum: 0,
      multipleOf: 1
    }
  },
  additionalProperties: false
};

export default async (req, res) => {
  const role = getRole(req.headers.token);
  if (role === "none") {
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
    res.json(
      Object.fromEntries(
        Object.entries(school).filter(([key]) => keys[role].has(key))
      )
    );
  } else if (req.method === "PATCH") {
    if (role === "student") {
      res.status(403).end();
      return;
    }
    const ajv = new Ajv();
    const valid = ajv.validate(patchSchema, req.body);
    if (!valid) {
      res.status(400).json(ajv.errors);
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
        $set: req.body
      }
    );
    if (!Boolean(matchedCount)) {
      res.status(404).end();
      return;
    }
    res.status(200).end();
  }
};
