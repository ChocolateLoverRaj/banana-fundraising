import { useRouter } from 'next/router'
import { Input, Alert } from 'antd'
import * as sanitize from 'sanitize-html'

const EmailPage = () => {
  const { query: { from, subject, to, body } } = useRouter()

  return (
    <>
      <Alert message={<>Viewing demo email of <b>{to}</b></>} />
      <Input addonBefore='From' defaultValue={from} readOnly bordered={false} />
      <Input addonBefore='Subject' defaultValue={subject} readOnly bordered={false} />
      <div dangerouslySetInnerHTML={sanitize(body)} />
    </>
  )
}

export default EmailPage
