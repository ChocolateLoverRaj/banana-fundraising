import { Progress, Statistic, Row, Col } from "antd";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../helpers";
import { StatisticEditable } from "../components";

const DashboardPage = () => {
  const [login] = useContext(GlobalContext);
  const [schoolPromise, setSchoolPromise] = useState();
  const [school, setSchool] = useState();
  const [editSchoolPromise, setEditSchoolPromise] = useState();

  useEffect(() => {
    if (login) {
      setSchoolPromise(
        fetch("/api/school", {
          headers: { token: login.email }
        })
      );
    }
  }, [login]);

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
    setSchool((school) => ({ ...school, goal }));
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

  useEffect(() => {
    // eslint-disable-next-line
    schoolPromise
      ?.then(async (res) => {
        setSchoolPromise(undefined);
        setSchool(await res.json());
      })
      .catch((e) => {
        console.log(e);
        alert("Error getting goal");
      });
  }, [schoolPromise]);

  return (
    <>
      <h1>Dashboard Page</h1>
      <h2>School Progress</h2>
      <Row justify="space-between">
        <Col>
          <StatisticEditable
            loading={schoolPromise}
            title="Goal"
            prefix="$"
            value={school?.goal}
            onChange={handleChange}
            changing={Boolean(editSchoolPromise)}
            rules={[{ type: "number", min: 1 }]}
          />
        </Col>
        <Col>
          <Statistic
            loading={schoolPromise}
            title="Money Raised"
            prefix="$"
            value={school?.goalProgress}
          />
        </Col>
        <Col>
          <Statistic
            loading={schoolPromise}
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

export default DashboardPage;
