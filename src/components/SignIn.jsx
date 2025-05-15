import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import { UserSignIn } from "../api";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 20px;
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

const SignIn = ({ setCurrentUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
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
      const response = await UserSignIn(formData);
      const { token, user } = response.data;
      localStorage.setItem("Holistic-app-token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title>Welcome Back</Title>
      <SubTitle>Please sign in to continue</SubTitle>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <TextInput
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </Form>
    </>
  );
};

export default SignIn;
