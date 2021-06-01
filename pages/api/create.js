import getRole from "../../helpers/getRole";
import getDb from "../../helpers/db";
import getId from "../../helpers/getId";
import Ajv from "ajv";

const schema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      minLength: 1
    },
    name: {
      type: "string",
      minLength: 1
    }
  },
  required: ["email", "name"]
};

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(503).end();
    return;
  }
  const ajv = new Ajv();
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    res.status(400).json(ajv.errors);
    return;
  }
  const email = req.body.email.toLowerCase();
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
    id: demoId,
    goal: 10000,
    goalProgress: 0,
    students: [],
    name: req.body.name
  });
  res.status(201).end();
};
