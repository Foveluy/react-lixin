import { GET } from '../../utils'
import { dateSelector } from '../app/RecordList'

export default {
  namespace: 'record',
  state: {},
  effects: {
    *fetchRecord({ put, call }, { payload }) {
      const json = yield GET({
        url: 'https://zh.9uhxir.top/django/zongheng/personCourse/?ticket=all'
      })
      yield put({
        type: 'mapRecord',
        payload: json
      })
    }
  },
  reducer: {
    mapRecord(state, { payload }) {
      var trainers = {}
      //   const thisMonth = payload.forEach(item => {
      //     trainers[item.trainer] = 1
      //   })
      return {
        ...state,
        CardList: payload,
        trainer: Object.keys(trainers),
        currentCardList: payload
      }
    },
    setTime(state, { payload }) {
      return { ...state, date: payload, CardList: state.currentCardList }
    },
    sortByTrainer(state, { payload }) {
      const dateNow = state.date
      const CardList = state.currentCardList.filter(item => {
        if (dateSelector(dateNow, item.date)) {
          if (item.trainer === payload) {
            return item
          }
        }
        return null
      })

      return { ...state, CardList }
    }
  }
}
