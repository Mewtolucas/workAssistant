import React from 'react';
import { FiFileText, FiGrid, FiMail, FiCalendar } from 'react-icons/fi';

export default function Dashboard({ stats }) {
  const statCards = [
    { label: 'Notes', value: stats.notesCount, icon: FiFileText, color: 'from-blue-400 to-blue-600' },
    { label: 'Flashcard Sets', value: stats.flashcardsCount, icon: FiGrid, color: 'from-purple-400 to-purple-600' },
    { label: 'Unread Emails', value: stats.unreadEmails, icon: FiMail, color: 'from-pink-400 to-pink-600' },
    { label: 'Upcoming Events', value: stats.upcomingEvents, icon: FiCalendar, color: 'from-green-400 to-green-600' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-400">Here's an overview of your personal assistant</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium">{card.label}</h3>
                <div className={`bg-gradient-to-r ${card.color} p-3 rounded-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold">{card.value}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
            Create New Note
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
            Generate Flashcards
          </button>
          <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg transition-colors">
            Summarize Text
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
            Check Email
          </button>
        </div>
      </div>
    </div>
  );
}
