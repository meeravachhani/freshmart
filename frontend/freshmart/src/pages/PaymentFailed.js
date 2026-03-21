import { useNavigate } from "react-router-dom";
import "./Payment.css";

export default function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="payment-container failed">
      <h2>❌ Payment Failed</h2>
      <p>Please try again</p>
      <button onClick={() => navigate("/cart")}>
        Retry Payment
      </button>
    </div>
  );
}