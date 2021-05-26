import { useRouter } from "next/router";
import { Input, Alert } from "antd";
import * as sanitize from "sanitize-html";

const EmailPage = () => {
  const {
    query: { from, subject, to, body }
  } = useRouter();

  return (
    <>
      <Alert
        message={
          <>
            Viewing demo email of <strong>{to}</strong>
          </>
        }
        description={
          <>
            The real website would use the{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send"
            >
              Gmail API
            </a>
            , but since the school has disabled it this website doesn't actually
            send emails.
          </>
        }
      />
      <Input addonBefore="From" value={from} readOnly />
      <Input addonBefore="Subject" value={subject} readOnly />
      <div dangerouslySetInnerHTML={{ __html: sanitize(body) }} />
    </>
  );
};

export default EmailPage;
