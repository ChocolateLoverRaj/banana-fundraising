const validateEmailId = (req, res) => {
  // eslint-disable-next-line
  const emailId = parseInt(req.query.emailId);
  if (!Number.isInteger(emailId)) {
    res.status(400).end();
    return
  }
  return emailId
}

export default validateEmailId
