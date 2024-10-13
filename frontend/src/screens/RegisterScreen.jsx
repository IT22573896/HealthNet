import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("patient");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password, role }).unwrap(); // Include role in registration
        dispatch(setCredentials({ ...res }));
        toast.success("Registration successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          style: {
            backgroundColor: "#a9dcf9",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "monospace",
          },
        });

        // Display role-specific notification for patients
        if (role === "Patient") {
          toast.info("Please complete your Medical profile", {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            style: {
              backgroundColor: "#ebc7cd",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
              fontFamily: "monospace",
            },
          });
        }

        // Display role-specific notification for management
        if (role === "Management") {
          toast.info("You can access your dashboard panel now", {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            style: {
              backgroundColor: "#ebc7cd",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
              fontFamily: "monospace",
            },
          });
        }
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          style: {
            backgroundColor: "#ffd5cc",
            color: "black",
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: "monospace",
          },
        });
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Role Selection */}
        <Row>
          <Col md={6}>
            <Form.Group className="my-2" controlId="role">
              <Form.Label>Select Role</Form.Label>
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  id="rolePatient"
                  label="Patient"
                  name="role"
                  value="Patient"
                  checked={role === "Patient"}
                  onChange={(e) => setRole(e.target.value)}
                  className="me-3"
                />
                <Form.Check
                  type="radio"
                  id="roleManagement"
                  label="Management"
                  name="role"
                  value="Management"
                  checked={role === "Management"}
                  onChange={(e) => setRole(e.target.value)}
                  className="me-3"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {isLoading ? (
          <Loader />
        ) : (
          <Button type="submit" variant="danger" className="mt-3">
            Register
          </Button>
        )}
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link
            to={`/login`}
            style={{
              textDecoration: "none",
              color: "grey",
              fontWeight: "Bolder",
            }}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
