import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Analytics from './components/Analytics';
import WorkoutLogger from './components/WorkoutLogger';
import AICoach from './components/AICoach';
import WorkoutHistory from './components/WorkoutHistory';
import { WorkoutSession } from './types';
import { INITIAL_WORKOUTS } from './data/initialData';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);

  useEffect(() => {
    // Load from local storage or fall back to initial data
    const stored = localStorage.getItem('ironProgress_workouts');
    if (stored) {
      try {
        setWorkouts(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse workouts", e);
        setWorkouts(INITIAL_WORKOUTS);
      }
    } else {
      setWorkouts(INITIAL_WORKOUTS);
    }
  }, []);

  const updateWorkouts = (newWorkouts: WorkoutSession[]) => {
    setWorkouts(newWorkouts);
    localStorage.setItem('ironProgress_workouts', JSON.stringify(newWorkouts));
  };

  const saveWorkout = (workout: WorkoutSession) => {
    const updated = [...workouts, workout];
    updateWorkouts(updated);
    setActiveTab('dashboard');
  };

  const deleteWorkout = (id: string) => {
    if (window.confirm('Are you sure you want to delete this workout log? This cannot be undone.')) {
      const updated = workouts.filter(w => w.id !== id);
      updateWorkouts(updated);
    }
  };

  const handleImport = (importedWorkouts: WorkoutSession[]) => {
    if (window.confirm('This will merge imported workouts with your current logs. Continue?')) {
      // Simple merge strategy: combine and deduplicate by ID
      const existingIds = new Set(workouts.map(w => w.id));
      const newUnique = importedWorkouts.filter(w => !existingIds.has(w.id));
      const merged = [...workouts, ...newUnique].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      updateWorkouts(merged);
      alert(`Imported ${newUnique.length} new workouts.`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Analytics workouts={workouts} />;
      case 'log':
        return (
          <WorkoutLogger 
            workouts={workouts}
            onSave={saveWorkout} 
            onCancel={() => setActiveTab('dashboard')} 
          />
        );
      case 'ai-coach':
        return <AICoach workouts={workouts} />;
      case 'history':
        return (
          <WorkoutHistory 
            workouts={workouts} 
            onDelete={deleteWorkout}
            onImport={handleImport}
          />
        );
      default:
        return <Analytics workouts={workouts} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;