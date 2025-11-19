import { GoogleGenAI } from "@google/genai";
import { WorkoutSession } from '../types';

const apiKey = process.env.API_KEY || '';

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey });

export const generateWeeklyAnalysis = async (workouts: WorkoutSession[]): Promise<string> => {
  if (!workouts || workouts.length === 0) {
    return "No workouts found for this week to analyze. Go lift some weights!";
  }

  // Prepare data for the model
  const workoutSummary = workouts.map(w => {
    return `Date: ${new Date(w.date).toLocaleDateString()}
    Focus: ${w.title}
    Exercises:
    ${w.exercises.map(e => 
      `- ${e.exerciseName}: ${e.sets.map(s => `${s.reps}x${s.weight}kg`).join(', ')}`
    ).join('\n')}`;
  }).join('\n\n');

  const prompt = `
    You are an expert fitness coach. Analyze the following workout logs for my week.
    Identify progressive overload, volume changes, and intensity.
    
    Give me a "Weekly Overview" that includes:
    1. A brief motivational summary.
    2. Key achievements (e.g., "You increased your chest press weight by 5kg").
    3. Suggestions for next week (e.g., "Focus more on form for squats" or "Volume on shoulders is high, good job").
    
    Keep it concise, encouraging, and professional. Use Markdown formatting.
    
    Workouts:
    ${workoutSummary}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Could not generate analysis.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Sorry, I couldn't reach the AI coach right now. Please check your connection or API key.";
  }
};

export const suggestNextWorkout = async (recentWorkouts: WorkoutSession[]): Promise<string> => {
    // Simple suggestion based on history
    const prompt = `Based on these recent workouts, suggest a plan for my next gym session (Body parts and 3-4 key exercises).
    
    Recent History:
    ${recentWorkouts.slice(-3).map(w => `${w.date}: ${w.title}`).join('\n')}
    
    Keep it short.`;

    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        return response.text || "Rest day might be good!";
      } catch (error) {
        return "Plan a Balanced session!";
      }
}
