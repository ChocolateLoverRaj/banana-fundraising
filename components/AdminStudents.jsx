import { Statistic, Row, Col } from "antd";

const AdminStudents = (props) => {
  const { school } = props;

  const loading = !school;

  const totalEmails = school?.students.reduce((current, { emails }) => current + emails.length, 0)

  return (
    <Row justify="space-between">
      <Col>
        <Statistic
          loading={loading}
          title="Students Logged In"
          value={school?.students.length}
        />
      </Col>
      <Col>
        <Statistic loading={loading} title="Emails Sent" value={totalEmails} />
      </Col>
      <Col>
        <Statistic loading={loading} title="Donations" value={0} />
      </Col>
    </Row>
  );
};

export default AdminStudents;
