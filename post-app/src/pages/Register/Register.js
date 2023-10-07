import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../store/actions/user/userActions";
import { isValidEmail } from "../../helpers/helpers";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import styles from "./RegisterStyle.module.css";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null,
    name: null,
    surname: null,
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
    }
  });

  const handleSubmit = () => {
    const { email, password, confirmPassword, name, surname } = values;
    let valid = true;
    let passwordMessage = null;

    if (!confirmPassword) {
      passwordMessage = "Confirm Password is required";
      valid = false;
    } else if (password !== confirmPassword) {
      passwordMessage = "Passwords didn't match";
      valid = false;
    } else if (!email || !name || !surname) {
      valid = false;
    } else if (!isValidEmail(email)) {
      valid = false;
    }

    setErrors({
      email: email ? null : "Email is required",
      confirmPassword: passwordMessage,
      password: password ? null : "Password is required",
      name: name ? null : "Name is required",
      surname: surname ? null : "Surname is required",
    });

    if (!isValidEmail(email)) {
      setErrors({
        email: "Invalid email",
      });
    }

    if (valid) {
      dispatch(register(values, navigate));
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: null,
    });
  };

  return (
    <div className={styles.main}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6}>
            <Form>
              <h3 className={styles.heading}>Register</h3>
              <Form.Group className={styles.formGroup}>
                <Form.Control
                  className={errors.name ? styles.invalid : ""}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={values.name}
                  onChange={handleChange}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit(navigate);
                    }
                  }}
                />
                {<Form.Text className="text-danger">{errors.name}</Form.Text>}
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Control
                  className={errors.surname ? styles.invalid : ""}
                  type="text"
                  name="surname"
                  placeholder="Enter your surname"
                  value={values.surname}
                  onChange={handleChange}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit(navigate);
                    }
                  }}
                />
                {
                  <Form.Text className="text-danger">
                    {errors.surname}
                  </Form.Text>
                }
              </Form.Group>

              <Form.Group className={styles.formGroup}>
                <Form.Control
                  className={errors.email ? styles.invalid : ""}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit(navigate);
                    }
                  }}
                />
                {<Form.Text className="text-danger">{errors.email}</Form.Text>}
              </Form.Group>

              <Form.Group className={styles.formGroup}>
                <Form.Control
                  className={errors.password ? styles.invalid : ""}
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit(navigate);
                    }
                  }}
                />
                {
                  <Form.Text className="text-danger">
                    {errors.password}
                  </Form.Text>
                }
              </Form.Group>

              <Form.Group
                className={styles.formGroup}
                controlId="formBasicPassword"
              >
                <Form.Control
                  className={errors.confirmPassword ? styles.invalid : ""}
                  type="password"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit(navigate);
                    }
                  }}
                />
                <Form.Text className="text-danger">
                  {errors.confirmPassword}
                </Form.Text>
              </Form.Group>

              <div className={styles.submitContainer}>
                <Button
                  variant="success"
                  onClick={() => handleSubmit(navigate)}
                >
                  Sign Up
                </Button>

                <Link to="/login">Already registered? Try to login.</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
