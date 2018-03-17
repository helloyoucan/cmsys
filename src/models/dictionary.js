/*字典表*/
import {
  queryforPmappname,
  queryList, add, getOne, update,
} from '../services/dictionary';

export default {
  namespace: 'dictionary',
  state: {
    userCategory: [],//用户类型
    association: [],//协会类别
    collegeName: [],//学院名称
    sex: [],//性别
    tweet: [],//推文类别
    data: {
      list: [],
      pagination: {},
    },
    loading: true,
    modalLoading: true,
  },

  effects: {
    *queryList({payload}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryList, payload);
      yield put({
        type: 'queryListReducers',
        payload: response.data,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *add({payload, callback}, {call}) {
      const response = yield call(add, payload);
      if (callback) callback(response);
    },
    *getOne({payload, callback}, {call}) {
      const response = yield call(getOne, payload);
      if (callback) callback(response);
    },

    *update({payload, callback}, {call}) {
      const response = yield call(update, payload);
      if (callback) callback(response);
    },
    /*--------------------------------------------*/
    *queryAssociation(_, {call, put}){
      const response = yield call(queryforPmappname, {
        type: "ASSOCIATION_CATEGORY",
      });
      yield put({
        type: 'queryAssociationReducers',
        payload: response.data,
      });
    },
    *queryCollegeName(_, {call, put}){
      const response = yield call(queryforPmappname, {
        type: "COLLEGE_NAME",
      });
      yield put({
        type: 'queryCollegeNameReducers',
        payload: response.data,
      });
    },
    *queryTweet(_, {call, put}){
      const response = yield call(queryforPmappname, {
        type: "TWEETS_CATEGORY",
      });
      yield put({
        type: 'queryTweetReducers',
        payload: response.data,
      });
    },
    *queryUserCategory(_, {call, put}){
      const response = yield call(queryforPmappname, {
        type: "USER_CATEGORY",
      });
      yield put({
        type: 'queryUserCategoryReducers',
        payload: response.data,
      });
    },
  },

  reducers: {
    queryListReducers(state, {payload}) {
      return {
        ...state,
        data: payload,
      };
    },
    changeLoading(state, {payload}) {
      return {
        ...state,
        loading: payload,
      };
    },
    /*------------------------------------------------*/
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
