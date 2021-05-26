import getRole from "../../helpers/getRole";
import Ajv from "ajv";
import getDb from "../../helpers/db";
import getId from "../../helpers/getId";
import randomInt from "../../helpers/randomInt";

const schema = {
  type: "object",
  properties: {
    to: {
      type: "object",
      properties: {
        name: {
          type: "string",
          minLength: 1
        },
        email: {
          type: "string",
          minLength: 1
        }
      },
      required: ["name", "email"]
    },
    subject: {
      type: "string",
      minLength: 1
    },
    message: {
      type: "string",
      minLength: 1
    }
  },
  required: ["to", "subject", "message"]
};

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const email = req.headers.token.toLowerCase();
  const role = getRole(email);
  if (role === "none") {
    res.status(403).end();
    return;
  }
  const ajv = new Ajv();
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    console.log(req.body);
    console.log(ajv.errors);
    res.status(400).json(ajv.errors);
    return;
  }
  const { db } = await getDb();
  const schools = db.collection("schools");
  const id = await getId();
  const school = await schools.findOne({ id });
  if (!school) {
    res.status(403).end();
    return;
  }
  const emailId = randomInt();
  const studentIndex = school.students.findIndex(
    (student) => student.email === email
  );
  await schools.updateOne(
    { _id: school._id },
    {
      $push: {
        [`students.${studentIndex}.emails`]: { id: emailId }
      }
    }
  );
  res.status(201).json(emailId);
};
