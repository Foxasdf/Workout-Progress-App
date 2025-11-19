import React, { useRef, useState } from 'react';
import { WorkoutSession } from '../types';
import { Calendar, Trash2, Dumbbell, Download, Upload, FileText, FileJson, MoreVertical, ChevronDown } from 'lucide-react';

interface WorkoutHistoryProps {
  workouts: WorkoutSession[];
  onDelete: (id: string) => void;
  onImport: (data: WorkoutSession[]) => void;
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ workouts, onDelete, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const sortedWorkouts = [...workouts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(workouts, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `ironprogress_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setShowExportMenu(false);
  };

  const handleExportTXT = () => {
    // Format workouts like the user's original text file
    const textContent = sortedWorkouts.map(w => {
        const dateStr = new Date(w.date).toLocaleDateString('en-GB', { weekday: 'long', year: '2-digit', month: 'numeric', day: 'numeric' });
        const header = `${dateStr} (${w.title})`;
        const exercises = w.exercises.map(e => {
            const setStr = e.sets.map(s => `${s.reps} (${s.weight} kg)`).join(' - ');
            const notes = e.notes ? `\nNote: ${e.notes}` : '';
            return `${e.exerciseName}:\n${setStr}${notes}`;
        }).join('\n');
        return `${header}\n${exercises}\n_______`;
    }).join('\n\n');

    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(textContent);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `ironprogress_logs_${new Date().toISOString().split('T')[0]}.txt`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setShowExportMenu(false);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImport(parsed);
        } else {
          alert("Invalid file format. Expected a JSON array.");
        }
      } catch (err) {
        alert("Error parsing JSON file.");
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 bg-gym-bg/50 backdrop-blur-sm sticky top-0 z-30 py-4 -mx-4 px-4 md:static md:bg-transparent md:p-0">
        <div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-1 md:mb-2">History</h2>
            <p className="text-gray-400 text-sm md:text-base">Archive of your {sortedWorkouts.length} sessions.</p>
        </div>
        <div className="flex gap-2 items-stretch">
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".json"
            />
            <button 
                onClick={handleImportClick}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-sm font-medium transition-colors border border-white/5"
            >
                <Upload size={16} /> <span className="hidden sm:inline">Import</span>
            </button>
            
            <div className="relative">
                <button 
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="h-full flex items-center gap-2 px-4 py-2 bg-gym-primary/10 hover:bg-gym-primary/20 text-gym-primary rounded-xl text-sm font-bold transition-colors border border-gym-primary/20"
                >
                    <Download size={16} /> Export <ChevronDown size={14} />
                </button>
                
                {showExportMenu && (
                    <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl shadow-xl border border-white/10 overflow-hidden z-50 flex flex-col">
                        <button 
                            onClick={handleExportJSON}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 text-left text-sm text-gray-200 transition-colors"
                        >
                            <FileJson size={16} className="text-gym-warning" /> Export as JSON
                        </button>
                        <button 
                            onClick={handleExportTXT}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 text-left text-sm text-gray-200 transition-colors border-t border-white/5"
                        >
                            <FileText size={16} className="text-gym-accent" /> Export as Text
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
      
      {/* Timeline Container */}
      <div className="relative md:space-y-8 space-y-4 md:before:absolute md:before:inset-0 md:before:ml-auto md:before:mr-auto md:before:w-0.5 md:before:bg-gradient-to-b md:before:from-transparent md:before:via-white/10 md:before:to-transparent">
        {sortedWorkouts.length === 0 && (
          <div className="text-center py-16 text-gray-500 bg-white/5 rounded-3xl border border-white/5 border-dashed relative z-10">
             <Dumbbell className="mx-auto mb-4 opacity-20" size={48} />
             <p>No workouts logged yet.</p>
          </div>
        )}
        
        {sortedWorkouts.map((workout) => (
          <div key={workout.id} className="relative flex flex-col md:flex-row items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            
            {/* Timeline Dot (Desktop Only) */}
            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-gym-card shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-1/2 -translate-x-1/2 z-10 group-hover:border-gym-primary group-hover:scale-110 transition-all">
                <div className="w-2 h-2 rounded-full bg-gym-primary"></div>
            </div>
            
            {/* Content Card */}
            <div className="w-full md:w-[calc(50%-3rem)] glass-card rounded-2xl md:rounded-3xl p-5 md:p-6 border border-white/5 md:group-hover:border-gym-primary/30 transition-all duration-300 relative overflow-hidden">
              
              {/* Mobile Date Header (Integrated) */}
              <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-3">
                <div>
                    <div className="flex items-center gap-2 text-gym-primary text-xs font-bold uppercase tracking-wider mb-1">
                        <Calendar size={12} />
                        {new Date(workout.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white leading-tight pr-8">{workout.title}</h3>
                </div>
                
                {/* Delete Button - Absolute positioned for reliable clicking */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        if(window.confirm('Delete this workout permanently?')) {
                            onDelete(workout.id);
                        }
                    }}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors z-20"
                    title="Delete Log"
                >
                    <Trash2 size={18} />
                </button>
              </div>
              
              {/* Stats Row */}
              <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 font-medium">
                 <span>{workout.exercises.length} Exercises</span>
                 <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                 <span>{workout.exercises.reduce((acc, e) => acc + e.sets.length, 0)} Sets</span>
              </div>
              
              {/* Exercise Preview List */}
              <div className="space-y-2">
                {workout.exercises.slice(0, 4).map((ex, i) => (
                  <div key={i} className="flex items-center justify-between text-sm group/item">
                    <div className="font-medium text-gray-400 group-hover/item:text-gray-200 transition-colors flex items-center gap-2 truncate max-w-[70%]">
                      <span className="w-1 h-1 rounded-full bg-gym-border group-hover/item:bg-gym-primary shrink-0"></span>
                      <span className="truncate">{ex.exerciseName}</span>
                    </div>
                    <div className="text-gray-600 group-hover/item:text-gray-500 font-mono text-xs shrink-0">
                        {ex.sets.length > 0 ? (
                            <span className="text-gym-accent/60">{Math.max(...ex.sets.map(s => s.weight))}kg max</span>
                        ) : 'No sets'}
                    </div>
                  </div>
                ))}
                
                {workout.exercises.length > 4 && (
                    <div className="pt-2 text-xs text-center text-gray-600 font-medium">
                        +{workout.exercises.length - 4} more
                    </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutHistory;