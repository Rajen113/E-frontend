import React from "react";
import "./Dashboard.css";
function Dashboard() {
  return (
    <div className="dashboard">

      <h2>Dashboard Overview</h2>

      <div className="cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>1,240</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p>780</p>
        </div>

        <div className="card">
          <h3>Revenue</h3>
          <p>$45,800</p>
        </div>

        <div className="card">
          <h3>Products</h3>
          <p>320</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="chart-box">
          <h3>Sales Analytics</h3>
          <div className="chart-placeholder">Chart Placeholder</div>
        </div>

        <div className="orders-box">
          <h3>Recent Orders</h3>

          <table>
            <tr>
              <th>User</th>
              <th>Product</th>
              <th>Status</th>
              <th>Price</th>
            </tr>

            <tr>
              <td>Amit</td>
              <td>Smart Watch</td>
              <td className="status delivered">Delivered</td>
              <td>$299</td>
            </tr>

            <tr>
              <td>Sara</td>
              <td>Headphones</td>
              <td className="status pending">Pending</td>
              <td>$99</td>
            </tr>

            <tr>
              <td>John</td>
              <td>iPhone 14</td>
              <td className="status shipped">Shipped</td>
              <td>$999</td>
            </tr>

          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
