import React from "react";
import styled from "styled-components";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 400px;
  height: 300px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 12px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const ChartContainer = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: calc(100% - 20px);
`;

const CategoryChart = ({ data }) => {
  const chartData = {
    labels: data?.pieChartData?.map(d => d.label) || [],
    datasets: [
      {
        data: data?.pieChartData?.map(d => d.value) || [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  return (
    <Card>
      <Title>Weekly Calories Burned</Title>
      <ChartContainer>
        {data?.pieChartData && (
          <Pie 
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }}
          />
        )}
      </ChartContainer>
    </Card>
  );
};

export default CategoryChart;
