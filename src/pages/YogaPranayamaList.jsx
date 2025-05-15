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

const yogaPranayamaData = [
  // Yoga Poses
  {
    id: 1,
    category: "Yoga",
    workoutName: "Downward Dog",
    sets: 1,
    reps: 1,
    weight: 0,
    duration: 5,
    videoLink: "https://www.youtube.com/watch?v=0FxCna7mvtQ",
  },
  {
    id: 2,
    category: "Yoga",
    workoutName: "Plank",
    sets: 3,
    reps: 60,
    weight: 0,
    duration: 5,
    videoLink: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
  },
  {
    id: 3,
    category: "Yoga",
    workoutName: "Tree Pose",
    sets: 2,
    reps: 1,
    weight: 0,
    duration: 2,
    videoLink: "https://www.youtube.com/watch?v=Ev6yE55kYGw",
  },
  // Add more yoga poses
  {
    id: 4,
    category: "Yoga",
    workoutName: "Cobra Pose",
    sets: 2,
    reps: 1,
    weight: 0,
    duration: 3,
    videoLink: "https://www.youtube.com/watch?v=s6zA0BxUQsw",
  },
  {
    id: 5,
    category: "Yoga",
    workoutName: "Warrior Pose",
    sets: 2,
    reps: 1,
    weight: 0,
    duration: 4,
    videoLink: "https://www.youtube.com/watch?v=0fwn7apT5vI",
  },
  {
    id: 6,
    category: "Yoga",
    workoutName: "Child's Pose",
    sets: 1,
    reps: 1,
    weight: 0,
    duration: 3,
    videoLink: "https://www.youtube.com/watch?v=ZzzmTka14ww",
  },
  {
    id: 7,
    category: "Yoga",
    workoutName: "Boat Pose",
    sets: 3,
    reps: 30,
    weight: 0,
    duration: 2,
    videoLink: "https://www.youtube.com/watch?v=Hn5-MsI0Y3k",
  },
  {
    id: 8,
    category: "Yoga",
    workoutName: "Corpse Pose",
    sets: 1,
    reps: 1,
    weight: 0,
    duration: 10,
    videoLink: "https://www.youtube.com/watch?v=tx2kTMnNN2Y",
  },
  {
    id: 9,
    category: "Yoga",
    workoutName: "Chair Pose",
    sets: 3,
    reps: 30,
    weight: 0,
    duration: 2,
    videoLink: "https://www.youtube.com/watch?v=bOqHcQvNfb8",
  },
  {
    id: 10,
    category: "Yoga",
    workoutName: "Seated Forward Bend",
    sets: 1,
    reps: 1,
    weight: 0,
    duration: 4,
    videoLink: "https://www.youtube.com/watch?v=1XcVFhgz51E",
  },
  // Pranayama Exercises
  {
    id: 11,
    category: "Pranayama",
    workoutName: "Anulom Vilom",
    sets: 1,
    reps: 10,
    weight: 0,
    duration: 10,
    videoLink: "https://www.youtube.com/watch?v=VnuhGh8mOik",
  },
  {
    id: 12,
    category: "Pranayama",
    workoutName: "Bhastrika",
    sets: 1,
    reps: 10,
    weight: 0,
    duration: 10,
    videoLink: "https://www.youtube.com/watch?v=ajNw85T7fco",
  },
  {
    id: 13,
    category: "Pranayama",
    workoutName: "Kapalbhati",
    sets: 1,
    reps: 30,
    weight: 0,
    duration: 15,
    videoLink: "https://www.youtube.com/watch?v=82oKxAtTsuk",
  },
  {
    id: 14,
    category: "Pranayama",
    workoutName: "Bhramari",
    sets: 1,
    reps: 10,
    weight: 0,
    duration: 8,
    videoLink: "https://www.youtube.com/watch?v=9erTkm0-jrY",
  },
  {
    id: 15,
    category: "Pranayama",
    workoutName: "Ujjayi",
    sets: 1,
    reps: 10,
    weight: 0,
    duration: 8,
    videoLink: "https://www.youtube.com/watch?v=Pm57eD4NKSk",
  },
];

const YogaPranayamaList = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handlePageChange = (event, value) => setPage(value);

  const filteredData = yogaPranayamaData.filter((item) => {
    return (
      item.workoutName.toLowerCase().includes(search.toLowerCase()) &&
      (category ? item.category === category : true)
    );
  });

  const itemsPerPage = 4;
  const displayedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search Yoga/Pranayama"
        value={search}
        onChange={handleSearchChange}
      />
      <Select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="Yoga">Yoga</option>
        <option value="Pranayama">Pranayama</option>
      </Select>
      <Grid>
        {displayedData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <WorkoutCard
              workout={item}
              showDemo={true}
            />
          </Grid>
        ))}
      </Grid>
      <PaginationContainer>
        <PageButton
          active={page === 1}
          onClick={() => handlePageChange(null, 1)}
        >
          1
        </PageButton>
        <PageButton
          active={page === 2}
          onClick={() => handlePageChange(null, 2)}
        >
          2
        </PageButton>
        <PageButton
          active={page === 3}
          onClick={() => handlePageChange(null, 3)}
        >
          3
        </PageButton>
      </PaginationContainer>
    </Container>
  );
};

export default YogaPranayamaList;
