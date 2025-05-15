
const FireIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 23c-4.97 0-9-4.03-9-9 0-2.39.94-4.68 2.62-6.38L12 1l6.38 6.62C20.06 9.32 21 11.61 21 14c0 4.97-4.03 9-9 9zm0-2c3.86 0 7-3.14 7-7 0-1.28-.35-2.53-1.01-3.64-.66-1.11-1.59-1.98-2.7-2.52L12 6.4l-3.29 1.44c-1.11.54-2.04 1.41-2.7 2.52C5.35 11.47 5 12.72 5 14c0 3.86 3.14 7 7 7z"/>
    <path d="M12 19c-2.76 0-5-2.24-5-5 0-1.86 1.03-3.5 2.67-4.33L12 8.6l2.33 1.07C15.97 10.5 17 12.14 17 14c0 2.76-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"/>
    <path d="M12 15c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </svg>
);

const FitnessIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
    <path d="M12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    <path d="M12 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
    <path d="M15 12c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zM9 12c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z"/>
  </svg>
);

const StatsIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
    <path d="M16 11c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1s-1-.45-1-1v-8c0-.55.45-1 1-1z"/>
    <path d="M12 13c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1v-6c0-.55.45-1 1-1z"/>
    <path d="M8 15c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-.55.45-1 1-1z"/>
  </svg>
);

export const counts = [
  {
    name: "Calories Burned",
    icon: <FireIcon />,
    desc: "Total calories burned today",
    key: "totalCaloriesBurnt",
    unit: "kcal",
    color: "#FF6B6B",
    lightColor: "#FFF0F0",
  },
  {
    name: "Workouts",
    icon: <FitnessIcon />,
    desc: "Total no of workouts for today",
    key: "totalWorkouts",
    unit: "",
    color: "#4D96FF",
    lightColor: "#EDF4FF",
  },
  {
    name: "Average Calories Burned",
    icon: <StatsIcon />,
    desc: "Average Calories Burned on each workout",
    key: "avgCaloriesBurntPerWorkout",
    unit: "kcal",
    color: "#6BCB77",
    lightColor: "#F0FFF0",
  },
];
