import React, { Component } from 'react';
import { VipCard } from '../VipCard';

export class UserList extends Component {
  render() {
    return this.props.user.map(usr => {
      return (
        <VipCard
          dispatch={this.props.dispatch}
          key={usr.openid}
          thumb={usr.avatarUrl}
          title={usr.name}
          unitPrice={usr.unitPrice}
          credit={usr.credit}
          openid={usr.openid}
          realname={usr.realname}
          tuanMoney={usr.tuanMoney}
          vip={usr.vip}
        />
      );
    });
  }
}
