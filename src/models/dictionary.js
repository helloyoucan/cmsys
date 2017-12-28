/*字典表*/
import {
  queryAssociation,
  queryCollegeName,
  queryTweet,
  queryUserCategory,
  getSex
} from '../services/dictionary';

export default {
  namespace: 'dictionary',
  state: {
    userCategory: [],//用户类型
    association: [],//协会类别
    collegeName: [],//学院名称
    sex: [],//性别
    tweet: []//推文类别
  },

  effects: {

    *getAssociation(_, {call, put}){
      const response = yield call(queryAssociation, {
        type: "ASSOCIATION_CATEGORY",
      });
      yield put({
        type: 'queryAssociationReducers',
        payload: response.data,
      });
    },
    *getCollegeName(_, {call, put}){
      const response = yield call(queryCollegeName, {
        type: "COLLEGE_NAME",
      });
      yield put({
        type: 'queryCollegeNameReducers',
        payload: response.data,
      });
    },
    *getSex(_, {call, put}){
      const response = yield call(getSex, {
        type: "SEX",
      });
      yield put({
        type: 'querySexReducers',
        payload: response.data,
      });
    },
    *getTweet(_, {call, put}){
      const response = yield call(queryTweet, {
        type: "TWEETS_CATEGORY",
      });
      yield put({
        type: 'queryTweetReducers',
        payload: response.data,
      });
    },
    *getUserCategory(_, {call, put}){
      const response = yield call(queryUserCategory, {
        type: "USER_CATEGORY",
      });
      yield put({
        type: 'queryUserCategoryReducers',
        payload: response.data,
      });
    },
  },

  reducers: {

    queryAssociationReducers(state, {payload}) {
      return {
        ...state,
        association: payload,
      };
    },
    queryCollegeNameReducers(state, {payload}) {
      return {
        ...state,
        collegeName: payload,
      };
    },
    querySexReducers(state, {payload}) {
      return {
        ...state,
        sex: payload,
      };
    },
    queryTweetReducers(state, {payload}) {
      return {
        ...state,
        tweet: payload,
      };
    },
    queryUserCategoryReducers(state, {payload}) {
      return {
        ...state,
        userCategory: payload,
      };
    },
  },
};
