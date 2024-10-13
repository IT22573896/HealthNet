import { Button, Col, Container, Row, Table } from "react-bootstrap";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import "../../styles/Payments.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  // Fetch users from the API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/payments/getallpayments"
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const navigate = useNavigate();

  const handleUpdate = (paymentId) => {
    navigate(`/managementdashboard/payments/updatepayments/${paymentId}`);
  };

  // Handler for deleting a payment
  const handleDelete = async (paymentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment?"
    );
    if (!confirmDelete) return; // If the user cancels the deletion, exit the function

    try {
      await axios.delete(
        `http://localhost:5000/api/payments/deletepayment/${paymentId}`
      ); // Correct API endpoint for payments
      setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment._id !== paymentId)
      ); // Update state to remove deleted payment
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar /> {/* Add Side Navbar here */}
        </Col>
        <Col md={9}>
          <div className="patient_list">
            <h2>All Payments</h2>
            <Table striped bordered hover responsive="sm" className="mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td>{payment.user}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.method}</td>
                    <td>{payment.status}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleUpdate(payment._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(payment._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Payments;
