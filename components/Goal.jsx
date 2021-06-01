import { Row, Col, Statistic, Progress } from "antd";
import { StatisticEditable } from ".";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../helpers";

const Goal = (props) => {
  const { school, onChange } = props;

  const [login] = useContext(GlobalContext);
  const [editSchoolPromise, setEditSchoolPromise] = useState();

  const handleChange = (goal) => {
    setEditSchoolPromise(
      fetch("/api/school", {
        method: "PATCH",
        headers: [
          ["Content-Type", "application/json"],
          ["Token", login.email]
        ],
        body: JSON.stringify({ goal })
      })
    );
    onChange((school) => ({ ...school, goal }));
  };

  useEffect(() => {
    // eslint-disable-next-line
    editSchoolPromise
      ?.then((res) => {
        if (res.status === 200) {
          setEditSchoolPromise(undefined);
        } else {
          alert("Something went wrong editing goal");
        }
      })
      .catch((e) => {
        alert("Error editing goal");
      });
  }, [editSchoolPromise]);

  const loading = !Boolean(school);

  return (
    <>
      <Row>
        <Col>
          <h2>Goal for {school?.name}</h2>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>
          {login?.role === "admin" ? (
            <StatisticEditable
              loading={loading}
              title="Goal"
              prefix="$"
              value={school?.goal}
              onChange={handleChange}
              changing={Boolean(editSchoolPromise)}
              rules={[{ type: "number", min: 1 }]}
            />
          ) : (
            <Statistic
              loading={loading}
              prefix="$"
              title="Goal"
              value={school?.goal}
            />
          )}
        </Col>
        <Col>
          <Statistic
            loading={loading}
            title="Money Raised"
            prefix="$"
            value={school?.goalProgress}
          />
        </Col>
        <Col>
          <Statistic
            loading={loading}
            title="Goal Progress"
            formatter={() => (
              <Progress
                type="circle"
                width={48}
                percent={(school?.goalProgress / school?.goal) * 100}
                showInfo={false}
              />
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default Goal;
