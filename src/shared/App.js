import React, { lazy, Suspense, useEffect } from "react";

//Redux
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { loginCheckDB } from "../redux/modules/user";

//css, library, package
import ScrollToTop from "./ScrollToTop";
import "./GlobalStyles";
import styled from "styled-components";

//cookie
import { getCookie } from "./Cookie";

//elements
import { Spinner } from "../elements";

//page
import CourseUpload from "../pages/CourseUpload";
import CourseDetail from "../pages/CourseDetail";
const Main = lazy(() => import("../pages/Main"));
const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));
const Login = lazy(() => import("../pages/Login"));
const Mypage = lazy(() => import("../pages/Mypage"));
const GroupFeed = lazy(() => import("../pages/GroupFeed"));
const GroupUpload = lazy(() => import("../pages/GroupUpload"));
const GroupDetail = lazy(() => import("../pages/GroupDetail"));
const KakaoLogin = lazy(() => import("../components/login/KakaoLogin"));
const NaverLogin = lazy(() => import("../components/login/NaverLogin"));
const Recommend = lazy(() => import("../pages/Recommend"));
const Check = lazy(() => import("../pages/Check"));
const LoginInfo = lazy(() => import("../pages/LoginInfo"));
const MypageEdit = lazy(() => import("../pages/MypageEdit"));
const GroupEdit = lazy(() => import("../pages/GroupEdit"));
const CourseFeed = lazy(() => import("../pages/CourseFeed"));
const Evaluation = lazy(() => import("../pages/Evaluation"));
const MobileEvaluation = lazy(() => import("../pages/mobile/MobileEvaluation"));
const MobileSchedule = lazy(() => import("../pages/mobile/MobileSchedule"));
const MobileGroup = lazy(() => import("../pages/mobile/MobileGroup"));
const MobileMyGroup = lazy(() => import("../pages/mobile/MobileMyGroup"));
const MobileBookmark = lazy(() => import("../pages/mobile/MobileBookmark"));
const MobileCourse = lazy(() => import("../pages/mobile/MobileCourse"));

function App() {
  const dispatch = useDispatch();

  const token = getCookie("accessToken");

  useEffect(() => {
    if (token) {
      dispatch(loginCheckDB());
    }
  }, []);

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Suspense fallback={<Spinner type="page" />}>
          <Wrapper>
            <Header></Header>
            <ScrollToTop />
            <Route path="/" exact component={Main} />
            <Route path="/login" exact component={Login} />
            <Route path="/mypage/:userId" exact component={Mypage} />
            <Route path="/groupfeed" exact component={GroupFeed} />
            <Route path="/groupupload" exact component={GroupUpload} />
            <Route path="/kakao" exact component={KakaoLogin}></Route>
            <Route path="/naver" exact component={NaverLogin}></Route>
            <Route path="/groupdetail/:groupId" exact component={GroupDetail} />
            <Route path="/mypage/recommend" exact component={Recommend} />
            <Route path="/check/:groupId" exact component={Check} />
            <Route path="/loginInfo" exact component={LoginInfo} />
            <Route path="/groupEdit/:groupId" exact component={GroupEdit} />
            <Route path="/edit" exact component={MypageEdit} />
            <Route path="/coursefeed/:region" exact component={CourseFeed} />
            <Route
              path="/courseDetail/:courseId"
              exact
              component={CourseDetail}
            />
            <Route path="/courseUpload" exact component={CourseUpload} />
            <Route path="/evaluation/:groupId" exact component={Evaluation} />
            <Route path="/m/evaluation" exact component={MobileEvaluation} />
            <Route
              path="/m/schedule/:userId"
              exact
              component={MobileSchedule}
            />
            <Route path="/m/group/:userId" exact component={MobileGroup} />
            <Route path="/m/mygroup/:userId" exact component={MobileMyGroup} />
            <Route
              path="/m/bookmark/:userId"
              exact
              component={MobileBookmark}
            />
            <Route path="/m/course/:userId" exact component={MobileCourse} />
          </Wrapper>
          <Footer></Footer>
        </Suspense>
      </ConnectedRouter>
    </React.Fragment>
  );
}

//Footer 고정
const Wrapper = styled.div`
  height: auto;
  min-height: 90vh;
`;

export default App;
