import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { 
  Result, 
  Row, 
  Col,
  Form, 
  Button,
  InputNumber
} from "antd";
import { MinusCircleOutlined, SmileOutlined } from '@ant-design/icons'

const DonatePage = () => {
  const router = useRouter();
  // eslint-disable-next-line
  const emailId = parseInt(router.query.emailId);
  const [fetchPromise, setFetchPromise] = useState();
  const [invalid, setInvalid] = useState(false);
  const [schoolName, setSchoolName] = useState();

  useEffect(() => {
    setInvalid(!Number.isInteger(emailId))
  }, [emailId]);

  useEffect(() => {
    if (Number.isInteger(emailId))
      setFetchPromise(fetch(`/api/donate?emailId=${emailId}`));
  }, [emailId]);

  const [declinePromise, setDeclinePromise] = useState()
  const [declined, setDeclined] = useState(false)

  const handleNext = () => {
    alert('This feature is not available yet.')
  }

  useEffect(() => {
    declinePromise
      ?.then(res => {
        setDeclinePromise(undefined)
        if (res.status === 200) {
          setDeclined(true)
        } else {
          alert('Error declining ' + res.status)
        }
      })
      .catch(e => {
        alert('Error declining ' + e.message)
      })
  }, [declinePromise])

  const handleDecline = () => {
    setDeclinePromise(fetch(`/api/donate/decline?emailId=${emailId}`, {
      method: 'PUT'
    }))
  }

  useEffect(() => {
    let canceled = false;
    // eslint-disable-next-line
    fetchPromise
      ?.then(async (res) => {
        if (canceled) return;
        if (res.status === 404) {
          setInvalid(true);
          return;
        }
        if (res.status !== 200) {
          alert("Error getting school name" + res.status);
          return;
        }
        const { name, amount } = await res.json();
        if (canceled) return;
        setSchoolName(name);
        if (amount === null)setDeclined(true)
      })
      .catch((e) => {
        alert("Error getting school name" + e.message);
      });
  }, [fetchPromise]);

  const handleDonate = () => {
    setDeclined(false)
  }

  return (
    <>
      {invalid 
        ? <Result status="404" title="Invalid Email Id" /> 
        : declined
          ? (
            <Result
              status='error'
              icon={<MinusCircleOutlined />}
              title='Donation Request Declined'
              subTitle={
                <>
                  It's okay, you don't need to donate to poor Timothy's school. Timothy will probably feel sad for the rest of his life, but he would've probably felt sad anyways even if you did donate. But there might've been a chance that raising money for his school could've made Timothy feel proud and useful, but we will never know because you declined the donation request.
                  {' '}
                  <SmileOutlined />
                </>
              }
              extra={[
                <Button 
                  key='donate' 
                  type='primary'
                  onClick={handleDonate}
                >
                  I changed my mind, I want to donate
                </Button>
              ]}
            />
          )
          : (
            <Row justify='center'>
              <Col>
                <h2>Would you like to donate to {schoolName}?</h2>
                <Form onFinish={handleNext}>
                  <Form.Item 
                    name='amount' 
                    label='Donation Amount ($)'
                    rules={[{
                      required: true,
                      min: 1,
                      type: 'number'
                    }]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Button 
                    htmlType='submit'
                    type='primary'
                  >
                    Next
                  </Button>
                </Form>
                <Button 
                  type='text'
                  onClick={handleDecline}
                  loading={declinePromise}
                >
                  No Thanks
                </Button>
              </Col>
            </Row>
          )}
    </>
  );
};

export default DonatePage;
