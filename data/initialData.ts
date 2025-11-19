import { WorkoutSession, ExerciseDefinition } from '../types';

// Helper for generating IDs
const genId = (idx: number) => `session-${idx}`;

// Parsed from user data
export const INITIAL_WORKOUTS: WorkoutSession[] = [
  {
    id: genId(1),
    date: '2020-09-25T10:00:00Z',
    title: 'Arms, Shoulders, Tricep, Abs',
    exercises: [
      { exerciseName: 'Leg up (bend knees)', sets: [], notes: 'X' },
      { exerciseName: 'Curling machine', sets: [{reps: 7, weight: 10}, {reps: 7, weight: 10}, {reps: 8, weight: 10}] },
      { exerciseName: 'Delts Machine', sets: [{reps: 18, weight: 40}, {reps: 11, weight: 45}, {reps: 10, weight: 45}] },
      { exerciseName: 'Cable pushdown', sets: [{reps: 14, weight: 45}, {reps: 9, weight: 45}] },
      { exerciseName: 'Cable curles', sets: [], notes: 'X' },
      { exerciseName: 'Cable behind the head puah up', sets: [{reps: 11, weight: 17.5}, {reps: 12, weight: 17.5}] },
      { exerciseName: 'Run', sets: [], notes: 'X' }
    ]
  },
  {
    id: genId(2),
    date: '2025-10-25T10:00:00Z', 
    title: 'Chest - Back',
    exercises: [
      { exerciseName: 'Pull-up', sets: [{reps: 12, weight: 0}, {reps: 6, weight: 0}, {reps: 7, weight: 0}] },
      { exerciseName: 'Chest press dumbbell', sets: [{reps: 15, weight: 16}, {reps: 7, weight: 24}], notes: '30 degrees' },
      { exerciseName: 'Pull down cable wide grib', sets: [], notes: 'X' },
      { exerciseName: 'Machine Fly', sets: [{reps: 11, weight: 35}] },
      { exerciseName: 'Vertical row cable (Pulley close grib)', sets: [{reps: 12, weight: 35}] },
      { exerciseName: 'Roman seat', sets: [{reps: 31, weight: 0}] }
    ]
  },
  {
    id: genId(3),
    date: '2026-09-25T10:00:00Z', // Preserving user date 25/9/26
    title: 'Arms, Shoulders, Tricep, Abs',
    exercises: [
      { exerciseName: 'Chin ups', sets: [{reps: 7, weight: 0}] },
      { exerciseName: 'Leg up (bend knees)', sets: [], notes: 'X' },
      { exerciseName: 'Curling machine', sets: [{reps: 7, weight: 10}, {reps: 6, weight: 10}, {reps: 8, weight: 10}] },
      { exerciseName: 'Delts Machine', sets: [{reps: 14, weight: 45}, {reps: 13, weight: 45}, {reps: 11, weight: 45}], notes: 'superset' },
      { exerciseName: 'Cable pushdown', sets: [{reps: 10, weight: 50}, {reps: 11, weight: 45}] },
      { exerciseName: 'Cable curles', sets: [{reps: 12, weight: 12.5}, {reps: 8, weight: 12.5}] },
      { exerciseName: 'Cable behind the head puah up', sets: [], notes: 'X' },
      { exerciseName: 'Run', sets: [], notes: 'X' }
    ]
  },
  {
    id: genId(4),
    date: '2023-11-30T10:00:00Z', // 31/11/23 adjusted to valid date
    title: 'Shoulder, Bicep, Tricep',
    exercises: [
      { exerciseName: 'Shoulder press machine', sets: [{reps: 15, weight: 30}, {reps: 10, weight: 40}, {reps: 9, weight: 45}] },
      { exerciseName: 'Side delts dumbbells', sets: [{reps: 15, weight: 8}, {reps: 8, weight: 12}, {reps: 10, weight: 10}], notes: 'Dropset 12 to 4' },
      { exerciseName: 'Reverse flys machine', sets: [{reps: 15, weight: 15}, {reps: 9, weight: 25}, {reps: 8, weight: 25}] },
      { exerciseName: 'Lower caples triceps', sets: [{reps: 15, weight: 30}, {reps: 10, weight: 40}, {reps: 12, weight: 35}] },
      { exerciseName: 'Caples cruels suprate hands', sets: [{reps: 15, weight: 20}, {reps: 9, weight: 25}, {reps: 11, weight: 25}] },
      { exerciseName: 'Overhead tricep dumbbells setting', sets: [{reps: 8, weight: 12}, {reps: 9, weight: 12}] },
      { exerciseName: 'Curling machine', sets: [{reps: 10, weight: 30}, {reps: 11, weight: 30}] }
    ]
  },
  {
    id: genId(5),
    date: '2023-12-04T10:00:00Z',
    title: 'Shoulder, Bicep, Traps',
    exercises: [
        { exerciseName: 'Shoulder press machine', sets: [{reps: 15, weight: 35}, {reps: 8, weight: 45}, {reps: 8, weight: 45}] },
        { exerciseName: 'Caples cruels suprate hands', sets: [{reps: 8, weight: 30}, {reps: 8, weight: 30}, {reps: 11, weight: 25}] },
        { exerciseName: 'Side delts dumbbells', sets: [{reps: 15, weight: 10}, {reps: 10, weight: 12}, {reps: 12, weight: 12}] },
        { exerciseName: 'Curling machine', sets: [{reps: 10, weight: 30}, {reps: 7, weight: 35}, {reps: 8, weight: 35}] },
        { exerciseName: 'Traps machine', sets: [{reps: 25, weight: 40}, {reps: 25, weight: 60}] }
    ]
  },
  {
    id: genId(6),
    date: '2023-12-06T10:00:00Z',
    title: 'Chest, Back, Legs',
    exercises: [
        { exerciseName: 'Pull ups (wide)', sets: [{reps: 9, weight: 0}, {reps: 9, weight: 0}, {reps: 8, weight: 0}] },
        { exerciseName: 'Chest press barbell', sets: [{reps: 6, weight: 50}, {reps: 7, weight: 50}, {reps: 6, weight: 50}] },
        { exerciseName: 'Deadlift', sets: [{reps: 10, weight: 60}, {reps: 11, weight: 70}, {reps: 11, weight: 70}] },
        { exerciseName: 'Fly machine', sets: [{reps: 6, weight: 40}, {reps: 6, weight: 40}] },
        { exerciseName: 'Squat machine', sets: [{reps: 6, weight: 60}, {reps: 6, weight: 70}] },
        { exerciseName: 'Pulley row', sets: [{reps: 15, weight: 30}, {reps: 10, weight: 45}, {reps: 8, weight: 45}] }
    ]
  },
  {
    id: genId(7),
    date: '2024-01-06T10:00:00Z',
    title: 'Shoulders, Bicep, Tricep',
    exercises: [
        { exerciseName: 'Standing barbell shoulders press', sets: [{reps: 17, weight: 30}, {reps: 7, weight: 40}, {reps: 8, weight: 40}] },
        { exerciseName: 'Dumbbells lateral raise', sets: [{reps: 13, weight: 8}, {reps: 7, weight: 10}, {reps: 8, weight: 10}], notes: 'Superset 7x8kg, 9x4kg' },
        { exerciseName: 'Caples cruels suprate hands', sets: [{reps: 10, weight: 25}, {reps: 10, weight: 25}, {reps: 7, weight: 25}], notes: 'Superset 7x15kg' },
        { exerciseName: 'Overhead tricep one hand dumbbells', sets: [{reps: 11, weight: 12}, {reps: 11, weight: 12}, {reps: 6, weight: 12}] },
        { exerciseName: 'Curling machine', sets: [{reps: 6, weight: 40}, {reps: 5, weight: 40}] }
    ]
  },
  {
    id: genId(8),
    date: '2024-01-07T10:00:00Z',
    title: 'Chest, Back',
    exercises: [
        { exerciseName: 'Pull ups (wide)', sets: [{reps: 9, weight: 0}, {reps: 8, weight: 0}, {reps: 6, weight: 0}] },
        { exerciseName: 'Chest press dumbbells (incline) 30', sets: [{reps: 11, weight: 18}, {reps: 9, weight: 18}, {reps: 10, weight: 18}] },
        { exerciseName: 'Reverse flys machine', sets: [{reps: 11, weight: 30}, {reps: 10, weight: 30}, {reps: 11, weight: 30}, {reps: 5, weight: 40}] },
        { exerciseName: 'Pulley row', sets: [{reps: 8, weight: 45}, {reps: 10, weight: 45}] },
        { exerciseName: 'Squat smith machine', sets: [{reps: 21, weight: 30}, {reps: 10, weight: 50}] }
    ]
  },
  {
    id: genId(9),
    date: '2024-01-14T10:00:00Z',
    title: 'Shoulders, Bicep, Tricep',
    exercises: [
        { exerciseName: 'Standing barbell shoulders press', sets: [{reps: 19, weight: 30}, {reps: 6, weight: 40}, {reps: 8, weight: 40}] },
        { exerciseName: 'Dumbbells lateral raise', sets: [{reps: 13, weight: 8}, {reps: 7, weight: 10}, {reps: 9, weight: 10}], notes: 'Superset 7x8kg, 7x6kg' },
        { exerciseName: 'Caples cruels suprate hands', sets: [{reps: 11, weight: 25}, {reps: 6, weight: 30}, {reps: 7, weight: 25}] },
        { exerciseName: 'Overhead tricep one hand dumbbells', sets: [{reps: 12, weight: 12}, {reps: 11, weight: 12}, {reps: 6, weight: 12}] },
        { exerciseName: 'Curling machine', sets: [{reps: 7, weight: 40}] }
    ]
  },
  {
    id: genId(10),
    date: '2024-01-21T10:00:00Z',
    title: 'Shoulders, Bicep, Tricep',
    exercises: [
        { exerciseName: 'Deltoid press circular', sets: [{reps: 9, weight: 40}, {reps: 8, weight: 40}, {reps: 8, weight: 40}] },
        { exerciseName: 'Curling machine', sets: [{reps: 9, weight: 35}, {reps: 6, weight: 40}, {reps: 5, weight: 40}], notes: 'Superset' },
        { exerciseName: 'Dumbbells lateral raise', sets: [{reps: 15, weight: 8}, {reps: 12, weight: 10}, {reps: 14, weight: 10}] },
        { exerciseName: 'Overhead tricep one hand dumbbells', sets: [{reps: 12, weight: 12}, {reps: 8, weight: 12}, {reps: 8, weight: 12}] },
        { exerciseName: 'Squat smith machine', sets: [{reps: 15, weight: 60}, {reps: 10, weight: 80}], notes: 'Start higher than 60 next time' }
    ]
  },
  {
    id: genId(11),
    date: '2024-05-28T10:00:00Z',
    title: 'Shoulders, Bicep',
    exercises: [
        { exerciseName: 'Shoulders press standing barbell', sets: [{reps: 15, weight: 35}, {reps: 8, weight: 45}] },
        { exerciseName: 'Curling machine', sets: [{reps: 7, weight: 26}, {reps: 6, weight: 26}, {reps: 10, weight: 21}], notes: 'Combined weights' },
        { exerciseName: 'Dumbbells lateral raise', sets: [{reps: 15, weight: 7.5}, {reps: 12, weight: 10}, {reps: 14, weight: 10}] },
        { exerciseName: 'Abs legs (free weights)', sets: [{reps: 21, weight: 0}] },
        { exerciseName: 'Abs machine', sets: [{reps: 17, weight: 20}] }
    ]
  },
  {
    id: genId(12),
    date: '2024-07-08T10:00:00Z',
    title: 'Chest, Back, Leg',
    exercises: [
        { exerciseName: 'Dead hang', sets: [], notes: '1:11 sec' },
        { exerciseName: 'Incline chest press (smith machine)', sets: [{reps: 6, weight: 57}, {reps: 7, weight: 57}, {reps: 8, weight: 57}] },
        { exerciseName: 'Pull down machine', sets: [{reps: 7, weight: 70}, {reps: 7, weight: 70}, {reps: 5, weight: 80}] },
        { exerciseName: 'Machine Fly', sets: [{reps: 9, weight: 55}, {reps: 8, weight: 55}, {reps: 6, weight: 55}] },
        { exerciseName: 'Vertical row cable', sets: [{reps: 9, weight: 60}, {reps: 6, weight: 70}, {reps: 8, weight: 60}] },
        { exerciseName: 'Squat smith machine', sets: [{reps: 11, weight: 42}, {reps: 10, weight: 52}, {reps: 7, weight: 52}] }
    ]
  },
  {
    id: genId(13),
    date: '2024-08-25T10:00:00Z',
    title: 'Chest, Back',
    exercises: [
        { exerciseName: 'Dead hang', sets: [], notes: '1:15' },
        { exerciseName: 'Incline chest press (smith machine)', sets: [{reps: 9, weight: 52}, {reps: 7, weight: 64}, {reps: 6, weight: 64}] },
        { exerciseName: 'Pull down closs grib cable', sets: [{reps: 11, weight: 70}, {reps: 10, weight: 70}, {reps: 8, weight: 70}] },
        { exerciseName: 'Dumbbell Fly', sets: [{reps: 15, weight: 12.5}, {reps: 12, weight: 12.5}] },
        { exerciseName: 'Vertical row wide grib machine', sets: [{reps: 14, weight: 41}, {reps: 7, weight: 51}, {reps: 7, weight: 51}], notes: 'Partial on last set' },
        { exerciseName: 'Roman seat', sets: [{reps: 31, weight: 0}] }
    ]
  },
  {
    id: genId(14),
    date: '2024-11-23T10:00:00Z',
    title: 'Shoulders, Bicep, Tricep',
    exercises: [
        { exerciseName: 'Machine curl partial', sets: [{reps: 16, weight: 25}, {reps: 20, weight: 25}, {reps: 24, weight: 30}] },
        { exerciseName: 'Dumbbells lateral raise', sets: [{reps: 22, weight: 12.5}, {reps: 15, weight: 15}, {reps: 15, weight: 15}], notes: 'Superset' },
        { exerciseName: 'Behind the head tricep (1dumbbell)', sets: [{reps: 17, weight: 30}, {reps: 17, weight: 30}, {reps: 10, weight: 30}] },
        { exerciseName: 'Abs machine', sets: [{reps: 15, weight: 22}, {reps: 11, weight: 22}] },
        { exerciseName: 'Abs legs', sets: [{reps: 25, weight: 0}] }
    ]
  },
  {
    id: genId(15),
    date: '2025-01-18T10:00:00Z',
    title: 'Chest - Back',
    exercises: [
        { exerciseName: 'Pull-up', sets: [{reps: 8, weight: 0}, {reps: 6, weight: 0}] },
        { exerciseName: 'Chest press dumbbell', sets: [{reps: 17, weight: 16}, {reps: 15, weight: 18}], notes: '15 degrees' },
        { exerciseName: 'Pull down cable', sets: [{reps: 11, weight: 50}, {reps: 10, weight: 50}] },
        { exerciseName: 'Machine Fly', sets: [{reps: 11, weight: 30}, {reps: 9, weight: 30}] },
        { exerciseName: 'Vertical row cable (Pulley)', sets: [{reps: 17, weight: 25}] },
        { exerciseName: 'Roman seat', sets: [], notes: 'X' }
    ]
  },
  {
    id: genId(16),
    date: '2025-01-30T10:00:00Z',
    title: 'Arms, Shoulders, Tricep',
    exercises: [
        { exerciseName: 'Pull up', sets: [{reps: 8, weight: 0}] },
        { exerciseName: 'Curling machine', sets: [{reps: 9, weight: 10}, {reps: 8, weight: 10}] },
        { exerciseName: 'Dumbbells lateral raises', sets: [{reps: 17, weight: 12}, {reps: 14, weight: 14}, {reps: 20, weight: 12}] },
        { exerciseName: 'Behind the head tricep dumbbell', sets: [{reps: 13, weight: 20}] },
        { exerciseName: 'Front forearm cable', sets: [{reps: 31, weight: 17.5}] },
        { exerciseName: 'Back forearm cable', sets: [{reps: 21, weight: 22.5}] },
        { exerciseName: 'Total abdominal machine', sets: [{reps: 21, weight: 45}] }
    ]
  },
  {
    id: genId(17),
    date: '2025-02-04T10:00:00Z',
    title: 'Chest - Back',
    exercises: [
        { exerciseName: 'Pull-up', sets: [{reps: 11, weight: 0}, {reps: 9, weight: 0}] },
        { exerciseName: 'Chest press dumbbell', sets: [{reps: 25, weight: 14}, {reps: 6, weight: 24}, {reps: 5, weight: 24}], notes: '15 degrees' },
        { exerciseName: 'Pull down cable', sets: [{reps: 13, weight: 55}, {reps: 10, weight: 55}, {reps: 8, weight: 55}] },
        { exerciseName: 'Machine Fly', sets: [{reps: 17, weight: 30}, {reps: 11, weight: 35}] },
        { exerciseName: 'Vertical row cable (Pulley)', sets: [{reps: 10, weight: 40}, {reps: 11, weight: 40}] },
        { exerciseName: 'Running', sets: [], notes: '11.1 km, 8.30 speed, 8 min' }
    ]
  },
  {
    id: genId(18),
    date: '2025-02-08T10:00:00Z',
    title: 'Arms, Shoulders, Tricep, Leg, Abs',
    exercises: [
        { exerciseName: 'Pull up', sets: [{reps: 11, weight: 0}] },
        { exerciseName: 'Curling machine', sets: [{reps: 14, weight: 10}, {reps: 8, weight: 10}, {reps: 8, weight: 10}] },
        { exerciseName: 'Dumbbells lateral raises', sets: [{reps: 26, weight: 14}, {reps: 17, weight: 16}, {reps: 17, weight: 16}] },
        { exerciseName: 'Cable curles', sets: [{reps: 9, weight: 25}, {reps: 11, weight: 20}, {reps: 7, weight: 25}] },
        { exerciseName: 'Cable pushdown', sets: [{reps: 15, weight: 40}, {reps: 9, weight: 45}, {reps: 11, weight: 45}] },
        { exerciseName: 'Front forearm cable', sets: [{reps: 18, weight: 20}, {reps: 21, weight: 20}] },
        { exerciseName: 'Back forearm cable', sets: [{reps: 16, weight: 20}, {reps: 31, weight: 20}] },
        { exerciseName: 'Total abdominal machine', sets: [{reps: 21, weight: 55}, {reps: 27, weight: 55}] },
        { exerciseName: 'Abd', sets: [{reps: 30, weight: 10}] },
        { exerciseName: 'Smith machine squad', sets: [{reps: 15, weight: 45}] }
    ]
  },
  {
    id: genId(19),
    date: '2025-07-31T10:00:00Z',
    title: 'Chest - Back',
    exercises: [
        { exerciseName: 'Pull-up', sets: [], notes: 'X' },
        { exerciseName: 'Chest press dumbbell', sets: [{reps: 11, weight: 20}, {reps: 11, weight: 20}, {reps: 8, weight: 20}], notes: '15 degrees' },
        { exerciseName: 'Pull down cable wide grib', sets: [{reps: 16, weight: 50}, {reps: 10, weight: 55}] },
        { exerciseName: 'Machine Fly', sets: [{reps: 8, weight: 35}] },
        { exerciseName: 'Vertical row cable (Pulley close grib)', sets: [{reps: 15, weight: 35}, {reps: 9, weight: 40}] },
        { exerciseName: 'Cable front forearm', sets: [{reps: 10, weight: 15}, {reps: 9, weight: 15}] },
        { exerciseName: 'Cable back forearm', sets: [{reps: 11, weight: 30}] },
        { exerciseName: 'Roman seat', sets: [{reps: 41, weight: 0}] }
    ]
  },
  {
    id: genId(20),
    date: '2025-08-04T10:00:00Z',
    title: 'Chest - Abs - Forearms - Shoulders',
    exercises: [
        { exerciseName: 'Chest press dumbbell', sets: [{reps: 11, weight: 20}, {reps: 9, weight: 20}, {reps: 8, weight: 20}], notes: '15 degrees' },
        { exerciseName: 'Total abdominal machine', sets: [{reps: 31, weight: 40}, {reps: 21, weight: 45}, {reps: 21, weight: 50}] },
        { exerciseName: 'Delts Machine', sets: [{reps: 12, weight: 40}, {reps: 11, weight: 40}], notes: 'Superset' },
        { exerciseName: 'Cable front forearm (two hands)', sets: [{reps: 25, weight: 35}, {reps: 15, weight: 40}] },
        { exerciseName: 'Cable back forearm', sets: [{reps: 21, weight: 30}, {reps: 10, weight: 35}] }
    ]
  },
  {
    id: genId(21),
    date: '2025-08-11T10:00:00Z',
    title: 'Arms, Shoulders, Tricep, Abs',
    exercises: [
        { exerciseName: 'Curling machine', sets: [{reps: 12, weight: 10}, {reps: 9, weight: 10}] },
        { exerciseName: 'Delts Machine', sets: [{reps: 22, weight: 40}, {reps: 13, weight: 45}, {reps: 11, weight: 45}] },
        { exerciseName: 'Cable pushdown', sets: [{reps: 14, weight: 45}, {reps: 9, weight: 45}] },
        { exerciseName: 'Cable curles', sets: [{reps: 8, weight: 30}, {reps: 8, weight: 30}] },
        { exerciseName: 'Cable behind the head puah up', sets: [{reps: 15, weight: 17.5}, {reps: 10, weight: 20}] }
    ]
  },
  {
    id: genId(22),
    date: '2025-08-29T10:00:00Z',
    title: 'Arms, Shoulders, Tricep, Abs',
    exercises: [
        { exerciseName: 'Curling machine', sets: [{reps: 10, weight: 10}, {reps: 8, weight: 10}] },
        { exerciseName: 'Face pulls cable', sets: [{reps: 15, weight: 20}, {reps: 15, weight: 20}] },
        { exerciseName: 'Delts Machine', sets: [{reps: 15, weight: 45}, {reps: 13, weight: 45}], notes: 'Superset' },
        { exerciseName: 'Cable pushdown', sets: [{reps: 12, weight: 45}, {reps: 9, weight: 45}] },
        { exerciseName: 'Cable curles', sets: [{reps: 14, weight: 12.5}] }
    ]
  },
  {
    id: genId(23),
    date: '2025-08-30T10:00:00Z',
    title: 'Chest - Back',
    exercises: [
        { exerciseName: 'Pull-up', sets: [{reps: 12, weight: 0}] },
        { exerciseName: 'Chest press dumbbell', sets: [{reps: 6, weight: 22}, {reps: 9, weight: 22}], notes: '30 degrees' },
        { exerciseName: 'Pull down cable wide grib', sets: [{reps: 14, weight: 50}, {reps: 10, weight: 50}] },
        { exerciseName: 'Machine Fly', sets: [{reps: 16, weight: 25}, {reps: 10, weight: 30}] }
    ]
  }
];

export const AVAILABLE_EXERCISES: ExerciseDefinition[] = [
  { name: 'Chest press dumbbell', muscleGroup: 'Chest' },
  { name: 'Pull-up', muscleGroup: 'Back' },
  { name: 'Curling machine', muscleGroup: 'Biceps' },
  { name: 'Delts Machine', muscleGroup: 'Shoulders' },
  { name: 'Cable pushdown', muscleGroup: 'Triceps' },
  { name: 'Cable curles', muscleGroup: 'Biceps' },
  { name: 'Cable behind the head puah up', muscleGroup: 'Triceps' },
  { name: 'Machine Fly', muscleGroup: 'Chest' },
  { name: 'Vertical row cable', muscleGroup: 'Back' },
  { name: 'Roman seat', muscleGroup: 'Back/Abs' },
  { name: 'Chin ups', muscleGroup: 'Back/Biceps' },
  { name: 'Shoulder press machine', muscleGroup: 'Shoulders' },
  { name: 'Dumbbells lateral raise', muscleGroup: 'Shoulders' },
  { name: 'Squat smith machine', muscleGroup: 'Legs' },
  { name: 'Deadlift', muscleGroup: 'Back/Legs' },
  { name: 'Total abdominal machine', muscleGroup: 'Abs' },
  { name: 'Front forearm cable', muscleGroup: 'Forearms' },
  { name: 'Back forearm cable', muscleGroup: 'Forearms' },
];