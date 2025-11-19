export interface ExerciseSet {
  reps: number;
  weight: number;
  isSuperset?: boolean;
}

export interface ExerciseLog {
  exerciseName: string;
  sets: ExerciseSet[];
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  date: string; // ISO String
  title: string; // e.g. "Arms, Shoulders"
  exercises: ExerciseLog[];
}

export interface ExerciseDefinition {
  name: string;
  muscleGroup: string;
}

// For chart data
export interface ProgressDataPoint {
  date: string;
  volume: number; // weight * reps
  maxWeight: number;
}
