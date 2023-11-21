import React from "react";
import { Link } from "react-router-dom";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const LatestOrder = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className="card-body">
      <h5 className="card-title">Latest orders</h5>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr>
                  <td>
                    <b>User</b>
                  </td>
                  <td>user@example.com</td>
                  <td>$345</td>
                  <td>
                    <span className="badge rounded-pill alert-success">
                      Paid At Today at 10:13 AM
                    </span>
                  </td>
                  <td>Today at 10:13 AM</td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link to={`/order`} className="text-success">
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
