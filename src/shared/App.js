import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Header from "../components/Header";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Mypage from "../pages/Mypage";
import CourseFeed from "../pages/CourseFeed";
import GroupFeed from "../pages/GroupFeed";
import GroupUpload from "../pages/GroupUpload";
import GroupDetail from "../pages/GroupDetail";
// import Attend from "../pages/Attend";
import Recommend from "../pages/Recommend";
import Make from "../pages/Make";
import Bookmark from "../pages/Bookmark";

function App() {
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
        <Route path="/groupdetail/:groupId" exact component={GroupDetail} />
        {/* <Route path="/mypage/attend" exact component={Attend} /> */}
        <Route path="/mypage/recommend" exact component={Recommend} />
        <Route path="/mypage/make" exact component={Make} />
        <Route path="/mypage/bookmark" exact component={Bookmark} />
      </ConnectedRouter>
    </React.Fragment>
  );
}
export default App;
