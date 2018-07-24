import { call, put, take, select } from 'redux-saga/effects';
import { Toast } from 'antd-mobile';

function* GET({ url, body }) {
  const res = yield call(fetch, url, {
    method: 'GET'
  });
  return yield res.json();
}
function* POST({ url, body }) {
  const res = yield call(fetch, url, {
    method: 'POST',
    body: JSON.stringify(body)
  });
  return yield res.json();
}

function* setState(obj) {
  yield put({
    type: 'SET_STATE',
    state: { ...obj }
  });
}

/**
 * 完全是为了DRY
 */
function* editor({ url, openid, credit, type }) {
  try {
    const json = yield POST({
      url: url,
      body: { id: openid, value: credit, type }
    });
    yield setState({
      user: json
    });
    Toast.success('修改成功', 1.5, null, true);
  } catch (e) {
    Toast.fail(e, 2, null, false);
  }
}

const actionStategy = {
  getUser: function*(state) {
    const json = yield GET({
      url: 'https://zh.9uhxir.top/django/zongheng/user/'
    });
    yield setState({
      trainer: json.trainer,
      user: json.user
    });
  },
  onSubmit: function*(state, others) {
    const json = yield POST({
      url: 'https://zh.9uhxir.top/django/zongheng/user/?search=1',
      body: { keyword: others.text }
    });
    yield setState({
      user: json
    });
  },
  sort: function*(state, { str }) {
    yield put({
      type: 'SET_STATE',
      state: {
        ...state,
        filter: str
      }
    });
  },
  changeType: function*(state, { t, openid }) {
    try {
      Toast.success('修改中..', 2, null, true);
      yield POST({
        url: 'https://zh.9uhxir.top/django/zongheng/vip/',
        body: { id: openid, type: t }
      });
      const json = yield GET({
        url: 'https://zh.9uhxir.top/django/zongheng/user/'
      });
      yield setState({
        trainer: json.trainer,
        user: json.user
      });
      Toast.success('修改成功', 1.5, null, true);
    } catch (e) {
      Toast.fail(e, 2, null, false);
    }
  },
  editTuanMoney: function*(state, { credit, openid }) {
    yield editor({
      url: 'https://zh.9uhxir.top/django/zongheng/user/',
      credit: credit,
      openid: openid,
      type: 't'
    });
  },
  editCredit: function*(state, { credit, openid }) {
    yield editor({
      url: 'https://zh.9uhxir.top/django/zongheng/user/',
      credit: credit,
      openid: openid,
      type: 'not-tuan'
    });
  },
  editUnitPrice: function*(state, { credit, openid }) {
    yield editor({
      url: 'https://zh.9uhxir.top/django/zongheng/user/?unitPrice=1',
      credit: credit,
      openid: openid
    });
  }
};

function convert() {
  return Object.keys(actionStategy);
}

export const watch = function*() {
  const actionList = convert();

  while (true) {
    const { type, ...others } = yield take(actionList);
    try {
      const state = yield select(state => state.admin);
      const actionFn = actionStategy[type];
      yield call(actionFn, state, others);
    } catch (e) {
      alert(e);
    }
  }
};
