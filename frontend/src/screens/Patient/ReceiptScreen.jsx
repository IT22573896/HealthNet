import { useParams } from "react-router-dom";
import { useGetPaymentDetailsMutation } from "../../slices/paymentApiSlice";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";

const ReceiptScreen = () => {
  const { paymentId } = useParams();
  const [getPaymentDetails] = useGetPaymentDetailsMutation(); // Remove destructuring for unused variable
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const result = await getPaymentDetails(paymentId);
      setPayment(result.data); // Set the payment details
    };

    fetchPaymentDetails();
  }, [paymentId, getPaymentDetails]);

  // Function to download the PDF receipt
  const downloadReceipt = () => {
    const doc = new jsPDF();

    // Receipt design
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(34, 139, 34); // Green color for success
    doc.text("Payment Success!", 10, 20);
    doc.setFontSize(18);
    doc.text(`Amount: ${payment.amount} IDR`, 10, 30);
    doc.setLineWidth(0.5);
    doc.line(10, 40, 200, 40); // Horizontal line

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black text
    doc.text("Payment Details", 10, 50);
    doc.text(`Ref Number: ${payment.refNumber || "N/A"}`, 10, 60);
    doc.text(`Payment Status: ${payment.status}`, 10, 70);
    doc.text(
      `Payment Time: ${new Date(payment.createdAt).toLocaleString()}`,
      10,
      80
    );
    doc.text(`Total Payment: IDR ${payment.amount}`, 10, 90);

    doc.save(`receipt_${paymentId}.pdf`);
  };

  return (
    <div>
      {payment ? (
        <div>
          <h2>Receipt for Payment ID: {paymentId}</h2>
          <p>Amount: {payment.amount} IDR</p>
          <p>Status: {payment.status}</p>
          <p>
            Payment Time: {new Date(payment.createdAt).toLocaleDateString()}{" "}
            {new Date(payment.createdAt).toLocaleTimeString()}
          </p>
          <Button variant="success" onClick={downloadReceipt}>
            Download Receipt
          </Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ReceiptScreen;
