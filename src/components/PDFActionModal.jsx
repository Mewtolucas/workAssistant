import React from 'react';
import { FiX } from 'react-icons/fi';

export default function PDFActionModal({ isOpen, content, onClose, onAction }) {
  if (!isOpen) return null;

  const actions = [
    {
      id: 'summarize',
      title: 'Summarize',
      description: 'Send to Summarizer to create a concise summary',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'note',
      title: 'Create Note',
      description: 'Save the extracted content as a new note',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'flashcard',
      title: 'Generate Flashcards',
      description: 'Use the content to create study flashcards',
      color: 'bg-pink-600 hover:bg-pink-700'
    }
  ];

  const handleAction = (action) => {
    onAction(action, content);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">PDF Content Extracted</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <p className="text-gray-400 mb-6">
          What would you like to do with this PDF?
        </p>

        <div className="space-y-3">
          {actions.map(action => (
            <button
              key={action.id}
              onClick={() => handleAction(action.id)}
              className={`w-full text-left p-4 rounded-lg ${action.color} text-white transition-colors`}
            >
              <h3 className="font-bold mb-1">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-700 rounded-lg max-h-32 overflow-y-auto">
          <p className="text-xs text-gray-400 mb-2">Preview:</p>
          <p className="text-sm text-gray-100 line-clamp-4">
            {content.substring(0, 200)}...
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
