import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled as muiStyled } from "@mui/material/styles";
import { history } from "../../redux/configureStore";
import { useParams } from "react-router-dom";

const RegionFilterMob = () => {
  const [value, setValue] = React.useState(0);

  const params = useParams();
  const region = Number(params.region);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const StyledTab = muiStyled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      minWidth: "80px",
      marginTop: "0",
      padding: "0",
      fontSize: "13px",
      fontWeight: "500",
      fontFamily: "Spoqa Han Sans Neo",
      marginRight: "",
      color: "#7B7B7B",
      "&.Mui-selected": {
        color: "#000000",
        fontWeight: "700",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#68F99E",
      },
    })
  );

  const StyledTabs = muiStyled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  ))({
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#68F99E",
      width: "54px",
    },
    "& .MuiTabs-indicatorSpan": {
      width: "54px",
      backgroundColor: "#68F99E",
    },
  });

  return (
    <Box
      sx={{
        maxWidth: { xs: 375, sm: 480 },
        bgcolor: "background.paper",
        margin: "0 auto",
      }}
    >
      <StyledTabs
        value={region || 0}
        // onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <StyledTab
          onClick={() => {
            history.push(`/coursefeed/0`);
          }}
          label="전국"
        />
        <StyledTab
          onClick={() => {
            history.push(`/coursefeed/1`);
          }}
          label="서울특별시"
        />
        <StyledTab
          onClick={() => {
            history.push(`/coursefeed/2`);
          }}
          label="경기도"
        />
        <StyledTab
          onClick={() => {
            history.push(`/coursefeed/3`);
          }}
          label="인천광역시"
        />
        <StyledTab
          onClick={() => {
            history.push(`/coursefeed/4`);
          }}
          label="강원도"
        />
        <StyledTab
          onClick={() => {
            history.push(`/coursefeed/5`);
          }}
          label="충청/세종/대전"
        />
        <StyledTab
          onClick={() => {
            history.push(`/coursefeed/6`);
          }}
          label="경북/대구"
        />
        <StyledTab
          onClick={() => {
            history.push(`/coursefeed/7`);
          }}
          label="경남/부산/울산"
        />
        <StyledTab
          onClick={() => {
            history.push(`/coursefeed/8`);
          }}
          label="전라/광주"
        />
        <StyledTab
          onClick={() => {
            history.push(`/coursefeed/9`);
          }}
          label="제주특별자치도"
        />
      </StyledTabs>
    </Box>
  );
};

export default RegionFilterMob;
