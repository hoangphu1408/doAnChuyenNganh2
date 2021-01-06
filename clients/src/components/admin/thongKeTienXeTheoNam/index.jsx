import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import moment from "moment";
import * as actions from "../../../redux/actions/thongKe";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class ThongKeTienXeTheoNam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      year: moment(this.date).year(),
    };
  }
  _handleSubmit = (e) => {
    e.preventDefault();
  };
  handleChange = (date) => {
    this.setState(
      {
        date: date,
        year: moment(date).year(),
      },
      () => {
        console.log(this.state.year);
      }
    );
  };
  changeWeek = () => {
    const { year } = this.state;

    this.props.getTienXeTNam(year);
  };
  render() {
    const { tienXeNam } = this.props;
    const { date, year } = this.state;
    return (
      <>
        <form onSubmit={this._handleSubmit}>
          <DatePicker
            selected={date}
            onChange={(date) => this.handleChange(date)}
            showYearPicker
            dateFormat="yyyy"
          />
          <button className="btn btn-primary mt-3" onClick={this.changeWeek}>
            Chọn
          </button>
        </form>
        <div style={{ width: "100%", height: "auto" }}>
          <Bar
            data={{
              labels: [
                "Tháng 1",
                "Tháng 2",
                "Tháng 3",
                "Tháng 4",
                "Tháng 5",
                "Tháng 6",
                "Tháng 7",
                "Tháng 8",
                "Tháng 9",
                "Tháng 10",
                "Tháng 11",
                "Tháng 12",
              ],
              datasets: [
                {
                  label: "Tiền xe",
                  data: tienXeNam,
                },
              ],
            }}
            options={{
              legend: { display: true },
              title: {
                display: true,
                text: `Tiền giữ xe năm ${year} `,
              },
              barValueSpacing: 20,
            }}
          />
        </div>
      </>
    );
  }
  componentDidMount = () => {
    const { year } = this.state;
    console.log(year);
    this.props.getTienXeTNam(year);
  };
}

const mapStateToProps = (state) => {
  return {
    tienXeNam: state.thongKeReducer.tienXeTNam,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTienXeTNam: (year) => {
      dispatch(actions.getTienXeTheoNam(year));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThongKeTienXeTheoNam);
