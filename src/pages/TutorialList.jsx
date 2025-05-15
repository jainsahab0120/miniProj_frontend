import React, { useState } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/cards/WorkoutCard";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 22px;
  overflow-y: scroll;
  gap: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: ${({ active, theme }) => active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.text_primary};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + '20'};
  }
`;

const workoutsData = [
  {
    id: 1,
    category: "Legs",
    workoutName: "Back Squat",
    sets: 5,
    reps: 15,
    weight: 30,
    duration: 10,
    videoLink: "https://www.youtube.com/watch?v=ultWZbUMPL8",
  },
  {
    id: 2,
    category: "Abs",
    workoutName: "Plank",
    sets: 3,
    reps: 60,
    weight: 0,
    duration: 5,
    videoLink: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
  },
  {
    id: 3,
    category: "Arms",
    workoutName: "Bicep Curl",
    sets: 4,
    reps: 12,
    weight: 15,
    duration: 8,
    videoLink: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
  },
  {
    id: 4,
    category: "Chest",
    workoutName: "Bench Press",
    sets: 4,
    reps: 10,
    weight: 40,
    duration: 12,
    videoLink: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
  },
  {
    id: 5,
    category: "Legs",
    workoutName: "Lunges",
    sets: 3,
    reps: 15,
    weight: 20,
    duration: 7,
    videoLink: "https://www.youtube.com/watch?v=lunges_video_link",
  },
  {
    id: 6,
    category: "Back",
    workoutName: "Deadlift",
    sets: 5,
    reps: 8,
    weight: 50,
    duration: 10,
    videoLink: "https://www.youtube.com/watch?v=deadlift_video_link",
  },
  {
    id: 7,
    category: "Shoulders",
    workoutName: "Overhead Press",
    sets: 4,
    reps: 12,
    weight: 25,
    duration: 8,
    videoLink: "https://www.youtube.com/watch?v=overhead_press_video_link",
  },
  {
    id: 8,
    category: "Cardio",
    workoutName: "Running",
    sets: 1,
    reps: 1,
    weight: 0,
    duration: 20,
    videoLink: "https://www.youtube.com/watch?v=running_video_link",
  },
];

const TutorialList = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handlePageChange = (event, value) => setPage(value);

  const filteredWorkouts = workoutsData.filter((workout) => {
    return (
      workout.workoutName.toLowerCase().includes(search.toLowerCase()) &&
      (category ? workout.category === category : true)
    );
  });

  const itemsPerPage = 4;
  const displayedWorkouts = filteredWorkouts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search Workouts"
        value={search}
        onChange={handleSearchChange}
      />
      <Select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="Legs">Legs</option>
        <option value="Abs">Abs</option>
        <option value="Arms">Arms</option>
        <option value="Chest">Chest</option>
        <option value="Back">Back</option>
        <option value="Shoulders">Shoulders</option>
        <option value="Cardio">Cardio</option>
      </Select>
      <Grid>
        {displayedWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            showDemo={true}
          />
        ))}
      </Grid>
      <PaginationContainer>
        {Array.from({ length: Math.ceil(filteredWorkouts.length / itemsPerPage) }, (_, i) => (
          <PageButton
            key={i + 1}
            active={page === i + 1}
            onClick={() => handlePageChange(null, i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
      </PaginationContainer>
    </Container>
  );
};

export default TutorialList;
