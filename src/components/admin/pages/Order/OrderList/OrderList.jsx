import React from "react";
import "./OrderList.css";
import { Link } from "react-router-dom";
import { FaSearch, FaBell,FaUser} from "react-icons/fa";
function OrderList() {
  const orders = [
    {
     
      product: "Dried Food",
      OrderId: 7712309,
      Price:1452 ,
      Quantity:100
    },
    {
      
      product: "Driedrtyt",
      OrderId: 3712309,
      Price:1452 ,
      Quantity:165
    },
  ];

  return (
    <div className="orders-list-container">
      <div className="header">
       
        <div className="search-box">
                <FaSearch />
                <input type="text" placeholder="Search anything..." />
        </div>
       
        <button className="add-btn"><Link to="/admin/createcategory">Export All order</Link></button>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>OrderID</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.product}</td>
              <td>{o.OrderId}</td>
              <td>{o.Price}</td>
               <td>{o.Quantity}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
