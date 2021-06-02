import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Result } from "antd";

const DonatePage = () => {
  const router = useRouter();
  const { emailId } = router.query;
  const [fetchPromise, setFetchPromise] = useState();
  const [invalid, setInvalid] = useState(false);
  const [schoolName, setSchoolName] = useState();

  useEffect(() => {
    if (!Number.isInteger(emailId)) {
      setInvalid(true);
    }
  }, [emailId, router]);

  useEffect(() => {
    setFetchPromise(fetch(`/api/donate?emailId=${emailId}`));
  }, [emailId]);

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
          alert("Error getting school name");
          return;
        }
        const schoolName = await res.json();
        if (canceled) return;
        setSchoolName(schoolName);
      })
      .catch(() => {
        alert("Error getting school name");
      });
  }, [fetchPromise]);

  return (
    <>
      {invalid ? <Result status="404" title="Invalid Email Id" /> : schoolName}
    </>
  );
};

export default DonatePage;
