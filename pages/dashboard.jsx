import { Progress, Statistic, Row, Col } from "antd";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../helpers";
import { EditOutlined } from "@ant-design/icons";
import { StatisticEditable } from "../components";

const DashboardPage = () => {
  const [login] = useContext(GlobalContext);
  const [goalPromise, setGoalPromise] = useState();
  const [goal, setGoal] = useState();

  useEffect(() => {
    if (login) {
      setGoalPromise(
        fetch("/api/goal", {
          headers: { token: login.email }
        })
      );
    }
  }, [login]);

  useEffect(() => {
    // eslint-disable-next-line
    goalPromise
      ?.then(async (res) => {
        setGoalPromise(undefined);
        setGoal(await res.json());
      })
      .catch(() => {
        alert("Error getting goal");
      });
  }, [goalPromise]);

  const handleChange = (newGoal) => {
    console.log("Will change goal", newGoal);
  };

  return (
    <>
      <h1>Dashboard Page</h1>
      <h2>School Progress</h2>
      <Row justify="space-between">
        <Col>
          <StatisticEditable
            loading={goalPromise}
            title="Goal"
            prefix="$"
            value={goal?.goal}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Statistic
            loading={goalPromise}
            title="Money Raised"
            prefix="$"
            value={goal?.progress}
          />
        </Col>
        <Col>
          <Statistic
            loading={goalPromise}
            title="Goal Progress"
            formatter={() => (
              <Progress
                type="circle"
                width={48}
                percent={(goal?.progress / goal?.goal) * 100}
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
