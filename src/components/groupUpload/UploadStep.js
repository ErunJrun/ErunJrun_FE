import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

const UploadStep = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
    {
      label: "Step 1. 코스 입력",
    },
    {
      label: "Step 2. 이미지 업로드",
    },
    {
      label: "Step 3. 그룹 러닝 정보 입력",
    },
  ];

  return (
    <StepWrap>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Box sx={{ mb: 5 }}></Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </StepWrap>
  );
};

const StepWrap = styled.div`
  position: fixed;
  width: 250px;
  height: 250px;
  right: 200px;
  top: 294px;
  box-shadow: 0px 2px 18px -5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  background-color: #ffffff;
`;

export default UploadStep;
