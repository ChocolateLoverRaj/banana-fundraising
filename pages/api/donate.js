import getDb from "../../helpers/db";

export default async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }
  console.log(req.params, req.query);
  // eslint-disable-next-line
  const emailId = parseInt(req.params.emailId);
  if (!Number.isInteger(emailId)) {
    res.status(400).end();
    return;
  }
  const { db } = await getDb();
  const school = await db.collection("schools").findOne({
    students: { $in: { emails: { $in: { id: emailId } } } }
  });
  if (!Boolean(school)) {
    res.status(404).end();
    return;
  }
  res.status(200).end();
};
