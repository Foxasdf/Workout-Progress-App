import React, { useEffect, useState } from 'react';
import { Sparkles, RefreshCw, Quote, Bot } from 'lucide-react';
import { WorkoutSession } from '../types';
import { generateWeeklyAnalysis } from '../services/geminiService';

interface AICoachProps {
  workouts: WorkoutSession[];
}

const AICoach: React.FC<AICoachProps> = ({ workouts }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchAnalysis = async () => {
    setLoading(true);
    const result = await generateWeeklyAnalysis(workouts);
    setAnalysis(result);
    setLoading(false);
  };

  useEffect(() => {
    if (workouts.length > 0 && !analysis) {
      fetchAnalysis();
    }
  }, [workouts]);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black text-white flex items-center gap-3 tracking-tight">
            AI Coach <Sparkles className="text-gym-accent fill-gym-accent" size={32} />
          </h2>
          <p className="text-gray-400 mt-2 text-lg">Advanced insights powered by Gemini 2.5.</p>
        </div>
        <button 
          onClick={fetchAnalysis}
          disabled={loading}
          className="group p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={24} className={`text-gym-primary group-hover:rotate-180 transition-transform duration-700 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="glass-card rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent">
          <div className="bg-gym-bg/90 backdrop-blur-xl p-8 rounded-[20px] relative overflow-hidden min-h-[400px]">
            
            {/* Decorative blob */}
            <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-gym-accent/20 rounded-full blur-[50px]"></div>
            <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-gym-primary/20 rounded-full blur-[50px]"></div>

            {loading ? (
            <div className="flex flex-col items-center justify-center h-[300px] space-y-6">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-gym-primary/30 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-gym-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Bot size={24} className="text-white" />
                    </div>
                </div>
                <p className="text-gray-400 animate-pulse font-medium">Analyzing muscle groups & volume...</p>
            </div>
            ) : (
            <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white prose-strong:text-gym-accent prose-li:text-gray-300">
                {analysis ? (
                <div className="whitespace-pre-line leading-relaxed text-lg">
                    {analysis}
                </div>
                ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
                    <Bot size={48} className="mb-4 opacity-20" />
                    <p>Log some workouts to get your first AI analysis!</p>
                </div>
                )}
            </div>
            )}
        </div>
      </div>

      {/* Motivational Quote Section */}
      <div className="relative overflow-hidden rounded-2xl border border-gym-warning/20 bg-gradient-to-r from-gym-warning/10 to-transparent p-8">
        <div className="absolute top-0 left-0 w-1 h-full bg-gym-warning"></div>
        <div className="flex gap-6 items-start relative z-10">
          <Quote className="text-gym-warning shrink-0 opacity-80" size={32} />
          <div>
            <p className="italic text-2xl font-serif text-gray-200 mb-2">"The only bad workout is the one that didn't happen."</p>
            <p className="text-gym-warning/80 font-medium">— Gym Wisdom</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;