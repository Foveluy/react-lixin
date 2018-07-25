import React from "react";

import { FitCalendar } from "./Calendar";
import { RecordList } from "./RecordList";
import { connect } from "react-redux";
import { List, Modal, Button } from "antd-mobile";

class ChooseTrainer extends React.Component {
  state = {
    trainer: false
  };

  onOpen = () => {
    this.setState({
      trainer: !this.state.trainer
    });
  };
  onPress = who => {
    this.onOpen();
    this.props.dispatch({ type: "sortByTrainer", payload: who });
  };

  renderTrainer = () => {
  
    if (this.state.trainer) {
      return (
        <Modal
          visible={this.state.trainer}
          transparent
          maskClosable={false}
          onClose={this.onOpen}
          title="选择教练"
          footer={[
            {
              text: "返回",
              onPress: () => {
                console.log("ok");
                this.onOpen();
              }
            }
          ]}
        >
          <div style={{ height: 100, overflow: "scroll" }}>
            {this.props.trainer.map((item, index) => {
              return (
                <Button key={index} onClick={() => this.onPress(item)}>
                  {item}
                </Button>
              );
            })}
          </div>
        </Modal>
      );
    }
  };

  render() {
    return (
      <div>
        <List.Item onClick={this.onOpen}>查看本月教练约课</List.Item>
        {this.renderTrainer()}
      </div>
    );
  }
}

const RecordApp = props => {
  return (
    <div>
      <FitCalendar {...props} />
      {props.date ? <ChooseTrainer {...props} /> : null}
      <RecordList {...props} />
    </div>
  );
};

const mapState = state => {
  return {
    CardList: state.record.CardList,
    date: state.record.date,
    trainer: state.record.trainer
  };
};

const RecordAppWrap = connect(mapState)(RecordApp);

export default () => {
  return <RecordAppWrap />;
};
