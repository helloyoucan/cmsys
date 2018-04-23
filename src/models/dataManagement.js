/*字典表*/
import {
  deleteDicType,
  getDicParamsForPage,
  getDicTypeForPage,
  getOne,
  saveDicParams, saveDicType,
  setDicParamsIsDisable,
  setDicParamsIsEnable,
  updateDicParams,
  updateDicType,
  queryforPmappname
} from '../services/dataManagement';

export default {
  namespace: 'dataManagement',
  state: {
    userCategory: [],//用户类型
    association: [],//协会类别
    collegeName: [],//学院名称
    sex: [],//性别
    tweet: [],//推文类别
    dicParams: {
      list: [],
      pagination: {},
    },
    dicType: {
      list: [],
      pagination: {},
    },
    loading: true,
    modalLoading: true,
  },

  effects: {
    *deleteDicType({payload, callback}, {call}) {
      const response = yield call(deleteDicType, payload);
      if (callback) callback(response);
    },
    *getDicParamsForPage({payload}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getDicParamsForPage, payload);
      yield put({
        type: 'getDicParamsForPageReducers',
        payload: response.data,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *getDicTypeForPage({payload}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getDicTypeForPage, payload);
      yield put({
        type: 'getDicTypeForPageReducers',
        payload: response.data,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *getOne({payload, callback}, {call}) {
      const response = yield call(getOne, payload);
      if (callback) callback(response);
    },
    *saveDicParams({payload, callback}, {call}) {
      const response = yield call(saveDicParams, payload);
      if (callback) callback(response);
    },

    *saveDicType({payload, callback}, {call}) {
      const response = yield call(saveDicType, payload);
      if (callback) callback(response);
    },
    *setDicParamsIsDisable({payload, callback}, {call}) {
      const response = yield call(setDicParamsIsDisable, payload);
      if (callback) callback(response);
    },
    *setDicParamsIsEnable({payload, callback}, {call}) {
      const response = yield call(setDicParamsIsEnable, payload);
      if (callback) callback(response);
    },
    *updateDicParams({payload, callback}, {call}) {
      const response = yield call(updateDicParams, payload);
      if (callback) callback(response);
    },
    *updateDicType({payload, callback}, {call}) {
      const response = yield call(updateDicType, payload);
      if (callback) callback(response);
    },
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
    getDicParamsForPageReducers(state, {payload}) {
      return {
        ...state,
        dicParams: payload,
      };
    },
    getDicTypeForPageReducers(state, {payload}) {
      return {
        ...state,
        dicParams: payload,
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
