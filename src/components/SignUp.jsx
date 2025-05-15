import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import { UserSignUp } from "../api";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 14px;
  text-align: center;
  padding: 10px;
  background: ${({ theme }) => theme.red}15;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  &:hover {
    background: ${({ theme, disabled }) => disabled ? theme.primary : theme.primary + 'ee'};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const SignUp = ({ setCurrentUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await UserSignUp(formData);
      const { token, user } = response.data;
      localStorage.setItem("Holistic-app-token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Create New Account 👋</Title>
        <Span>Please enter details to create a new account</Span>
      </div>
      <form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <TextInput
            label="Full name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            name="name"
            required
          />
          <TextInput
            label="Email Address"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            name="email"
            type="email"
            required
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SignUp;
