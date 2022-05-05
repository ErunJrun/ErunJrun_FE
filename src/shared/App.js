import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Mypage from "../pages/Mypage";
import CourseFeed from "../pages/CourseFeed";
import GroupFeed from "../pages/GroupFeed";
import GroupUpload from "../pages/GroupUpload";
import GroupDetail from "../pages/GroupDetail";
import KakaoLogin from "../components/login/KakaoLogin";
import NaverLogin from "../components/login/NaverLogin";
import Recommend from "../pages/Recommend";
import Make from "../pages/Make";
import Bookmark from "../pages/Bookmark";
import { useDispatch } from "react-redux";
import { loginCheckDB } from "../redux/modules/user";
import { getCookie } from "./Cookie";

function App() {
  const dispatch = useDispatch();

  const token = getCookie("accessToken");

  // useEffect(() => {
  //   if (token) {
  //     dispatch(loginCheckDB());
  //   }
  // }, []);

  return (
    <React.Fragment>
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/mypage" exact component={Mypage} />
        <Route path="/coursefeed" exact component={CourseFeed} />
        <Route path="/groupfeed" exact component={GroupFeed} />
        <Route path="/groupupload" exact component={GroupUpload} />
        <Route path="/kakao" component={KakaoLogin}></Route>
        <Route path="/naver" component={NaverLogin}></Route>
        <Route path="/groupdetail/:groupId" exact component={GroupDetail} />
        <Route path="/mypage/recommend" exact component={Recommend} />
        <Route path="/mypage/make" exact component={Make} />
        <Route path="/mypage/bookmark" exact component={Bookmark} />
      </ConnectedRouter>
      <Footer></Footer>
    </React.Fragment>
  );
}
export default App;
