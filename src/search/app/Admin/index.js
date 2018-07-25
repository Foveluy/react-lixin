import React, { Component } from "react";
import { connect } from "react-redux";
import { SearchBar, List } from "antd-mobile";

import { UserList } from "./Views/UserList";

const Item = List.Item;

const Btn = ({ onClick, children, current, filter }) => {
  let color = "";
  if (current === filter || (filter === void 666 && current === "all")) {
    color = "white";
  }

  return (
    <div
      style={{
        backgroundColor: color,
        textAlign: "center",
        width: "100%",
        margin: 5,
        borderRadius: 5,
        border: "1px solid rgba(120,120,120,0.2)"
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

class Admin extends Component {
  static defaultProps = {
    user: [],
    trainer: []
  };
  componentDidMount() {
    this.props.dispatch({ type: "getUser" });
  }
  onSubmit = text => {
    this.props.dispatch({ type: "onSubmit", text: text });
  };

  sort = string => {
    this.props.dispatch({ type: "sort", str: string });
  };

  render() {
    const { filter } = this.props;

    const myDate = new Date();
    const year = myDate.getFullYear();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();

    const deduMap = {};
    this.props.trainer &&
      this.props.trainer.map(t => {
        const record_date = t.date.split(".");
        const record_year = parseInt(record_date[0]);
        const record_month = parseInt(record_date[1]);

        if (record_year === year && record_month === month) {
          if (deduMap[t.trainer]) {
            deduMap[t.trainer].push(t);
          } else {
            deduMap[t.trainer] = [];
          }
        }
      });
    console.log(deduMap);

    return (
      <div>
        <List renderHeader={`${year} 年 ${month}月 教练业绩`} className="my-list">
          {Object.keys(deduMap).map(key => {
            return (
              <Item key={key} extra={`约课次数:${deduMap[key].length}`}>
                {key}
              </Item>
            );
          })}
        </List>
        <div style={{ display: "flex", marginTop: 20 }}>
          <Btn filter={filter} current="vip" onClick={() => this.sort("vip")}>
            只显示会员
          </Btn>
          <Btn
            filter={filter}
            current="no-vip"
            onClick={() => this.sort("no-vip")}
          >
            只显示游客
          </Btn>
          <Btn filter={filter} current="all" onClick={() => this.sort("all")}>
            显示全部
          </Btn>
        </div>
        <SearchBar
          placeholder="搜索会员"
          ref={ref => (this.manualFocusInst = ref)}
          onSubmit={this.onSubmit}
        />
        <UserList user={this.props.user} dispatch={this.props.dispatch} />
      </div>
    );
  }
}

const mapState = state => {
  let user = void 666;
  if (state.admin.user) {
    const str = state.admin.filter;

    user = state.admin.user.filter(u => {
      if (str === "vip") {
        if (u.vip === "true") return u;
      }
      if (str === "no-vip") {
        if (u.vip === "false") return u;
      }
      if (str === "all" || str === void 666) {
        return u;
      }
    });
  }

  return {
    ...state.admin,
    user: user
  };
};

const mapDispatch = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapState,
  mapDispatch
)(Admin);
