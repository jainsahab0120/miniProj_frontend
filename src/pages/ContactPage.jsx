import React, { useState } from "react";
import styled from "styled-components";
import { submitContactForm } from "../api";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  overflow-y: scroll;
`;

const Title = styled.h1`
  font-size: 28px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 24px;
  text-align: center;
  font-weight: 700;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SubTitle = styled.h2`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 16px;
  font-weight: 600;
`;

const Text = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.primary};
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary}10;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}20;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  outline: none;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}20;
  }
`;

const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}ee;
    transform: translateY(-2px);
  }

  &:disabled {
    background: ${({ theme }) => theme.text_secondary}50;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.green};
  font-size: 14px;
  padding: 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.green}15;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 14px;
  padding: 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.red}15;
  text-align: center;
`;

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("Holistic-app-token");
      await submitContactForm(token, form);
      setStatus({
        type: "success",
        message: "Thank you for your message! We'll get back to you soon."
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Something went wrong. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Get in Touch</Title>
      <Grid>
        <Card>
          <SubTitle>Contact Information</SubTitle>
          <Text>
            <span>📱</span>
            +91 9876543210
          </Text>
          <Text>
            <span>📧</span>
            aryan.ajtdl@gmail.com
          </Text>
          <Text>
            <span>📍</span>
            Mathura, Uttar Pradesh, India
          </Text>
          <SocialLinks>
            <SocialLink href="https://instagram.com" target="_blank">
              <span>📸</span>
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/aryan-jain-1a73b424a" target="_blank">
              <span>💼</span>
            </SocialLink>
            <SocialLink href="https://github.com/jainsahab0120" target="_blank">
              <span>💻</span>
            </SocialLink>
          </SocialLinks>
        </Card>

        <Card>
          <SubTitle>Send a Message</SubTitle>
          <Form onSubmit={handleSubmit}>
            {status.message && (
              <div>
                {status.type === "success" ? (
                  <SuccessMessage>{status.message}</SuccessMessage>
                ) : (
                  <ErrorMessage>{status.message}</ErrorMessage>
                )}
              </div>
            )}
            <FormGroup>
              <Label>Your Name</Label>
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Your Email</Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Subject</Label>
              <Input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Your Message</Label>
              <TextArea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Form>
        </Card>
      </Grid>

      <Card style={{ marginTop: "40px" }}>
        <SubTitle>My Location</SubTitle>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83930242252!2d77.12820492050757!3d27.49241382050421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39735c1fc0e7a06f%3A0x4763a3146a5f7428!2sMathura%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1681148026743!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: "0", marginTop: "16px", borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </Card>
    </Container>
  );
};

export default ContactPage;
