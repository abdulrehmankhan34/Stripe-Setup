import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function OrderDetails() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");


  async function handleUpdate() {
  const response = await fetch(
    `http://localhost:3000/updateOrders/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        product: product,
        quantity: quantity,
      })
      
    }
   
    
  )
  
  const data = await response.json();

  console.log(data);
  setOrder(data);
}
  useEffect(() => {
    fetch(`http://localhost:3000/orders/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrder(data);
        setProduct(data.product);
        setQuantity(data.quantity);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Error fetching order");
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <h1>Order Details</h1>
       {loading && <p>Loading...</p>}
       {error && <p>{error}</p>}
      {order && (
  <div>
    <h3>{order.product}</h3>
    <p>Quantity: {order.quantity}</p>
    <p>Amount: ${order.amount / 100}</p>
    <p>Payment: {order.paymentStatus}</p>

    <hr />

    <h2>Update Order</h2>

    <input
    placeholder="Product"
      type="text"

       value={product}
  onChange={(e) => setProduct(e.target.value)}
    />

    <br /><br />

    <input
    placeholder="Quantity"
      type="number"
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
    />

    <br /><br />

    <button onClick={handleUpdate}>Update Order</button>
  </div>
)}
    </div>
  );
}

export default OrderDetails;