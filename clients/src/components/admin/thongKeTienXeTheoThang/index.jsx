import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import moment from "moment";
import * as actions from "../../../redux/actions/thongKe";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class ThongKeTienXeTheoThang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      month: moment(this.date).month(),
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
        month: moment(date).month(),
        year: moment(date).year(),
      },
      () => {
        console.log(this.state.month);
      }
    );
  };
  changeMonth = () => {
    const { month, year } = this.state;
    this.props.getTienXeTThang(month, year);
  };
  render() {
    const { tienXeThang } = this.props;
    const { date, month, year } = this.state;
    return (
      <>
        <form onSubmit={this._handleSubmit}>
          <DatePicker
            selected={date}
            onChange={(date) => this.handleChange(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
          />
          <button className="btn btn-primary mt-3" onClick={this.changeMonth}>
            Chọn
          </button>
        </form>
        <div style={{ width: "100%", height: "auto" }}>
          <Bar
            data={{
              labels: [`Tháng ${month + 1}`],
              datasets: [
                {
                  label: "Tiền xe",
                  data: tienXeThang,
                },
              ],
            }}
            options={{
              legend: { display: true },
              title: {
                display: true,
                text: `Tiền giữ xe tháng ${month + 1} năm ${year} (${moment(
                  date
                )
                  .date(1)
                  .format("DD/MM")} - ${moment(date)
                  .date(31)
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
    const { month, year } = this.state;
    this.props.getTienXeTThang(month, year);
  };
}

const mapStateToProps = (state) => {
  return {
    tienXeThang: state.thongKeReducer.tienXeTThang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTienXeTThang: (month, year) => {
      dispatch(actions.getTienXeTheoThang(month, year));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThongKeTienXeTheoThang);
