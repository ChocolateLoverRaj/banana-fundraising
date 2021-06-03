import getDb from "../../helpers/db";
import validateEmailId from '../../helpers/validateEmailId'

export default async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }
  // eslint-disable-next-line
  const emailId = validateEmailId(req, res)
  if (emailId === undefined) return
  const { db } = await getDb();
  const school = await db.collection("schools").findOne({
    students: { $elemMatch: { emails: { $elemMatch: { id: emailId } } } }
  });
  if (!Boolean(school)) {
    res.status(404).end();
    return;
  }
  res.json({
    name: school.name,
    amount: school.students
      .map(({ emails }) => emails.find(({ id }) => id === emailId)?.amount)
      .flat(0)
      [0]
  })
}
