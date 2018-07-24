import { call } from 'redux-saga/effects'

export function* GET({ url, body }) {
    const res = yield call(fetch, url, {
        method: 'GET'
    })
    return yield res.json()
}
export function* POST({ url, body }) {
    const res = yield call(fetch, url, {
        method: 'POST',
        body: JSON.stringify(body)
    })
    return yield res.json()
}

var timeAry = void 666

export const timeMaker = () => {
    if (timeAry === void 666) {
        timeAry = []
        for (var i = 0; i < 48; i++) {
            let t = parseInt(i / 2,10)
            if (i % 2 === 0) {
                timeAry.push(t + ':00')
            } else {
                timeAry.push(t + ':30')
            }
        }
        return timeAry
    }
    return timeAry
}
