import React, { Component } from 'react'
import { Card, WhiteSpace, List } from 'antd-mobile'
import { timeMaker } from 'utils'

export class RecordList extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'fetchRecord' })
  }

  renderList = () => {
    if (this.props.CardList === void 666) return
    const newList = this.props.CardList.filter((child, index) => {
      const { date } = child
      if (dateSelector(this.props.date, date)) {
        return child
      }
      return null
    })

    const lastList = newList.map((child, index) => {
      const { username, avatarUrl, date, end, phone, start, trainer } = child
      const timeString = timeMaker()
      if (dateSelector(this.props.date, date)) {
        return (
          <div key={index}>
            <WhiteSpace size="lg" />
            <Card full>
              <Card.Header
                title={username}
                thumb={avatarUrl}
                thumbStyle={{ width: 50, height: 50 }}
                extra={<span>教练：{trainer}</span>}
              />
              <Card.Body>
                <div>会员电话：{phone}</div>
              </Card.Body>
              <Card.Footer
                content={date}
                extra={
                  <div>
                    {timeString[parseInt(start, 10)]}~{timeString[parseInt(end, 10)]}
                  </div>
                }
              />
            </Card>
          </div>
        )
      }
      return child
    })
    return (
      <div>
        {lastList.length > 0 ? <List.Item>本月约课次数：{lastList.length}</List.Item> : null}
        {lastList}
      </div>
    )
  }

  render() {
    return <div>{this.renderList()}</div>
  }
}

/**
 * 年和月相同的时候，会返回true
 * @param {*} choose
 * @param {*} recordDate
 */
export function dateSelector(choose, recordDate) {
  if (!choose || !recordDate) return
  const splitedChoose = choose.split('.')
  const splitedRecordDate = recordDate.split('.')

  if (splitedChoose[0] + splitedChoose[1] === splitedRecordDate[0] + splitedRecordDate[1]) {
    return true
  }
  return false
}
