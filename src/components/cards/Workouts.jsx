import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/cards/WorkoutCard";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getWorkouts } from "../api";
import { useDispatch } from "react-redux";

// ... existing styled components

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Workouts = () => {
  // ... existing state and functions

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Select Date</Title>
          <Calendar
            onChange={(date) => {
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const year = date.getFullYear();
              setDate(`${month}/${day}/${year}`);
            }}
            value={date ? new Date(date) : new Date()}
          />
        </Left>
        <Right>
          <Section>
            <SecTitle>Todays Workout</SecTitle>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <CardWrapper>
                {todaysWorkouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </CardWrapper>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts; 