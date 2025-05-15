import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 10px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 16px 26px;
  border: 1px solid ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary};
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  
  @media (max-width: 600px) {
    padding: 8px 12px;
  }

  ${({ small }) =>
    small &&
    `
    padding: 10px 28px;
  `}

  ${({ outlined, theme }) =>
    outlined &&
    `
    background: transparent;
    color: ${theme.primary};
    box-shadow: none;
  `}

  ${({ full }) =>
    full &&
    `
    width: 100%;
  `}
`;

const LoadingSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  onClick,
  small,
  outlined,
  full,
}) => {
  return (
    <StyledButton
      onClick={() => !isDisabled && !isLoading && onClick()}
      disabled={isDisabled || isLoading}
      small={small}
      outlined={outlined}
      full={full}
    >
      {isLoading && <LoadingSpinner />}
      {leftIcon}
      {text}
      {isLoading && <span>...</span>}
      {rightIcon}
    </StyledButton>
  );
};

export default Button;
