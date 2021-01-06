import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import moment from "moment";
import * as actions from "../../../redux/actions/thongKe";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class ThongKeTienNuocTheoTuan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: new Date(),
      year: moment(this.week).year(),
    };
  }
  _handleSubmit = (e) => {
    e.preventDefault();
  };
  handleChange = (date) => {
    this.setState(
      {
        week: date,
        year: moment(date).year(),
      },
      () => {
        console.log(moment(this.state.week).isoWeek());
        console.log(this.state.year);
      }
    );
  };
  changeWeek = () => {
    const { week, year } = this.state;
    let numberWeek = moment(week).isoWeek();
    this.props.getTienNuocTTuan(numberWeek, year);
  };
  render() {
    const { tienNuocTuan } = this.props;
    const { week, year } = this.state;
    return (
      <>
        <form onSubmit={this._handleSubmit}>
          <DatePicker
            selected={week}
            onChange={(date) => this.handleChange(date)}
            maxDate={new Date()}
            placeholderText="Select a date before 5 days in the future"
          />
          <button className="btn btn-primary mt-3" onClick={this.changeWeek}>
            Chọn
          </button>
        </form>
        <div style={{ width: "100%", height: "auto" }}>
          <Bar
            data={{
              labels: [
                "Thứ 2",
                "Thứ 3",
                "Thứ 4",
                "Thứ 5",
                "Thứ 6",
                "Thứ 7",
                "Chủ nhật",
              ],
              datasets: [
                {
                  label: "Tiền nước",
                  data: tienNuocTuan,
                },
              ],
            }}
            options={{
              legend: { display: true },
              title: {
                display: true,
                text: `Tiền nước tuần ${moment(
                  week
                ).isoWeek()} năm ${year} (${moment(week)
                  .isoWeekday(1)
                  .format("DD/MM")} - ${moment(week)
                  .isoWeekday(7)
                  .format("DD/MM")})`,
              },
              barValueSpacing: 20,
            }}
          />
        </div>
      </>
    );
  }
  componentDidMount = () => {
    const { week, year } = this.state;
    let numberWeek = moment(week).isoWeek();
    this.props.getTienNuocTTuan(numberWeek, year);
  };
}

const mapStateToProps = (state) => {
  return {
    tienNuocTuan: state.thongKeReducer.tienNuocTTuan,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTienNuocTTuan: (week, year) => {
      dispatch(actions.getThongKeTienNuocTheoTuan(week, year));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThongKeTienNuocTheoTuan);
