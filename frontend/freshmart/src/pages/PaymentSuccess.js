import { useNavigate } from "react-router-dom";
import "./Payment.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  // const query = new URLSearchParams(useLocation().search);

  // const paymentId = query.get("paymentId");

  return (
    <div className="payment-container success">
      <h2>✅ Payment Successful</h2>
      {/* <p>Payment ID: {paymentId}</p> */}
      <button className="" onClick={() => navigate("/orders")}>
        Go to Orders
      </button>
    </div>
  );
}