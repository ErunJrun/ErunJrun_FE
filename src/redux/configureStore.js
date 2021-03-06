//configureStore.js
import {
  combineReducers,
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import Comments from "./modules/comments";
import User from "./modules/user";
import Mypage from "./modules/mypage";
import Feed from "./modules/feed";
import Image from "./modules/image";
import Post from "./modules/post";
import Recomments from "./modules/recomments";
import UploadInfo from "./modules/uploadInfo";
import Course from "./modules/course";
import Chat from "./modules/chat";

import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  chat: Chat,
  user: User,
  comments: Comments,
  recomments: Recomments,
  mypage: Mypage,
  feed: Feed,
  uploadInfo: UploadInfo,
  image: Image,
  post: Post,
  course: Course,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);

export default store;
