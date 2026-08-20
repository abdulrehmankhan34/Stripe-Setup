import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function OrderDetails() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/orders/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrder(data);
      });
  }, [id]);

  return (
    <div>
      <h1>Order Details</h1>

      {order && (
        <div>
          <h3>{order.product}</h3>
          <p>Quantity: {order.quantity}</p>
          <p>Amount: ${order.amount / 100}</p>
          <p>Payment: {order.paymentStatus}</p>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;