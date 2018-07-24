import React from 'react'
import { Calendar, List } from 'antd-mobile'

export class FitCalendar extends React.Component {
  state = {
    visible: false
  }
  onCancel = () => {
    this.setState({
      visible: false
    })
  }
  onOpen = () => {
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
    this.setState({
      visible: true
    })
  }
  onConfirm = time => {
    this.setState({
      visible: false
    })
    const dateString = `${time.getFullYear()}.${time.getMonth() + 1}.${time.getDate()}`

    this.props.dispatch({ type: 'setTime', payload: dateString })
  }

  render() {
    const { visible } = this.state
    return (
      <div>
        <List.Item arrow="horizontal" onClick={this.onOpen}>
          选择日期
        </List.Item>
        <Calendar visible={visible} pickTime={false} type="one" onCancel={this.onCancel} onConfirm={this.onConfirm} />
      </div>
    )
  }
}
