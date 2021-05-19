import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../helpers";
import { Goal } from "../components";

const DashboardPage = () => {
  const [login] = useContext(GlobalContext);
  const [schoolPromise, setSchoolPromise] = useState();
  const [school, setSchool] = useState();

  useEffect(() => {
    if (login) {
      setSchoolPromise(
        fetch("/api/school", {
          headers: { token: login.email }
        })
      );
    }
  }, [login]);

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
      <Goal school={school} onChange={setSchool} />
    </>
  );
};

export default DashboardPage;
