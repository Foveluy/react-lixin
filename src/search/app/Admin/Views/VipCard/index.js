import React, { Component } from 'react';
import { Card, WhiteSpace, InputItem, Modal } from 'antd-mobile';

import './Card.css';

export class VipCard extends Component {
  comfirm = ({ actionType, message, value }) => {
    if (value === '' || !value) {
      return;
    }
    Modal.alert('修改', message, [
      { text: '取消', style: 'default' },
      {
        text: '确定',
        onPress: () => {
          this.props.dispatch({
            type: actionType,
            credit: value,
            openid: this.props.openid
          });

          this.creditInput.inputRef.inputRef.value = null;
          this.tuanInput.inputRef.inputRef.value = null;
          this.unitPrice.inputRef.inputRef.value = null;
        }
      }
    ]);
  };

  componentDidUpdate() {
    this.creditInput.inputRef.inputRef.value = null;
    this.tuanInput.inputRef.inputRef.value = null;
    this.unitPrice.inputRef.inputRef.value = null;
  }

  onBlurEditTuanMoney = credit => {
    const { title } = this.props;
    this.comfirm({
      actionType: 'editTuanMoney',
      message: `是否要将会员${title}的团课课时增加${credit}?`,
      value: credit
    });
  };

  onBlurEditCredit = credit => {
    const { title } = this.props;
    this.comfirm({
      actionType: 'editCredit',
      message: `是否要将会员${title}的私教课时增加${credit}?`,
      value: credit
    });
  };
  onBlurEditUnitprice = unitPrice => {
    const { title } = this.props;
    this.comfirm({
      actionType: 'editUnitPrice',
      message: `是否要将会员${title}的授课单价为${unitPrice}?`,
      value: unitPrice
    });
  };

  setting = type => {
    console.log(type)
    this.props.dispatch({
      type: 'changeType',
      t: type,
      openid: this.props.openid
    });
  };

  renderHeader = () => {
    const { thumb, title, realname, vip } = this.props;
    const realnameHelper = () => {
      if (realname) {
        return `(${realname})`;
      }
      return '(姓名未填写)';
    };

    return (
      <div className="card-header">
        <div className="title-b">
          <div>{title}</div>
          <div className="realname">{realnameHelper()}</div>
        </div>
        <div className={`vip `}>
          <div className={`${vip === 'false' ? 'no' : 'yes'}`}>
            {vip === 'false' ? '游客' : '会员'}
          </div>
          <div
            className={`add-btn ${vip === 'false' ? 'add' : 'cancel'}`}
            onClick={() => this.setting(vip)}
          >
            {vip === 'false' ? '设为会员' : '设为游客'}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { thumb, title, unitPrice, credit, realname, tuanMoney } = this.props;
    const realnameHelper = () => {
      if (realname) {
        return `(姓名:${realname})`;
      }
      return '(姓名未填写)';
    };

    return (
      <div>
        <WhiteSpace size="lg" />
        <Card full>
          <Card.Header
            title={this.renderHeader()}
            thumb={thumb}
            thumbStyle={{ width: 50, height: 50 }}
          />
          <Card.Body>
            <InputItem
              ref={node => (this.unitPrice = node)}
              type={'number'}
              placeholder={unitPrice}
              onBlur={this.onBlurEditUnitprice}
            >
              授课单价
            </InputItem>
            <InputItem
              ref={node => (this.creditInput = node)}
              type={'text'}
              placeholder={credit}
              onBlur={this.onBlurEditCredit}
            >
              私教课时
            </InputItem>
            <InputItem
              ref={node => (this.tuanInput = node)}
              type={'text'}
              placeholder={tuanMoney}
              onBlur={this.onBlurEditTuanMoney}
            >
              团课课时
            </InputItem>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
