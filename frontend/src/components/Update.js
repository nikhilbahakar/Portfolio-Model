// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import { withRouter } from './withRouter';
// import axios from "axios";
// import searchicon from './assets/search-icon.png';

// class Update extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tableDate: null,
//       showfirstScreen: true,
//       pushvalue: "",
//       flag: true,
//       dataViewinPieChart: null,
//       id: null,
//       value: {
//         name: "",
//         riskCategory: "",
//         listOfSecurity: [],

//       }
//     }
//   }
//   componentDidMount() {
//     let id = window.location.pathname.split("/")[2];
//     if (id !== "new") {
//       axios.get("http://localhost:8080/api/tutorials/" + id).then(res => {
//         console.log(res.data)
//         this.setState({ value: res.data, id: id })
//       })
//     }

//   }
//   setData = (value, attr) => {
//     if (attr == "name") {
//       var data = this.state.value;
//       data.name = value;
//       this.setState({ value: data })
//     }
//     if (attr == "riskCategory") {
//       var data = this.state.value;
//       data.riskCategory = value;
//       this.setState({ value: data })
//     }
//     if (attr == "pushintotheArray") {
//       console.log(value)
//       if (value && value.label) {
//         var data = this.state.value;
//         data.listOfSecurity.push({
//           company: value.label,
//         })
//         this.setState({ value: data })
//       }
//     }
//   }
//   setDateFromTable = (value, i) => {
//     let data = this.state.value;
//     data.listOfSecurity[i].AssetAllocation = Number(value)
//     console.log(data, i, value)

//     this.setState({ value: data }, () => {
//       this.setState({ flag: false }, () => this.setState({ flag: true }))
//     })
//   }
//   saveData = (e) => {
//     if (e)
//       e.preventDefault();

//     if (this.state.id) {
//       axios.put("http://localhost:8080/api/tutorials/" + this.state.id, this.state.value).then(res => {
//         this.props.navigate("/")
//       })
//     } else
//       axios.post("http://localhost:8080/api/tutorials", this.state.value).then(res => {
//         this.props.navigate("/")
//       })
//   }
//   render() {
//     console.log(this.state.value)
//     var total = 0
//     this.state.value.listOfSecurity.filter(res => res.AssetAllocation).map((value, i) => {
//       total = total + value.AssetAllocation;
//     })
//     var series = [100];
//     var labels = ["Empty"]
//     this.state.value.listOfSecurity.filter(res => res.AssetAllocation).map((value, i) => {
//       series.push(value.AssetAllocation)
//       labels.push(value.company) //label update
//       series[0] = series[0] - value.AssetAllocation
//     })
//     return (
//       <div className="container mt-5 ">
//         <form onSubmit={this.saveData}>
//           <div class="row m-5 ">
//             <div class="col-8  ">

//               <h5 className="text-capitalize mb-5">create / update model</h5>
//               <div className="row model-info">
//                 <div className="col-6">
//                   <label>Name</label>
//                   <input type="text" class="form-control " required value={this.state.value.name} onChange={(e) => this.setData(e.target.value, "name")} />
//                 </div>
//                 <div className="col-6">
//                   <label>Risk Category</label>
//                   <input type="text" class="form-control " required value={this.state.value.riskCategory} onChange={(e) => this.setData(e.target.value, "riskCategory")} />
//                 </div>
//               </div>

//             </div>
//             <div className="col-4">
//               {/* Pie chart starts here  */}
//               <Chart
//                 type="donut"
//                 width={300}
//                 height={200}
//                 series={series}
//                 options={{
//                   labels: labels,

//                   plotOptions: {
//                     pie: {
//                       donut: {
//                         labels: {
//                           show: true,
//                           total: {
//                             show: true,
//                             showAlways: true,
//                             // color: 'black'
//                           }
//                         }
//                       }
//                     }
//                   },
//                   colors: ["grey", "#ff6600", "#00ccff", "#99cc00", "#ff9900", "#cc3300"],
//                   dataLabels: {
//                     enabled: false
//                   }
//                 }}
//               />
//             </div>
//           </div>

//           {/* security tables */}
//           <div className="row m-5">
//             <div className="col-4">
//               <label>Add security to your model</label>
//               <img src={searchicon} style={{
//                 marginTop: 40,
//                 marginLeft: 76, position: 'absolute'
//               }} />
//               <Autocomplete
//                 disablePortal
//                 id="combo-box-demo"
//                 options={top50}
//                 value={this.state.pushvalue}
//                 onChange={(e, newValue) => this.setData(newValue, "pushintotheArray")}
//                 sx={{ width: 300, height: 300 }}
//                 renderInput={(params) => <TextField {...params} label="" />}
//                 renderOption={(props, option, { selected }) => (
//                   <li {...props} >
//                     <p style={{ fontSize: 18 }} className="text-uppercase fw-normal lh-sm m-0">
//                       {option.label}
//                       <br />
//                       <p style={{ fontSize: 9, marginBottom: -5 }}>{option.disp}</p>
//                     </p>

//                   </li>
//                 )}
//               />
//             </div>
//             {/* Secuarity table ends here  */}

//             <div className="container ps-4 col-8 mt-10">
//               <table className="table table-striped">
//                 <thead className="text-capitalize text-white table-head ">
//                   <tr>
//                     <th className="col-sm-5">name</th>
//                     <th className="col-sm-3">Asset Allocation</th>
//                   </tr>
//                 </thead>
//                 <tbody className="table-body">
//                   {this.state.value.listOfSecurity && this.state.value.listOfSecurity.map((res, i) => <tr>
//                     <td>{res.company}</td>
//                     <td className="input-percent"   >
//                       <input type="number" value={res.AssetAllocation} onChange={(e) => this.setDateFromTable(e.target.value, i)} />
//                     </td>
//                   </tr>)}
//                   <tr>
//                     <td className="text-end">Total</td>
//                     <td>{this.state.value.listOfSecurity.length > 0 ? total : 0}% </td>
//                   </tr>
//                 </tbody>
//               </table>
//               {series[0] < 0 && <div class="alert alert-danger alert-dismissible fade show">
//                 <strong>Error!</strong> Asset Allocation should be not greater than 100%
//                 <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
//               </div>}
//             </div>
//             {/* cancel and save button start */}
//             <div className="d-flex mb-5">
//               <button type="button" class="cancel_btn btn btn-light btn-outline-primary" onClick={() => this.props.navigate("/")}>Cancel</button>
//               <button disabled={series[0] != 0 || this.state.value.name == "" || this.state.value.riskCategory == ""} type="submit" class="create btn btn-primary  text-capitalize ms-auto">Save</button>
//             </div>
//             {/* cancel and save button end */}
//           </div>
//         </form >
//       </div >
//     );
//   }
// }

// export default withRouter(Update);
// const top50 = [
//   { label: 'INDUSNDBK', disp: "Indusland bank limited" },
//   { label: 'ICICI Bank', disp: "Icici bank limited" },
//   { label: 'ITC', disp: "ITC limited" },
//   { label: 'TITAN', disp: "TITAN" },
//   { label: 'POWERGRID', disp: "POWERGRID" },
//   { label: 'NTPC', disp: "NTPC" },
//   { label: 'ONGC', disp: "ONGC" },
//   { label: 'GRASIM', disp: "GRASIM" },
//   { label: 'TATACONSUM', disp: "TATACONSUM" },
// ]

import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { withRouter } from "./withRouter";
import axios from "axios";
import searchicon from "./assets/search-icon.png";

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableDate: null,
      showfirstScreen: true,
      pushvalue: "",
      flag: true,
      dataViewinPieChart: null,
      id: null,
      seriesErrorMessage: "",
      nameErrorMessage: "",
      riskCategoryErrorMessage: "",
      value: {
        name: "",
        riskCategory: "",
        listOfSecurity: [],
      },
    };
  }
  componentDidMount() {
    let id = window.location.pathname.split("/")[2];
    if (id !== "new") {
      axios.get("http://localhost:8080/api/tutorials/" + id).then((res) => {
        console.log(res.data);
        this.setState({ value: res.data, id: id });
      });
    }
  }
  setData = (value, attr) => {
    if (attr == "name") {
      var data = this.state.value;
      data.name = value;
      this.setState({ value: data, nameErrorMessage: "" });
    }
    if (attr == "riskCategory") {
      var data = this.state.value;
      data.riskCategory = value;
      this.setState({ value: data, riskCategoryErrorMessage: "" });
    }
    if (attr == "pushintotheArray") {
      console.log(value);
      if (value && value.label) {
        var data = this.state.value;
        data.listOfSecurity.push({
          company: value.label,
        });
        this.setState({ value: data, seriesErrorMessage: "" });
      }
    }
  };
  setDateFromTable = (value, i) => {
    let data = this.state.value;
    data.listOfSecurity[i].AssetAllocation = Number(value);
    console.log(data, i, value);

    this.setState({ value: data }, () => {
      this.setState({ flag: false }, () => this.setState({ flag: true }));
    });
  };
  saveData = (e, series, name, riskCategory) => {
    if (e) e.preventDefault();

    console.log(series, name, riskCategory);
    if (series) {
      this.setState({
        seriesErrorMessage: "Asset Allocation should be not greater than 100%.",
      });
    }
    if (name) {
      this.setState({ nameErrorMessage: "Please enter your name." });
    }
    if (riskCategory) {
      this.setState({
        riskCategoryErrorMessage: "Please enter Risk Category.",
      });
    }
    if (!series && !name && !riskCategory) {
      if (this.state.id) {
        axios
          .put(
            "http://localhost:8080/api/tutorials/" + this.state.id,
            this.state.value
          )
          .then((res) => {
            this.props.navigate("/");
          });
      } else
        axios
          .post("http://localhost:8080/api/tutorials", this.state.value)
          .then((res) => {
            this.props.navigate("/");
          });
    }
  };
  render() {
    console.log(this.state.value);
    var total = 0;
    this.state.value.listOfSecurity
      .filter((res) => res.AssetAllocation)
      .map((value, i) => {
        total = total + value.AssetAllocation;
      });
    var series = [100];
    var labels = ["Empty"];
    this.state.value.listOfSecurity
      .filter((res) => res.AssetAllocation)
      .map((value, i) => {
        series.push(value.AssetAllocation);
        labels.push(value.company); //label update
        series[0] = series[0] - value.AssetAllocation;
      });
    return (
      <div className="container mt-5 ">
        <form
          onSubmit={(e) =>
            this.saveData(
              e,
              series[0] != 0,
              this.state.value.name == "",
              this.state.value.riskCategory == ""
            )
          }
        >
          <div class="row m-5 ">
            <div class="col-8  ">
              <h5 data-testid="text" className="text-capitalize mb-5">
                create / update model
              </h5>
              <div className="row model-info">
                <div className="col-6 red">
                  <label>
                    Name<span>*</span> :
                  </label>
                  <input
                    type="text"
                    class="form-control "
                    value={this.state.value.name}
                    onChange={(e) => this.setData(e.target.value, "name")}
                  />
                  {this.state.nameErrorMessage && (
                    <p style={{ color: "red" }}>
                      {this.state.nameErrorMessage}
                    </p>
                  )}
                </div>
                <div className="col-6 red">
                  <label>
                    Risk Category<span>*</span> :
                  </label>
                  <input
                    type="text"
                    class="form-control "
                    value={this.state.value.riskCategory}
                    onChange={(e) =>
                      this.setData(e.target.value, "riskCategory")
                    }
                  />
                  {this.state.riskCategoryErrorMessage && (
                    <p style={{ color: "red" }}>
                      {this.state.riskCategoryErrorMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-4">
              {/* Pie chart starts here  */}
              <Chart
                type="donut"
                width={300}
                height={200}
                series={series}
                options={{
                  labels: labels,

                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            showAlways: true,
                            // color: 'black'
                          },
                        },
                      },
                    },
                  },
                  colors: [
                    "grey",
                    "#ff6600",
                    "#00ccff",
                    "#99cc00",
                    "#ff9900",
                    "#cc3300",
                  ],
                  dataLabels: {
                    enabled: false,
                  },
                }}
              />
            </div>
          </div>

          {/* security tables */}
          <div className="row m-5">
            <div className="col-4 red">
              <label>
                Add security to your model<span>*</span> :
              </label>
              <img
                src={searchicon}
                style={{
                  marginTop: 40,
                  marginLeft: 60,
                  position: "absolute",
                }}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top50}
                value={this.state.pushvalue}
                onChange={(e, newValue) =>
                  this.setData(newValue, "pushintotheArray")
                }
                sx={{ width: 300, height: 300 }}
                renderInput={(params) => <TextField {...params} label="" />}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <p
                      style={{ fontSize: 18 }}
                      className="text-uppercase fw-normal lh-sm m-0"
                    >
                      {option.label}
                      <br />
                      <p style={{ fontSize: 9, marginBottom: -5 }}>
                        {option.disp}
                      </p>
                    </p>
                  </li>
                )}
              />
            </div>
            {/* Secuarity table ends here  */}

            <div className="container ps-4 col-8 mt-10">
              <table className="table table-striped">
                <thead className="text-capitalize text-white table-head ">
                  <tr>
                    <th className="col-sm-5">name</th>
                    <th className="col-sm-3">Asset Allocation</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {this.state.value.listOfSecurity &&
                    this.state.value.listOfSecurity.map((res, i) => (
                      <tr>
                        <td>{res.company}</td>
                        <td className="input-percent">
                          <input
                            type="text"
                            value={res.AssetAllocation}
                            onChange={(e) =>
                              this.setDateFromTable(e.target.value, i)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  <tr>
                    <td className="text-end">Total</td>
                    <td>
                      {this.state.value.listOfSecurity.length > 0 ? total : 0}%{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
              {this.state.seriesErrorMessage && (
                <p style={{ color: "red" }}>{this.state.seriesErrorMessage}</p>
              )}
            </div>
            {/* cancel and save button start */}
            <div className="d-flex mb-5">
              <button
                data-testid="cancelbtn"
                type="button"
                class="cancel_btn btn btn-light btn-outline-primary"
                onClick={() => this.props.navigate("/")}
              >
                Cancel
              </button>
              <button
                data-testid="savebtn"
                // disabled={series[0]!=0 || this.state.value.name=="" || this.state.value.riskCategory==""}
                type="submit"
                class="create btn btn-primary  text-capitalize ms-auto"
              >
                Save
              </button>
            </div>
            {/* cancel and save button end */}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Update);
const top50 = [
  { label: "INDUSNDBK", disp: "Indusland bank limited" },
  { label: "ICICI Bank", disp: "Icici bank limited" },
  { label: "ITC", disp: "ITC limited" },
  { label: "TITAN", disp: "TITAN" },
  { label: "POWERGRID", disp: "POWERGRID" },
  { label: "NTPC", disp: "NTPC" },
  { label: "ONGC", disp: "ONGC" },
  { label: "GRASIM", disp: "GRASIM" },
  { label: "TATACONSUM", disp: "TATACONSUM" },
];
