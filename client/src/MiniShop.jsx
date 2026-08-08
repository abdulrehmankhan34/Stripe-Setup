import React from "react";
// import { loadStripe } from "@stripe/stripe-js";




function MiniShop() {
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
        </div>
    );

}
export default MiniShop