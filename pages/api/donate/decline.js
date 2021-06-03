import getDb from '../../../helpers/db'
import validateEmailId from '../../../helpers/validateEmailId'

export default async (req, res) => {
  if (req.method !== 'PUT') {
    console.log(req.method)
    res.status(405).end()
    return
  }
  const emailId = validateEmailId(req, res)
  if (emailId === undefined) return
  const { db } = await getDb()
  const result = await db.collection('schools').updateOne({
    students: { $elemMatch: { emails: { $elemMatch: { id: emailId } } } }
  }, {
    $set: {
      'students.$[].emails.$[].amount': null
    }
  })
  if (!Boolean(result.matchedCount)) {
    res.status(404).end()
    return
  }
  res.end()
}
