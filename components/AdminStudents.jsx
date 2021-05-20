import { Statistic, Row, Col } from "antd";

const AdminStudents = (props) => {
  const { school } = props;

  const loading = !school;

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
        <Statistic loading={loading} title="Emails Sent" value={0} />
      </Col>
      <Col>
        <Statistic loading={loading} title="Donations" value={0} />
      </Col>
    </Row>
  );
};

export default AdminStudents;
