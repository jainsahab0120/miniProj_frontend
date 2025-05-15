import React from "react";
import styled from "styled-components";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 400px;
  height: 500px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 400px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 12px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const ChartContainer = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: calc(100% - 40px);
`;

const WeeklyStatCard = ({ data }) => {
  const chartData = {
    labels: data?.totalWeeksCaloriesBurnt?.weeks || [],
    datasets: [
      {
        data: data?.totalWeeksCaloriesBurnt?.caloriesBurned || [],
        backgroundColor: '#4BC0C0'
      }
    ]
  };

  return (
    <Card>
      <Title>Weekly Calories Burned</Title>
      <ChartContainer>
        {data?.totalWeeksCaloriesBurnt && (
          <Bar 
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
        )}
      </ChartContainer>
    </Card>
  );
};

export default WeeklyStatCard;
