import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import Ready from "../shared/Ready";

import { useMediaQuery } from "react-responsive";
import upload from "../assets/groupFeed/groupUploadBtn1.png";
import uploadHover from "../assets/groupFeed/groupUploadBtn2.png";
import pageUp from "../assets/groupFeed/pageUpBtn.png";
import BestCourse from "../components/courseFeed/BestCourse";
import RegionFilter from "../components/courseFeed/RegionFilter";
import CourseCard from "../components/courseFeed/CourseCard";
import { useDispatch } from "react-redux";
import { getCourseDB } from "../redux/modules/course";
import { Link } from "react-scroll";
import Permit from "../shared/Permit";
import { history } from "../redux/configureStore";

const CourseFeed = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const dispatch = useDispatch();
  const [uploadBtn, setUploadBtn] = useState(false);

  useEffect(() => {
    console.log("코스피드 GET");
    dispatch(getCourseDB(0, "new", 1, 3));
  }, []);

  if (isMobile) {
    return (
      <>
        <Ready />
      </>
    );
  }

  return (
    <>
      <Grid
        position="relative"
        width="1282px"
        margin="0 auto 320px auto"
        justifyContent="space-between"
        display="flex"
      >
        <Grid margin="0 0 100px 0" width="1200px">
          <Grid
            display="flex"
            justifyContent="left"
            margin="64px auto 32px auto"
            alignItems="baseline"
          >
            <Text margin="0 10px 0 0" bold size="20px">
              코스 추천
            </Text>
            <Text regular size="14px">
              러닝에 빼놓을 수 없는 나만의 코스 추천!
            </Text>
          </Grid>

          <BestCourse />
        </Grid>
        <RegionFilter />

        <Grid width="1200px">
          <Grid
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
            margin="64px 0 0 0"
          >
            <Text margin="0" width="auto" size="20px" bold>
              총{" "}
              <span style={{ color: "#686EF9" }}>
                {/* {feedList.length ? feedList.length : "0"} */}
                00
              </span>
              개의 코스추천
            </Text>
            <Grid margin="0" width="auto" display="flex" alignItems="center">
              <Text bold margin="0 16px 0 0">
                최신순
              </Text>
              <Text color="#B8B8B8" bold margin="0 16px 0 0">
                별점높은순
              </Text>
              <Text color="#B8B8B8" bold margin="0 16px 0 0">
                댓글많은순
              </Text>
              <Text color="#B8B8B8" bold margin="0">
                북마크많은순
              </Text>
            </Grid>
          </Grid>
          <Hr></Hr>
        </Grid>

        <CourseCard />

        <Grid
          display="flex"
          flexDirection="column"
          position="sticky"
          top="726px"
          margin="0"
          width="auto"
        >
          <Permit>
            {uploadBtn === true ? (
              <UploadBtn
                onClick={() => {
                  history.push("/groupupload");
                }}
                src={uploadHover}
              />
            ) : (
              <UploadBtn
                onClick={() => {
                  history.push("/groupupload");
                }}
                src={upload}
              />
            )}
          </Permit>

          <Link
            style={{ position: "relative" }}
            to="1"
            spy={true}
            smooth={true}
          >
            <PageUpBtn src={pageUp} />
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

const Hr = styled.div`
  border: 1px solid #969696;
  width: 1200px;
  margin: 16px auto 40px auto;
`;

const UploadBtn = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin: 0;
`;

const PageUpBtn = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin: 0;
`;

export default CourseFeed;
