import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function MiniShop() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
  fetch("http://localhost:3000/orders")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setOrders(data);
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
    });
}, []);

    async function handleCheckout() {

        const response = await fetch("http://localhost:3000/create-checkout-session", {
            method: "POST"

        })
        console.log(response.status);
       
       

    const data = await response.json();

    console.log(data);

    window.location.href = data.url;
    }
    return (
      <div>
      <h1>Mini Shop!</h1>

      <h3>Nike Shoes</h3>
      <p>Price: $100</p>

      <button onClick={handleCheckout}>Buy Now</button>

      <hr />

      <h2>Orders</h2>

      {orders.map((order) => (
        <div key={order._id}>
          <h3>{order.product}</h3>
          <p>Quantity: {order.quantity}</p>
          <p>Amount: ${order.amount / 100}</p>
          <p>Payment: {order.paymentStatus}</p>
          <button
  onClick={() => {
    fetch(`http://localhost:3000/orders/${order._id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSelectedOrder(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }}
>
  <Link to={`/orders/${order._id}`}>
  View Order
</Link>
</button>
        </div>
      ))}
    </div>
    
    );

}
export default MiniShop