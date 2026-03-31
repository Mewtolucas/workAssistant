import React, { useState, useEffect } from 'react';
import { FiHome, FiMail, FiFileText, FiZap, FiGrid, FiCalendar } from 'react-icons/fi';
import Dashboard from './components/Dashboard';
import NotesTab from './components/NotesTab';
import SummarizerTab from './components/SummarizerTab';
import FlashcardsTab from './components/FlashcardsTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ notesCount: 0, flashcardsCount: 0, unreadEmails: 0, upcomingEvents: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await window.electronAPI.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, component: Dashboard },
    { id: 'email', label: 'Email', icon: FiMail, component: null },
    { id: 'notes', label: 'Notes', icon: FiFileText, component: NotesTab },
    { id: 'summarizer', label: 'Summarizer', icon: FiZap, component: SummarizerTab },
    { id: 'flashcards', label: 'Flashcards', icon: FiGrid, component: FlashcardsTab },
    { id: 'calendar', label: 'Calendar', icon: FiCalendar, component: null }
  ];

  const currentTab = tabs.find(t => t.id === activeTab);
  const TabComponent = currentTab?.component;

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Assistant
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700 text-xs text-gray-500">
          <p>© 2025 Personal Assistant</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {TabComponent ? (
          <TabComponent stats={stats} onStatsUpdate={loadStats} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Coming Soon</h2>
              <p className="text-gray-400">{currentTab?.label} tab is not yet implemented.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
