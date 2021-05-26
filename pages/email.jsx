import { useRouter } from 'next/router'
import { Input, Alert } from 'antd'

const EmailPage = () => {
  const { query: { from, subject, to, body } } = useRouter()

  return (
    <>
      <Alert message={<>Viewing demo email of <b>{to}</b></>} />
      <Input addonBefore='From' value={from} />
      <Input addonBefore='Subject' value={subject} />
      {body}
    </>
  )
}

export default EmailPage
