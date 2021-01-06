import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import moment from "moment";
import * as actions from "../../../redux/actions/thongKe";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class ThongKeTienNuocTheoNam extends Component {
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
    this.setState({
      date: date,
      year: moment(date).year(),
    });
  };
  changeWeek = () => {
    const { year } = this.state;

    this.props.getTienNuocTNam(year);
  };
  render() {
    const { tienNuocNam } = this.props;
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
                  label: "Tiền nước",
                  data: tienNuocNam,
                },
              ],
            }}
            options={{
              legend: { display: true },
              title: {
                display: true,
                text: `Tiền nước năm ${year} `,
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
    this.props.getTienNuocTNam(year);
  };
}

const mapStateToProps = (state) => {
  return {
    tienNuocNam: state.thongKeReducer.tienNuocTNam,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTienNuocTNam: (year) => {
      dispatch(actions.getTienNuocTheoNam(year));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThongKeTienNuocTheoNam);
