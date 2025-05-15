import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/cards/WorkoutCard";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getWorkouts, deleteWorkout } from "../api";

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
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterCard = styled.div`
  padding: 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 16px;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const FilterTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryChip = styled.div`
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${({ active, theme }) => active ? `
    background: ${theme.primary};
    color: white;
  ` : `
    background: ${theme.primary}15;
    color: ${theme.primary};
  `}

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WorkoutsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const NoWorkouts = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.text_secondary}20;
  border-top: 3px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 40px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CalendarWrapper = styled.div`
  .react-calendar {
    width: 100%;
    background: ${({ theme }) => theme.card};
    border: none;
    font-family: inherit;
    line-height: 1.125em;
    padding: 12px;
    border-radius: 12px;

    &__navigation {
      height: 44px;
      margin-bottom: 16px;

      button {
        min-width: 44px;
        background: none;
        font-size: 16px;
        color: ${({ theme }) => theme.text_primary};
        
        &:enabled:hover,
        &:enabled:focus {
          background-color: ${({ theme }) => theme.primary}15;
          color: ${({ theme }) => theme.primary};
          border-radius: 8px;
        }

        &[disabled] {
          background-color: transparent;
          color: ${({ theme }) => theme.text_secondary}50;
        }
      }
    }

    &__month-view {
      &__weekdays {
        text-align: center;
        font-weight: 600;
        font-size: 14px;
        color: ${({ theme }) => theme.text_secondary};
        margin-bottom: 8px;

        abbr {
          text-decoration: none;
          cursor: default;
        }
      }

      &__days {
        &__day {
          font-size: 14px;
          color: ${({ theme }) => theme.text_primary};
          padding: 8px;
          
          &:hover {
            background-color: ${({ theme }) => theme.primary}15;
            color: ${({ theme }) => theme.primary};
            border-radius: 8px;
          }

          &--neighboringMonth {
            color: ${({ theme }) => theme.text_secondary}50;
          }

          &--today {
            background: ${({ theme }) => theme.primary}15;
            color: ${({ theme }) => theme.primary};
            font-weight: 600;
            border-radius: 8px;
          }
        }
      }
    }

    &__tile {
      max-width: 100%;
      padding: 10px 6px;
      background: none;
      text-align: center;
      line-height: 16px;
      font-size: 14px;
      
      &:enabled:hover,
      &:enabled:focus {
        background-color: ${({ theme }) => theme.primary}15;
        color: ${({ theme }) => theme.primary};
        border-radius: 8px;
      }

      &--now {
        background: ${({ theme }) => theme.primary}15;
        color: ${({ theme }) => theme.primary};
        font-weight: 600;
        border-radius: 8px;
      }

      &--active {
        background: ${({ theme }) => theme.primary} !important;
        color: white !important;
        border-radius: 8px;
        font-weight: 600;

        &:enabled:hover,
        &:enabled:focus {
          background: ${({ theme }) => theme.primary} !important;
          color: white !important;
        }
      }
    }
  }
`;

const DateDisplay = styled.div`
  margin-top: 16px;
  padding: 12px;
  border-radius: 12px;
  background: ${({ theme }) => theme.primary}10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.primary}15;
  }
`;

const DateText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
`;

const ResetButton = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary}15;
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const ErrorMessage = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
`;

const categories = ["All", "Legs", "Arms", "Chest", "Back", "Shoulders", "Core", "Cardio"];

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState(null);

  const getWorkoutsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("Holistic-app-token");
      const res = await getWorkouts(token, date ? `?date=${date}` : "");
      setWorkouts(res?.data?.todaysWorkouts || []);
    } catch (err) {
      setError(err.message || "Failed to fetch workouts. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    getWorkoutsData();
  }, [getWorkoutsData]);

  const filteredWorkouts = workouts.filter(workout => 
    selectedCategory === "All" || workout.category === selectedCategory
  );

  const handleDeleteWorkout = async (id) => {
    try {
      const token = localStorage.getItem("Holistic-app-token");
      await deleteWorkout(token, id);
      getWorkoutsData(); 
    } catch (err) {
      console.error('Error deleting workout:', err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <FilterCard>
            <Title>Select Date</Title>
            <CalendarWrapper>
              <Calendar
                onChange={(date) => {
                  const month = date.getMonth() + 1;
                  const day = date.getDate();
                  const year = date.getFullYear();
                  setDate(`${month}/${day}/${year}`);
                }}
                value={date ? new Date(date) : new Date()}
                locale="en-US"
                minDetail="month"
                maxDetail="month"
                showNeighboringMonth={false}
              />
            </CalendarWrapper>
            {date && (
              <>
                <DateDisplay>
                  <DateText>
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </DateText>
                </DateDisplay>
                <ResetButton onClick={() => setDate("")}>
                  Reset to Today
                </ResetButton>
              </>
            )}
          </FilterCard>
          <FilterCard>
            <Title>Filters</Title>
            <FilterSection>
              <FilterTitle>Categories</FilterTitle>
              <CategoryFilter>
                {categories.map((category) => (
                  <CategoryChip
                    key={category}
                    active={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </CategoryChip>
                ))}
              </CategoryFilter>
            </FilterSection>
          </FilterCard>
        </Left>
        <Right>
          <Title>
            {selectedCategory === "All" 
              ? "All Workouts" 
              : `${selectedCategory} Workouts`}
          </Title>
          {error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : loading ? (
            <LoadingSpinner />
          ) : filteredWorkouts.length === 0 ? (
            <NoWorkouts>No workouts found</NoWorkouts>
          ) : (
            <WorkoutsGrid>
              {filteredWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  onDelete={handleDeleteWorkout}
                />
              ))}
            </WorkoutsGrid>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;
