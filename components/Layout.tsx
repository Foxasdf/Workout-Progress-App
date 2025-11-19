import React from 'react';
import { Dumbbell, BarChart3, PlusCircle, Sparkles, History } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', icon: <BarChart3 size={20} />, label: 'Overview' },
    { id: 'log', icon: <PlusCircle size={20} />, label: 'Log' },
    { id: 'history', icon: <History size={20} />, label: 'History' },
    { id: 'ai-coach', icon: <Sparkles size={20} />, label: 'Coach' },
  ];

  return (
    <div className="min-h-screen bg-gym-bg text-gray-100 flex flex-col md:flex-row relative overflow-hidden selection:bg-gym-primary selection:text-white">
      
      {/* Ambient Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gym-primary/5 rounded-full blur-[100px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gym-accent/5 rounded-full blur-[100px]" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 glass-card border-r border-white/5 h-screen sticky top-0 z-20">
        <div className="p-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-gym-primary to-gym-accent p-2.5 rounded-xl shadow-lg shadow-gym-primary/20">
            <Dumbbell className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">IronProgress</h1>
            <span className="text-xs text-gray-500 font-medium">AI Powered Tracker</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                activeTab === item.id 
                  ? 'bg-gym-primary text-white shadow-lg shadow-gym-primary/25' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`relative z-10 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className="relative z-10 font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
            <div className="bg-gradient-to-r from-gym-card to-gym-bg p-4 rounded-xl border border-white/5">
                <p className="text-xs text-gray-400 mb-2">Current Streak</p>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-white">3</span>
                    <span className="text-sm text-gym-success mb-1">Days 🔥</span>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 h-screen overflow-y-auto no-scrollbar">
        {/* Added extra padding bottom for mobile to account for fixed nav */}
        <div className="max-w-5xl mx-auto p-4 pb-32 md:p-8 md:pb-12 lg:p-12">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/5 pb-safe z-50 backdrop-blur-xl">
        <div className="flex justify-around items-center p-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center w-full py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id ? 'text-gym-primary' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className={`mb-1 transition-transform duration-200 ${activeTab === item.id ? '-translate-y-1' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium ${activeTab === item.id ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 absolute bottom-1.5`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;