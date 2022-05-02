import { handleActions, createAction } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/Api";
import axios from "axios";

//액션

const ADD_GROUP = "ADD_GROUP";
const GET_GROUP = "GET_GROUP";
const DELETE_GROUP = "DELETE_GROUP";
const EDIT_GROUP = "EDIT_GROUP";
const GET_GROUP_DETAIL = "GET_GROUP_DETAIL";

const LOADING = "LOADING";

//initialState
const initialState = {
  list: [],
};

//액션생성함수
export const addGroup = (payload) => ({
  type: ADD_GROUP,
  payload,
});

export const getGroup = (payload) => ({
  type: GET_GROUP,
  payload,
});

export const deleteGroup = (payload) => ({
  type: DELETE_GROUP,
  payload,
});

export const editGroup = (payload) => ({
  type: EDIT_GROUP,
  payload,
});

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//미들웨어
export const getGroupDB = (category) => {
  return async function (dispatch, getState, { history }) {
    try {
      if (category === "all") {
        const { data } = await api.get(`/group/${category}`);
        dispatch(getGroup(data.data));
      } else {
        console.log(category);
        let region = "";
        category[0].map((value) => {
          region += value + "%";
        });
        region = region.substring(-1);

        let time = "";
        category[1].map((value) => {
          time += value + "%";
        });
        time = time.substring(-1);

        let distance = "";
        category[2].map((value) => {
          distance += value + "%";
        });
        distance = distance.substring(-1);

        let date = new Date();
        // if(category.date === undefined) {
        //   return date
        // } else {

        //   return date = category.date
        // }

        let finish = "";

        const { data } = await api.get(
          `/group/all?date=${date}&region=${region}&time=${time}&distance=${distance}&finish=${finish}`
        );
        console.log(data.data);
        dispatch(getGroup(data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addGroupDB = (
  mapLatLng,
  thumbnail,
  contents,
  address,
  distance
) => {
  return function (dispatch, getState, { history }) {
    console.log(mapLatLng, thumbnail, contents, address, distance);
    const formData = new FormData();
    thumbnail?.map((e, idx) => {
      return formData.append("thumbnail", e);
    });
    formData.append("title", contents[0].title);
    formData.append("maxPeople", contents[0].maxPeople);
    formData.append("date", contents[0].date);
    formData.append("standbyTime", contents[0].standbyTime);
    formData.append("startTime", contents[0].startTime);
    formData.append("finishTime", contents[0].finishTime);
    formData.append("parking", contents[0].parking);
    formData.append("speed", contents[0].speed);
    formData.append("baggage", contents[0].baggage);
    formData.append("content", contents[0].content);
    formData.append("location", address);
    formData.append("distance", distance);
    formData.append("mapLatLng", JSON.stringify(mapLatLng));

    axios
      .post("http://rengabro.shop/group", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        history.push("/groupfeed");
        console.log(res);

        dispatch(getGroupDB());
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

//리듀서
export default handleActions(
  {
    [ADD_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload);
      }),
    [GET_GROUP]: (state, action) =>
      produce(state, (draft) => {
        console.log(state, action.payload);
        draft.list = action.payload;
      }),
    [GET_GROUP_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.target = action.payload.post_one;
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);
