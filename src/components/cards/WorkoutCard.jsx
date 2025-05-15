import React from "react";
import styled from "styled-components";

const Card = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  padding: 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.card};
  border: none;
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.shadow};
    
    ${({ theme }) => `
      border: 1px solid ${theme.primary}20;
      background: ${theme.primary}05;
    `}
  }

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Category = styled.div`
  width: fit-content;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  background: ${({ theme }) => theme.primary}15;
  padding: 6px 14px;
  border-radius: 999px;
`;

const Name = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;

const Sets = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
  display: flex;
  gap: 6px;
`;

const Flex = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 8px;
`;

const Details = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Icon = styled.span`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary}15;
  color: ${({ theme }) => theme.primary};
  font-size: 18px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${({ theme }) => theme.red}15;
  color: ${({ theme }) => theme.red};
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }

  &:hover {
    background: ${({ theme }) => theme.red};
    color: white;
  }
`;

const WatchButton = styled.a`
  width: fit-content;
  padding: 10px 20px;
  margin: 8px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 12px;
  background: ${({ theme }) => theme.primary}15;
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-2px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
  </svg>
);

const WorkoutCard = ({ workout, onDelete, showDemo = false }) => {
  return (
    <Card>
      {onDelete && (
        <DeleteButton onClick={() => onDelete(workout.id)}>×</DeleteButton>
      )}
      <Category>#{workout?.category}</Category>
      <Name>{workout?.workoutName}</Name>
      <Sets>
        Count: {workout?.sets} sets × {workout?.reps} reps
      </Sets>
      <Flex>
        <Details>
          <Icon>💪</Icon>
          {workout?.weight} kg
        </Details>
        <Details>
          <Icon>⏱️</Icon>
          {workout?.duration} min
        </Details>
      </Flex>
      {showDemo && workout?.videoLink && (
        <WatchButton 
          href={workout.videoLink} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <PlayIcon />
          Watch Demo
        </WatchButton>
      )}
    </Card>
  );
};

export default WorkoutCard;
