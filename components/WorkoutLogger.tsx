import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Save, X, FileText, ChevronDown, Dumbbell, Calendar, History } from 'lucide-react';
import { WorkoutSession, ExerciseLog, ExerciseSet } from '../types';
import { AVAILABLE_EXERCISES } from '../data/initialData';

interface WorkoutLoggerProps {
  onSave: (workout: WorkoutSession) => void;
  onCancel: () => void;
  workouts: WorkoutSession[];
}

const WorkoutLogger: React.FC<WorkoutLoggerProps> = ({ onSave, onCancel, workouts }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('');
  const [currentExercises, setCurrentExercises] = useState<ExerciseLog[]>([]);
  const [customExercise, setCustomExercise] = useState('');
  const [expandedNotes, setExpandedNotes] = useState<Record<number, boolean>>({});

  const addExercise = () => {
    const name = selectedExerciseId === 'custom' ? customExercise : selectedExerciseId;
    if (!name) return;

    setCurrentExercises(prev => [
      ...prev,
      { exerciseName: name, sets: [{ reps: 0, weight: 0 }], notes: '' }
    ]);
    setSelectedExerciseId('');
    setCustomExercise('');
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: keyof ExerciseSet, value: string) => {
    const newExercises = [...currentExercises];
    const val = parseFloat(value) || 0;
    // @ts-ignore
    newExercises[exerciseIndex].sets[setIndex][field] = val;
    setCurrentExercises(newExercises);
  };

  const updateNotes = (exerciseIndex: number, value: string) => {
    const newExercises = [...currentExercises];
    newExercises[exerciseIndex].notes = value;
    setCurrentExercises(newExercises);
  };

  const addSet = (exerciseIndex: number) => {
    const newExercises = [...currentExercises];
    const prevSet = newExercises[exerciseIndex].sets[newExercises[exerciseIndex].sets.length - 1];
    newExercises[exerciseIndex].sets.push({ 
      reps: prevSet ? prevSet.reps : 0, 
      weight: prevSet ? prevSet.weight : 0 
    });
    setCurrentExercises(newExercises);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const newExercises = [...currentExercises];
    newExercises[exerciseIndex].sets.splice(setIndex, 1);
    setCurrentExercises(newExercises);
  };

  const toggleNote = (index: number) => {
    setExpandedNotes(prev => ({...prev, [index]: !prev[index]}));
  };

  const handleSave = () => {
    if (!title || currentExercises.length === 0) {
      alert("Please add a title and at least one exercise.");
      return;
    }

    const newWorkout: WorkoutSession = {
      id: Date.now().toString(),
      date: new Date(date).toISOString(),
      title,
      exercises: currentExercises
    };

    onSave(newWorkout);
  };

  // Helper to find last performance
  const getLastPerformance = (exerciseName: string) => {
    // Sort workouts descending by date
    const sortedHistory = [...workouts].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    for (const session of sortedHistory) {
        // Skip if comparing to current session (though typically current isn't saved yet)
        const foundExercise = session.exercises.find(e => e.exerciseName === exerciseName);
        if (foundExercise && foundExercise.sets.length > 0) {
            return {
                date: new Date(session.date).toLocaleDateString(),
                sets: foundExercise.sets
            };
        }
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-40 max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between bg-gym-bg/80 backdrop-blur-xl py-4 border-b border-gym-border sticky top-0 z-30 -mx-4 px-4 md:px-0 md:static md:bg-transparent md:border-0">
        <div>
            <h2 className="text-3xl font-bold text-white">Log Workout</h2>
            <p className="text-gray-400 text-sm hidden md:block">Record your gains, one rep at a time.</p>
        </div>
        <button 
          onClick={onCancel} 
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Meta Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 glass-card p-6 rounded-3xl">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-gym-primary uppercase tracking-wider">
            <Dumbbell size={14} /> Workout Title
          </label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gym-bg/50 border border-gym-border rounded-xl p-4 text-white focus:border-gym-primary focus:ring-1 focus:ring-gym-primary outline-none transition-all placeholder-gray-600 font-medium text-lg"
            placeholder="e.g., Heavy Chest Day"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-gym-accent uppercase tracking-wider">
            <Calendar size={14} /> Date
          </label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gym-bg/50 border border-gym-border rounded-xl p-4 text-white focus:border-gym-accent focus:ring-1 focus:ring-gym-accent outline-none transition-all"
          />
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-6">
        {currentExercises.map((ex, exIndex) => {
          const lastPerf = getLastPerformance(ex.exerciseName);
          
          return (
            <div key={exIndex} className="glass-card rounded-3xl overflow-hidden animate-slide-up border border-white/5 shadow-xl">
              {/* Card Header */}
              <div className="bg-white/5 p-5 flex flex-col gap-3 border-b border-white/5">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl text-white tracking-tight">{ex.exerciseName}</h3>
                    <div className="flex items-center gap-1">
                        <button 
                            onClick={() => toggleNote(exIndex)}
                            className={`p-2 rounded-lg transition-colors ${expandedNotes[exIndex] || ex.notes ? 'bg-gym-primary/20 text-gym-primary' : 'text-gray-500 hover:bg-white/5'}`}
                            title="Add Note"
                        >
                            <FileText size={18} />
                        </button>
                        <button 
                            onClick={() => {
                            const newEx = [...currentExercises];
                            newEx.splice(exIndex, 1);
                            setCurrentExercises(newEx);
                            }}
                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
                
                {/* Previous Performance Snippet */}
                {lastPerf && (
                    <div className="flex items-center gap-2 text-xs text-gray-400 bg-black/30 p-2 rounded-lg w-fit">
                        <History size={12} className="text-gym-accent" />
                        <span className="font-medium text-gym-accent">Last ({lastPerf.date}):</span>
                        <span>
                            {lastPerf.sets.map(s => `${s.weight}kg×${s.reps}`).join(', ')}
                        </span>
                    </div>
                )}
              </div>

              {/* Notes Section */}
              {(expandedNotes[exIndex] || ex.notes) && (
                <div className="px-5 py-4 bg-black/20 border-b border-white/5">
                  <textarea
                    value={ex.notes || ''}
                    onChange={(e) => updateNotes(exIndex, e.target.value)}
                    placeholder="Add notes like seat height, RPE, or feelings..."
                    className="w-full bg-gym-bg border border-gym-border rounded-xl p-3 text-sm text-gray-300 focus:border-gym-primary focus:ring-1 focus:ring-gym-primary outline-none min-h-[60px] resize-y font-mono"
                  />
                </div>
              )}

              {/* Sets Header */}
              <div className="grid grid-cols-10 gap-3 px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/20">
                <span className="col-span-1 text-center flex items-center justify-center">Set</span>
                <span className="col-span-4 text-center">Weight (kg)</span>
                <span className="col-span-4 text-center">Reps</span>
                <span className="col-span-1"></span>
              </div>

              {/* Sets Rows */}
              <div className="p-5 space-y-3">
                {ex.sets.map((set, setIndex) => (
                  <div key={setIndex} className="grid grid-cols-10 gap-3 items-center group">
                    <div className="col-span-1 flex justify-center">
                      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 text-gray-400 text-xs font-mono group-hover:bg-gym-primary group-hover:text-white transition-colors">
                        {setIndex + 1}
                      </span>
                    </div>
                    <div className="col-span-4">
                      <input
                        type="number"
                        placeholder="0"
                        value={set.weight || ''}
                        onChange={(e) => updateSet(exIndex, setIndex, 'weight', e.target.value)}
                        className="w-full bg-gym-bg border border-gym-border rounded-xl py-3 px-4 text-center text-white text-xl font-bold focus:border-gym-primary focus:ring-1 focus:ring-gym-primary outline-none transition-all placeholder-gray-700"
                      />
                    </div>
                    <div className="col-span-4">
                      <input
                        type="number"
                        placeholder="0"
                        value={set.reps || ''}
                        onChange={(e) => updateSet(exIndex, setIndex, 'reps', e.target.value)}
                        className="w-full bg-gym-bg border border-gym-border rounded-xl py-3 px-4 text-center text-white text-xl font-bold focus:border-gym-accent focus:ring-1 focus:ring-gym-accent outline-none transition-all placeholder-gray-700"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                        onClick={() => removeSet(exIndex, setIndex)}
                        className="text-gray-600 hover:text-red-400 p-2 rounded-lg transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => addSet(exIndex)}
                  className="mt-4 w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold text-gym-primary bg-gym-primary/5 border border-gym-primary/20 hover:bg-gym-primary/10 rounded-xl transition-all"
                >
                  <Plus size={16} /> Add Set
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Exercise Control */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 border-dashed hover:border-gym-primary/40 transition-colors">
        <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Add to Workout</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <select
              value={selectedExerciseId}
              onChange={(e) => setSelectedExerciseId(e.target.value)}
              className="w-full appearance-none bg-gym-bg border border-gym-border text-white rounded-xl px-5 py-4 focus:border-gym-primary outline-none pr-10 text-base transition-shadow shadow-sm"
            >
              <option value="">Select an exercise...</option>
              {AVAILABLE_EXERCISES.map(e => (
                <option key={e.name} value={e.name}>{e.name}</option>
              ))}
              <option value="custom" className="text-gym-primary font-bold">+ Create New Exercise</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <ChevronDown size={20} />
            </div>
          </div>
          
          {selectedExerciseId === 'custom' && (
             <input 
               type="text"
               placeholder="Name of exercise"
               value={customExercise}
               onChange={(e) => setCustomExercise(e.target.value)}
               className="flex-1 bg-gym-bg border border-gym-border text-white rounded-xl px-5 py-4 focus:border-gym-primary outline-none animate-fade-in"
               autoFocus
             />
          )}

          <button
            onClick={addExercise}
            disabled={!selectedExerciseId || (selectedExerciseId === 'custom' && !customExercise)}
            className="bg-white text-black font-bold py-4 px-8 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg shadow-white/10"
          >
            <Plus size={20} /> Add
          </button>
        </div>
      </div>

      {/* Footer Actions - Adjusted for Mobile to sit above Nav */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-gym-bg via-gym-bg/95 to-transparent z-20 md:static md:bg-none md:p-0 md:bottom-auto">
        <button
          onClick={handleSave}
          className="w-full max-w-3xl mx-auto bg-gradient-to-r from-gym-primary to-gym-accent text-white font-bold text-lg py-4 rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-gym-primary/25 flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <Save size={24} />
          Save Workout
        </button>
      </div>
    </div>
  );
};

export default WorkoutLogger;