import React, { useState } from "react";
import { Text } from "../elements";

const LoginInfo = () => {
  const [checkedRegion, setCheckedRegion] = useState("");
  const [checkedDistance, setCheckedDistance] = useState("");
  const [checkedExp, setCheckedExp] = useState("");

  const choiceRegion = (e) => {
    setCheckedRegion(e);
  };

  const choiceDistance = (e) => {
    setCheckedDistance(e);
  };

  const choiceExp = (e) => {
    setCheckedExp(e);
  };

  return (
    <>
      <Grid>
        <Text bold size="36px">
          방남지님의 러닝 스타일을 알려주세요
        </Text>
        <Text size="24px">원하는 크루를 찾기 쉽도록 도와드릴게요!</Text>
      </Grid>

      <Grid>
        <Text bold size="28px">
          선호지역
        </Text>
        <Text size="24px">주로 활동하시는 지역을 선택해주세요.</Text>
      </Grid>
      <Grid></Grid>
    </>
  );
};

export default LoginInfo;
