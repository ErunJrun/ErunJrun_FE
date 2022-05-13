import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
//페이지 변경시 마다 맨 위부터 보이게
import ScrollToTop from "./ScrollToTop";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Mypage from "../pages/Mypage";
import GroupFeed from "../pages/GroupFeed";
import GroupUpload from "../pages/GroupUpload";
import GroupDetail from "../pages/GroupDetail";
import KakaoLogin from "../components/login/KakaoLogin";
import NaverLogin from "../components/login/NaverLogin";
import Recommend from "../pages/Recommend";
import Badge from "../pages/Badge";
import Check from "../pages/Check";
import LoginInfo from "../pages/LoginInfo";
import MypageEdit from "../pages/MypageEdit";
import GroupEdit from "../pages/GroupEdit";
import ServiceInfo from "../pages/ServiceInfo";
import Contact from "../pages/Contact";
import ServiceTerms from "../pages/ServiceTerms";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import CourseFeed from "../pages/CourseFeed";

import { useDispatch } from "react-redux";
import { loginCheckDB } from "../redux/modules/user";
import { getCookie } from "./Cookie";
import "./GlobalStyles";
import styled from "styled-components";

function App() {
  const dispatch = useDispatch();

  const token = getCookie("accessToken");

  useEffect(() => {
    if (token) {
      dispatch(loginCheckDB());
    }
  }, [token]);

  return (
    <React.Fragment>
      <Header></Header>
      <Wrapper>
        <ConnectedRouter history={history}>
          <ScrollToTop />
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/mypage" exact component={Mypage} />
          <Route path="/groupfeed" exact component={GroupFeed} />
          <Route path="/groupupload" exact component={GroupUpload} />
          <Route path="/kakao" exact component={KakaoLogin}></Route>
          <Route path="/naver" exact component={NaverLogin}></Route>
          <Route path="/groupdetail/:groupId" exact component={GroupDetail} />
          <Route path="/mypage/recommend" exact component={Recommend} />
          <Route path="/mypage/badge" exact component={Badge} />
          <Route path="/check/:groupId" exact component={Check} />
          <Route path="/loginInfo" exact component={LoginInfo} />
          <Route path="/groupEdit/:groupId" exact component={GroupEdit} />
          <Route path="/edit" exact component={MypageEdit} />
          <Route path="/contact" exact component={CourseFeed} />
          <Route path="/coursefeed" exact component={Contact} />
          <Route path="/serviceInfo" exact component={ServiceInfo} />
          <Route path="/serviceTerms" exact component={ServiceTerms} />
          <Route path="/privacyPolicy" exact component={PrivacyPolicy} />
        </ConnectedRouter>
      </Wrapper>
      <Footer></Footer>
    </React.Fragment>
  );
}

//Footer 고정
const Wrapper = styled.div`
  height: auto;
  min-height: 90vh;
`;

export default App;
