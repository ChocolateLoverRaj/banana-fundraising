import GoogleButton from "react-google-button";
import { Row, Col, Form, Input, Button, notification, Result } from "antd";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "../helpers";
import { DashboardButton } from "../components";

const TeachersPage = () => {
  const [loginReq, setLoginReq] = useState();
  const router = useRouter();
  const [login, setLogin] = useContext(GlobalContext);

  useEffect(() => {
    /* eslint-disable-next-line */
    loginReq
      ?.then(async (res) => {
        console.log(res.status);
        if (res.status === 200) {
          const { role, setupComplete } = await res.json();
          setLogin((login) => ({ ...login, role, setupComplete }));
          router.replace(
            role === "admin" && !setupComplete ? "/create" : "/dashboard"
          );
        } else {
          setLogin(undefined);
          notification.error({
            message: "Error Logging In",
            description:
              "Your email address is not part of a Google Workspace.",
            duration: 10
          });
        }
        setLoginReq(undefined);
      })
      .catch((e) => {
        console.log(e);
        alert("Error logging in");
      });
  }, [loginReq, router, setLogin]);

  const handleFinish = ({ email }) => {
    setLogin({ email });
    setLoginReq(
      fetch("/api/login", {
        method: "POST",
        body: email
      })
    );
  };

  return (
    <>
      {login?.role ? (
        <Result
          status="success"
          title="Already Logged In"
          extra={[<DashboardButton key="main" />]}
        />
      ) : (
        <>
          <Row align="middle">
            <Col span={12}>
              <GoogleButton disabled />
            </Col>
            <Col span={12}>
              The real website would be{" "}
              <a
                href="https://developers.google.com/identity/protocols/oauth2"
                target="_blank"
                rel="noreferrer"
              >
                Google login based
              </a>
              , but the school has disabled Google Cloud.
            </Col>
          </Row>
          <Row justify="space-around" align="middle">
            <Col>For demo purposes, you can type in an email.</Col>
          </Row>
          <Row align="middle">
            <Col span={12}>
              <Form onFinish={handleFinish}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ type: "email" }, { required: true }]}
                >
                  <Input disabled={loginReq} />
                </Form.Item>
                <Form.Item>
                  <Button loading={loginReq} type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={12}>
              <ul>
                <li>
                  <pre>someemail@gmail.com</pre> won't work
                </li>
                <li>
                  <pre>aaaaaaa##@pewaukeechools.org</pre> is student
                </li>
                <li>
                  <pre>aaaaaaa@pewaukeeschools.org</pre> is teacher
                </li>
                <li>
                  <pre>admin@pewaukeeschool.org</pre> is school admin
                </li>
              </ul>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default TeachersPage;
