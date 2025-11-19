import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { WorkoutSession } from '../types';
import { TrendingUp, Calendar, Zap, Award, Activity, BarChart3 } from 'lucide-react';

interface AnalyticsProps {
  workouts: WorkoutSession[];
}

const Analytics: React.FC<AnalyticsProps> = ({ workouts }) => {
  const [selectedExercise, setSelectedExercise] = useState<string>('Delts Machine');

  // Extract all unique exercise names
  const allExercises = useMemo(() => {
    const names = new Set<string>();
    workouts.forEach(w => w.exercises.forEach(e => names.add(e.exerciseName)));
    return Array.from(names).sort();
  }, [workouts]);

  // Prepare data for the selected exercise
  const chartData = useMemo(() => {
    const data: any[] = [];
    workouts.forEach(w => {
      const exercise = w.exercises.find(e => e.exerciseName === selectedExercise);
      if (exercise && exercise.sets.length > 0) {
        let volume = 0;
        let maxWeight = 0;
        
        exercise.sets.forEach(s => {
          volume += s.reps * s.weight;
          if (s.weight > maxWeight) maxWeight = s.weight;
        });

        data.push({
          date: new Date(w.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          rawDate: new Date(w.date),
          volume,
          maxWeight
        });
      }
    });
    return data.sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());
  }, [workouts, selectedExercise]);

  const totalWorkouts = workouts.length;
  const lastWorkout = workouts.length > 0 
    ? new Date(workouts[workouts.length - 1].date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })
    : 'N/A';
    
  // Calculate total volume across all time (rough estimate)
  const totalVolume = useMemo(() => {
    return workouts.reduce((acc, w) => {
        return acc + w.exercises.reduce((eAcc, e) => {
            return eAcc + e.sets.reduce((sAcc, s) => sAcc + (s.reps * s.weight), 0);
        }, 0);
    }, 0);
  }, [workouts]);

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="mb-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">Dashboard</h2>
        <p className="text-gray-400 text-lg">Your fitness journey at a glance.</p>
      </header>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-gym-primary/30 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={80} />
            </div>
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gym-primary/10 rounded-xl text-gym-primary border border-gym-primary/20">
                    <Zap size={24} />
                </div>
                <span className="text-gray-400 font-medium">Total Sessions</span>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight">{totalWorkouts}</p>
            <div className="mt-2 text-sm text-gym-success flex items-center gap-1">
                <TrendingUp size={14} /> +2 this week
            </div>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-gym-accent/30 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity size={80} />
            </div>
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gym-accent/10 rounded-xl text-gym-accent border border-gym-accent/20">
                    <Activity size={24} />
                </div>
                <span className="text-gray-400 font-medium">Volume Lifted</span>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight">{(totalVolume / 1000).toFixed(1)}k <span className="text-lg text-gray-500">kg</span></p>
            <div className="mt-2 text-sm text-gray-500">Lifetime total</div>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-gym-warning/30 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Calendar size={80} />
            </div>
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gym-warning/10 rounded-xl text-gym-warning border border-gym-warning/20">
                    <Calendar size={24} />
                </div>
                <span className="text-gray-400 font-medium">Last Workout</span>
            </div>
            <p className="text-2xl font-bold text-white tracking-tight">{lastWorkout}</p>
             <div className="mt-3 text-sm text-gray-500">Keep the streak alive!</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-card p-6 md:p-8 rounded-3xl shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Award className="text-gym-primary" size={24}/>
                Exercise Progression
            </h3>
            <p className="text-gray-500 text-sm mt-1">Tracking Max Weight (kg)</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <select 
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="w-full bg-gym-bg border border-gym-border text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gym-primary focus:ring-1 focus:ring-gym-primary appearance-none cursor-pointer transition-shadow shadow-sm"
            >
              {allExercises.map(ex => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        {chartData.length > 0 ? (
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMaxWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={10}
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(24, 24, 27, 0.9)', 
                    backdropFilter: 'blur(8px)',
                    borderColor: '#3f3f46', 
                    borderRadius: '12px', 
                    color: '#fff',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                  }}
                  itemStyle={{ color: '#60a5fa' }}
                  labelStyle={{ color: '#9ca3af', marginBottom: '0.5rem' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="maxWeight" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorMaxWeight)" 
                  name="Max Weight (kg)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[350px] flex flex-col items-center justify-center text-gray-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
            <BarChart3 size={48} className="mb-4 opacity-50" />
            <p>No data available for this exercise.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;