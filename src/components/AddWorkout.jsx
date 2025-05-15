import React, { useState } from 'react';
import styled from 'styled-components';
import { addWorkout } from '../api';

const AddWorkoutForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Input = styled.textarea`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  outline: none;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}20;
  }
`;

const Button = styled.button`
  padding: 12px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 14px;
  padding: 10px;
  background: ${({ theme }) => theme.red}15;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const FormatExample = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.primary}10;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  pre {
    margin: 8px 0;
    font-family: monospace;
  }
`;

const AddWorkout = ({ onWorkoutAdded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [workoutString, setWorkoutString] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('Holistic-app-token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      await addWorkout(token, { workoutString });
      setWorkoutString('');
      if (onWorkoutAdded) {
        onWorkoutAdded();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add workout. Please try again.');
      console.error('Add workout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddWorkoutForm onSubmit={handleSubmit}>
      <Title>Add New Workout</Title>
      <FormatExample>
        Format Example:
        <pre>
          #Category<br/>
          WorkoutName<br/>
          3x12<br/>
          20<br/>
          10
        </pre>
        Where: Category = workout category, WorkoutName = name of exercise,<br/>
        3x12 = sets x reps, 20 = weight in kg, 10 = duration in minutes
      </FormatExample>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        placeholder="Enter workout details following the format above..."
        value={workoutString}
        onChange={(e) => setWorkoutString(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Workout'}
      </Button>
    </AddWorkoutForm>
  );
};

export default AddWorkout;
