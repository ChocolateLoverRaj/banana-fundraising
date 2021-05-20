import { Statistic, Row, Col } from "antd";

const AdminStudents = (props) => {
  const { school } = props;

  const loading = !school;

  return (
    <Row>
      <Col>
        <Statistic
          loading={loading}
          title="Students Logged In"
          value={school?.students.length}
        />
        <Statistic loading={loading} title="Total Emails Sent" value={0} />
      </Col>
    </Row>
  );
};

export default AdminStudents;
