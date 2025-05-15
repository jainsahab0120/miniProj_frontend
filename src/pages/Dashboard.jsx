import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDashboardDetails, getWorkouts } from "../api";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  ArcElement
);

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const SectionTitle = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const ChartContainer = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
  height: 380px;
  width: 90%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ChartHeading = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 16px;
  text-align: center;
`;

const ChartWrapper = styled.div`
  flex: 1;
  min-height: 0;
  position: relative;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 24px;
  padding: 0 16px;
  margin: 24px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatsCard = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 24px;
  border-radius: 16px;
  flex: 1;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ theme }) => theme.primary};
    opacity: 0.7;
  }

  &:hover {
    
    transform: translateY(-5px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.shadow};
  }

  @media (max-width: 768px) {
    min-width: 80%;
    padding: 20px;
  }
`;

const StatTitle = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: baseline;
  gap: 4px;

  span {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const StatIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  font-size: 18px;
`;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalCaloriesBurnt: 0,
    totalWorkouts: 0,
    avgCaloriesBurntPerWorkout: 0,
    pieChartData: [],
    weeklyData: {
      labels: [],
      calories: []
    }
  });
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("Holistic-app-token");
      const [dashboardResponse, workoutsResponse] = await Promise.all([
        getDashboardDetails(token),
        getWorkouts(token, "")
      ]);
      
      setDashboardData(dashboardResponse.data);
      setTodaysWorkouts(workoutsResponse.data.todaysWorkouts || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11,
            weight: 500
          },
          color: theme => theme.text_primary
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 10,
        titleFont: {
          size: 12,
          weight: 'bold'
        },
        bodyFont: {
          size: 11
        },
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 10,
            weight: 500
          },
          padding: 6,
          callback: value => `${value} kcal`
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10,
            weight: 500
          },
          padding: 6
        }
      }
    }
  };

  const weeklyChartData = {
    labels: dashboardData.weeklyData.labels || [],
    datasets: [{
      label: 'Calories Burned',
      data: dashboardData.weeklyData.calories || [],
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#fff',
      pointHoverBackgroundColor: '#4CAF50',
      pointBorderColor: '#4CAF50',
      pointBorderWidth: 2
    }]
  };

  const pieChartData = {
    labels: dashboardData.pieChartData?.map(item => item.label) || [],
    datasets: [{
      data: dashboardData.pieChartData?.map(item => item.value) || [],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Wrapper>
        <SectionTitle>Dashboard</SectionTitle>
        <FlexWrap>
          <StatsCard>
            <StatTitle>
              <StatIcon>🔥</StatIcon>
              Total Calories Burned Today
            </StatTitle>
            <StatValue>
              {dashboardData.totalCaloriesBurnt?.toFixed(0) || 0}
              <span>kcal</span>
            </StatValue>
          </StatsCard>
          <StatsCard>
            <StatTitle>
              <StatIcon>💪</StatIcon>
              Total Workouts Today
            </StatTitle>
            <StatValue>
              {dashboardData.totalWorkouts || 0}
              <span>workouts</span>
            </StatValue>
          </StatsCard>
          <StatsCard>
            <StatTitle>
              <StatIcon>⚡</StatIcon>
              Avg. Calories per Workout
            </StatTitle>
            <StatValue>
              {dashboardData.avgCaloriesBurntPerWorkout?.toFixed(0) || 0}
              <span>kcal</span>
            </StatValue>
          </StatsCard>
        </FlexWrap>

        <ChartsGrid>
          <ChartContainer>
            <ChartHeading>Weekly Calories Burned</ChartHeading>
            <ChartWrapper>
              <Line 
                data={weeklyChartData} 
                options={chartOptions}
                redraw={false}
              />
            </ChartWrapper>
          </ChartContainer>
          
          <ChartContainer>
            <ChartHeading> Calories by Category</ChartHeading>
            <ChartWrapper>
              <Pie 
                data={pieChartData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      ...chartOptions.plugins.legend,
                      position: 'right'
                    }
                  }
                }}
              />
            </ChartWrapper>
          </ChartContainer>
        </ChartsGrid>

        <Section>
          <SectionTitle>Add New Workout</SectionTitle>
          <AddWorkout onWorkoutAdded={fetchDashboardData} />
        </Section>

        <Section>
          <SectionTitle>Today's Workouts</SectionTitle>
          <CardWrapper>
            {todaysWorkouts.length === 0 ? (
              <div>No workouts for today</div>
            ) : (
              todaysWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout._id}
                  workout={workout}
                  onDelete={() => fetchDashboardData()}
                />
              ))
            )}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
