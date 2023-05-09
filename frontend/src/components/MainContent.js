import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MainContent() {
  const [tableDate, settableDate] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    //2 load
    showData();
  }, []);
  const showData = () => {
    axios.get("http://localhost:8080/api/tutorials").then((res) => {
      console.log(res.data);
      settableDate(res.data);
    });
  };
  const DeleteData = (id) => {
    axios
      .delete("http://localhost:8080/api/tutorials/" + id)
      .then((response) => {
        showData();
      });
  };
  const EditData = (id) => {
    navigate("/model/" + id);
  };
  return (
    //1 load
    <div className="container mt-5 grid mx-6 px-6 ">
      <div className="container d-flex p-0 mb-3">
        <p className="text-capitalize d-inline me-auto">all models</p>
        <Link className="nav-link" to="/model/new">
          <button
            type="button"
            class="btn btn-primary align-self-right text-capitalize create "
          >
            create
          </button>
        </Link>
      </div>
      <table className="table table-striped">
        <thead className="text-capitalize text-white table-head ">
          <tr>
            <th className="col-sm-5 ">name</th>
            <th className="col-sm-3">risk category</th>
            <th className="col-sm-2">action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {tableDate &&
            tableDate.map((res) => (
              <tr>
                <td>{res.name}</td>
                <td>{res.riskCategory}</td>
                <td>
                  <i
                    class="fa-solid fa-pencil mx-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => EditData(res.id)}
                  ></i>
                  <i
                    class="fa-solid fa-trash-can mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    style={{ cursor: "pointer" }}
                  ></i>

                  {/* model starts here*/}
                  <div class="modal fade" id="myModal">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-body">
                          Are you sure, you want to delete selected item?
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => this.props.navigate("/")}
                          >
                            No
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => DeleteData(res.id)}
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default MainContent;
