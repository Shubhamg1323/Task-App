import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';

interface Exercise {
  id: number;
  name: string;
  completed: boolean;
}

interface Workout {
  name: string;
  exercises: Exercise[];
}

const workoutData: { [key: string]: Workout } = {
  'Chest': {
    name: 'Chest',
    exercises: [
      { id: 1, name: 'Bench Press', completed: false },
      { id: 2, name: 'Decline Press', completed: false },
      { id: 3, name: 'Seated Bench Press', completed: false },
      { id: 4, name: 'Incline Dumbbell Press', completed: false },
      { id: 5, name: 'Cable Chest Flys', completed: false },
      { id: 6, name: 'Pec Deck Flys', completed: false },
      { id: 7, name: 'Lever Chest Press', completed: false },
      { id: 8, name: 'Pushups', completed: false },
    ],
  },
  'Back and Core': {
    name: 'Back and Core',
    exercises: [
      { id: 1, name: 'Deadlifts', completed: false },
      { id: 2, name: 'Pull-Ups', completed: false },
      { id: 3, name: 'Bent-Over Rows', completed: false },
      { id: 4, name: 'T-Bar Rows', completed: false },
      { id: 5, name: 'Seated Cable Rows', completed: false },
      { id: 6, name: 'Lat Pulldowns', completed: false },
      { id: 7, name: 'Crunches', completed: false },
      { id: 8, name: 'Russian Twists', completed: false },
    ],
  },
  'Shoulders and Traps': {
    name: 'Shoulders and Traps',
    exercises: [
      { id: 1, name: 'Overhead Press', completed: false },
      { id: 2, name: 'Arnold Press', completed: false },
      { id: 3, name: 'Lateral Raises', completed: false },
      { id: 4, name: 'Front Raises', completed: false },
      { id: 5, 'name': 'Upright Rows', completed: false },
      { id: 6, name: 'Shrugs', completed: false },
      { id: 7, name: 'Face Pulls', completed: false },
      { id: 8, name: 'Reverse Pec-Deck', completed: false },
    ],
  },
  'Legs': {
    name: 'Legs',
    exercises: [
      { id: 1, name: 'Squats', completed: false },
      { id: 2, name: 'Leg Press', completed: false },
      { id: 3, name: 'Romanian Deadlifts', completed: false },
      { id: 4, name: 'Leg Curls', completed: false },
      { id: 5, name: 'Leg Extensions', completed: false },
      { id: 6, name: 'Calf Raises', completed: false },
      { id: 7, name: 'Lunges', completed: false },
      { id: 8, name: 'Glute Bridges', completed: false },
    ],
  },
  'Arms': {
    name: 'Arms',
    exercises: [
      { id: 1, name: 'Barbell Bicep Curls', completed: false },
      { id: 2, name: 'Dumbbell Bicep Curls', completed: false },
      { id: 3, name: 'Preacher Curls', completed: false },
      { id: 4, name: 'Hammer Curls', completed: false },
      { id: 5, name: 'Tricep Dips', completed: false },
      { id: 6, name: 'Tricep Pushdowns', completed: false },
      { id: 7, name: 'Skull Crushers', completed: false },
      { id: 8, name: 'Overhead Tricep Extensions', completed: false },
    ],
  },
  'Cardio': {
    name: 'Cardio',
    exercises: [
        { id: 1, name: 'Running', completed: false },
        { id: 2, name: 'Cycling', completed: false },
        { id: 3, name: 'Swimming', completed: false },
        { id: 4, name: 'Rowing', completed: false },
        { id: 5, name: 'Jumping Jacks', completed: false },
        { id: 6, name: 'Burpees', completed: false },
        { id: 7, name: 'High Knees', completed: false },
        { id: 8, name: 'Mountain Climbers', completed: false },
    ],
  },
  'Rest Day': {
    name: 'Rest Day',
    exercises: [],
  },
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const GymWorkoutList: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedDay, setSelectedDay] = useState(days[new Date().getDay()]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>(workoutData['Chest']);
  const [exercises, setExercises] = useState<Exercise[]>(selectedWorkout.exercises);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setSelectedDate(e.target.value);
    setSelectedDay(days[date.getDay()]);
  };

  const handleWorkoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const workout = workoutData[e.target.value];
    setSelectedWorkout(workout);
    setExercises(workout.exercises.map(ex => ({...ex, completed: false})));
  };

  const toggleExercise = (exerciseId: number) => {
    setExercises(
      exercises.map(ex =>
        ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
      )
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gym Workout List</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="date-select" className="form-label">Date:</label>
          <input type="date" id="date-select" className="form-control" value={selectedDate} onChange={handleDateChange} />
        </div>
        <div className="col-md-4">
          <label htmlFor="day-select" className="form-label">Day:</label>
          <input type="text" id="day-select" className="form-control" value={selectedDay} disabled />
        </div>
        <div className="col-md-4">
          <label htmlFor="workout-select" className="form-label">Workout:</label>
          <select id="workout-select" className="form-select" value={selectedWorkout.name} onChange={handleWorkoutChange}>
            {Object.keys(workoutData).map(workoutName => (
              <option key={workoutName} value={workoutName}>{workoutName}</option>
            ))}
          </select>
        </div>
      </div>
      {exercises.length > 0 ? (
        <ul className="list-group">
          {exercises.map(exercise => (
            <li
              key={exercise.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span className={exercise.completed ? 'text-decoration-line-through' : ''}>
                {exercise.name}
              </span>
              <button
                className={`btn btn-sm ${exercise.completed ? 'btn-success' : 'btn-warning'}`}
                onClick={() => toggleExercise(exercise.id)}
              >
                {exercise.completed ? 'Done' : 'Pending'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Rest day! No exercises planned.</p>
      )}
    </div>
  );
};

export default GymWorkoutList;