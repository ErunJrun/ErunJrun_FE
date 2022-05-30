import React, { useState } from "react";
import styled from "styled-components";
import { Grid } from "../../elements";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useMediaQuery } from "react-responsive";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "Infor1",
    imgPath: "https://ifh.cc/g/Xvo76C.png",
  },
  {
    label: "Infor2",
    imgPath: "https://ifh.cc/g/0M1GJg.png",
  },
  {
    label: "Infor3",
    imgPath: "https://ifh.cc/g/XQMhMF.png",
  },
  {
    label: "Infor4",
    imgPath: "https://ifh.cc/g/X2sP21.png",
  },
  {
    label: "Infor5",
    imgPath: "https://ifh.cc/g/CJdrXf.png",
  },
  {
    label: "Infor6",
    imgPath: "https://ifh.cc/g/dcfT6v.png",
  },
  {
    label: "Infor7",
    imgPath: "https://ifh.cc/g/hMmrLX.png",
  },
];

const image = [
  {
    label: "Infor1",
    imgPath: "https://ifh.cc/g/BpVFSp.jpg",
  },
  {
    label: "Infor2",
    imgPath: "https://ifh.cc/g/AdMHaL.png",
  },
  {
    label: "Infor3",
    imgPath: "https://ifh.cc/g/wpdXza.png",
  },
  {
    label: "Infor4",
    imgPath: "https://ifh.cc/g/YdP0rg.jpg",
  },
  {
    label: "Infor5",
    imgPath: "https://ifh.cc/g/tpjpGf.png",
  },
  {
    label: "Infor6",
    imgPath: "https://ifh.cc/g/pxfBVT.jpg",
  },
  {
    label: "Infor7",
    imgPath: "https://ifh.cc/g/Nhhtc4.png",
  },
];

function SwipeableTextMobileStepper() {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [modal, setModal] = useState(true);
  const maxSteps = images.length;
  const firstLogin = localStorage.getItem("firstLogin");
  const introModal = localStorage.getItem("introModal");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const toggleModal = () => {
    setModal(!modal);
    localStorage.setItem("introModal", false);
  };

  if (
    (isMobile && introModal === "true") ||
    (isMobile && introModal === null)
  ) {
    return (
      <Grid   
        display="flex"
        justifyContent="center"
        width="355px"
      >
        {modal && (
          <MOverlaye>
            <MWrap>
              <Box
                sx={{
                  width: "355px",
                  height: "667px",
                  flexGrow: 1,
                  zIndex: "3",
                }}
              >
                <AutoPlaySwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                  sx={{ zIndex: "2" }}
                >
                  {image.map((step, index) => (
                    <div key={step.label}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Box
                          component="img"
                          sx={{
                            height: "788px",
                            display: "block",
                            overflow: "hidden",
                            width: "355px",
                          }}
                          src={step.imgPath}
                          alt={step.label}
                        />
                      ) : null}
                    </div>
                  ))}
                </AutoPlaySwipeableViews>
                <StepperBox>
                  <MobileStepper
                    variant="dots"
                    steps={7}
                    position="static"
                    activeStep={activeStep}
                    sx={{
                      width: 232,
                      flexGrow: 1,
                      position: "absolute",
                      backgroundColor: "transparent",
                    }}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === 6}
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                      </Button>
                    }
                  />
                </StepperBox>
                <MBtn onClick={toggleModal}>건너뛰기</MBtn>
              </Box>
            </MWrap>
          </MOverlaye>
        )}
      </Grid>
    );
  }

  return (
    <>
      {modal && (
        <Overlaye>
          <Wrap>
            <Box sx={{ maxWidth: 1000, height: 700, flexGrow: 1, zIndex: "3" }}>
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                sx={{ zIndex: "2" }}
              >
                {images.map((step, index) => (
                  <div key={step.label}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Box
                        component="img"
                        sx={{
                          height: "700px",
                          display: "block",
                          overflow: "hidden",
                          width: "1000px",
                          borderRadius: "6px",
                        }}
                        src={step.imgPath}
                        alt={step.label}
                      />
                    ) : null}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
              <MobileStepperBox>
                <MobileStepper
                  variant="dots"
                  steps={7}
                  position="static"
                  activeStep={activeStep}
                  sx={{
                    width: 232,
                    flexGrow: 1,
                    position: "absolute",
                    backgroundColor: "transparent",
                  }}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === 6}
                    >
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                    </Button>
                  }
                />
              </MobileStepperBox>
              <Btn onClick={toggleModal}>건너뛰기</Btn>
            </Box>
          </Wrap>
        </Overlaye>
      )}
    </>
  );
}

const MobileStepperBox = styled.div`
  position: relative;
  top: -125px;
  left: 131px;
  background-color: transparent;
  margin-bottom: 200px;
`;

const StepperBox = styled.div`
  position: relative;
  top: -175px;
  left: 20%;
  background-color: transparent;
  margin-bottom: 200px;
`;

const Overlaye = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 3;
`;

const MOverlaye = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: #fff;
  z-index: 3;
  margin: 0 0 200px 0;
`;

const Wrap = styled.div`
  z-index: 3;
  position: absolute;
  left: 25%;
  top: 180px;
  width: 1000px;
  box-shadow: 3px 8px 17px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  text-align: center;
`;

const MWrap = styled.div`
  z-index: 3;
  width: 355px;
  text-align: center;
  margin: 20px auto;
  display:flex;
  justify-content:center;
`;

const Btn = styled.div`
  position: relative;
  color: #7b7b7b;
  font-size: 16px;
  font-weight: bold;
  top: -878px;
  left: -447px;
  background-color: transparent;
`;

const MBtn = styled.div`
  position: relative;
  font-size: 11px;
  font-weight: 500;
  top: -973px;
  left: 20px;
  width: 75px;
  padding-top: 3px;
  height: 21px;
  padding: 2px 17px 2px 16px;
  border-radius: 56px;
  background-color: rgba(255, 255, 255, 0.7);
`;

export default SwipeableTextMobileStepper;
