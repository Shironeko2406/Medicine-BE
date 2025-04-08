import styled from "styled-components";
import { Card, Button, Input } from "antd";

export const LoginContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #9333ea, #ec4899);
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledCard = styled.div`
  display: flex;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
  max-width: 860px;
  margin: auto;
`;


export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ImageSection = styled.div`
  position: relative;
  min-height: 350px;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2));
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const FormSection = styled.div`
  padding: 2rem;
`;

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const LogoCircle = styled.div`
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #9333ea, #7e22ce);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 8px rgba(126, 34, 206, 0.3);
`;

export const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #333;
`;

export const FormDescription = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 1.75rem;
`;

export const FormContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #4b5563;
`;

export const ForgotPassword = styled.a`
  font-size: 0.875rem;
  color: #9333ea;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #7e22ce;
    text-decoration: underline;
  }
`;

export const PasswordContainer = styled.div`
  position: relative;
`;

export const SignupText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #4b5563;
`;

export const SignupLink = styled.a`
  color: #9333ea;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #7e22ce;
    text-decoration: underline;
  }
`;

export const Footer = styled.div`
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6b7280;
`;

export const FooterLink = styled.a`
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #4b5563;
  }
`;

export const StyledButton = styled(Button)`
  height: 2.75rem !important;
  font-size: 0.95rem !important;
  font-weight: 500 !important;
  border-radius: 8px !important;
  background: linear-gradient(135deg, #9333ea, #7e22ce) !important;
  border: none !important;
  box-shadow: 0 4px 10px rgba(126, 34, 206, 0.3) !important;
  transition: all 0.3s ease !important;

  &:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 15px rgba(126, 34, 206, 0.4) !important;
    background: linear-gradient(135deg, #8b31d8, #7522bd) !important;
  }

  &:active {
    transform: translateY(0) !important;
  }
`;

export const StyledInput = styled(Input)`
  height: 2.75rem !important;
  border-radius: 8px !important;
  border: 1px solid #e5e7eb !important;
  transition: all 0.3s ease !important;

  &:hover,
  &:focus {
    border-color: #9333ea !important;
    box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.1) !important;
  }
`;
