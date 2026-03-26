import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiChevronLeft, FiChevronRight, FiX, FiUpload } from 'react-icons/fi';
import { extractTextFromPDF } from '../utils/pdfReader';

export default function FlashcardsTab({ onStatsUpdate }) {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Generator state
  const [input, setInput] = useState('');
  const [generatingSetTitle, setGeneratingSetTitle] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFlashcards();
  }, []);

  const loadFlashcards = async () => {
    setLoading(true);
    try {
      const data = await window.electronAPI.readFlashcards();
      setSets(data);
      if (selectedSetId && !data.find(s => s.id === selectedSetId)) {
        setSelectedSetId(null);
        setCurrentCardIndex(0);
      }
    } catch (error) {
      console.error('Error loading flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateFlashcards = async () => {
    if (!input.trim() || !generatingSetTitle.trim()) {
      setError('Please enter a title and material');
      return;
    }

    setGenerating(true);
    setError('');

    try {
      const apiKey = process.env.REACT_APP_CLAUDE_API_KEY;
      if (!apiKey) {
        setError('Claude API key not configured. Please set REACT_APP_CLAUDE_API_KEY in .env');
        setGenerating(false);
        return;
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2048,
          messages: [
            {
              role: 'user',
              content: `Generate 10 flashcard Q&A pairs from the following study material. Return ONLY a valid JSON array with this structure: [{"question": "...", "answer": "..."}]. No markdown, no explanation, just the JSON array.\n\nMaterial:\n${input}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.content[0].text;

      // Parse JSON from response
      let cards;
      try {
        // Try to extract JSON from the response
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        cards = JSON.parse(jsonMatch ? jsonMatch[0] : content);
      } catch (parseError) {
        throw new Error('Failed to parse generated flashcards. Please try again.');
      }

      if (!Array.isArray(cards) || cards.length === 0) {
        throw new Error('No flashcards were generated. Please try with different material.');
      }

      const flashcardSet = {
        title: generatingSetTitle,
        cards: cards,
        createdAt: new Date().toISOString()
      };

      await window.electronAPI.saveFlashcardSet(flashcardSet);
      await loadFlashcards();
      onStatsUpdate?.();

      // Reset form
      setInput('');
      setGeneratingSetTitle('');
    } catch (err) {
      setError(err.message || 'Failed to generate flashcards');
      console.error('Error:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteSet = async (setId) => {
    if (window.confirm('Are you sure you want to delete this flashcard set?')) {
      try {
        await window.electronAPI.deleteFlashcardSet(setId);
        await loadFlashcards();
        onStatsUpdate?.();
      } catch (error) {
        console.error('Error deleting flashcard set:', error);
      }
    }
  };

  const handlePDFUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const text = await extractTextFromPDF(file);
      setInput(text);
      // Use PDF filename as set title if not already set
      if (!generatingSetTitle.trim()) {
        setGeneratingSetTitle(file.name.replace('.pdf', ''));
      }
    } catch (err) {
      setError(err.message || 'Failed to read PDF');
      console.error('PDF extraction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedSet = sets.find(s => s.id === selectedSetId);
  const currentCard = selectedSet?.cards[currentCardIndex];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Flashcards</h1>
        <p className="text-gray-400">Generate and study flashcard sets with AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Generator */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Generate New Set</h2>

            {error && (
              <div className="bg-red-900 border border-red-700 text-red-100 rounded-lg p-4 mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Set Title</label>
                <input
                  type="text"
                  value={generatingSetTitle}
                  onChange={(e) => setGeneratingSetTitle(e.target.value)}
                  placeholder="e.g., Spanish Vocabulary, Biology 101..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Study Material</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your study material here (textbook excerpts, notes, definitions, etc.)..."
                  rows="12"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={generateFlashcards}
                  disabled={generating || !input.trim() || !generatingSetTitle.trim()}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <FiPlus size={20} />
                  {generating ? 'Generating...' : 'Generate'}
                </button>

                <label className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
                  <FiUpload size={20} />
                  PDF
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePDFUpload}
                    disabled={loading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sets List */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Your Sets ({sets.length})</h2>

            {loading ? (
              <p className="text-gray-400 text-center py-4">Loading...</p>
            ) : sets.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No sets yet. Create one!</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {sets.map(set => (
                  <button
                    key={set.id}
                    onClick={() => {
                      setSelectedSetId(set.id);
                      setCurrentCardIndex(0);
                      setIsFlipped(false);
                    }}
                    className={`w-full text-left rounded-lg p-3 transition-colors group ${
                      selectedSetId === set.id
                        ? 'bg-purple-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <h3 className="font-medium text-gray-100 truncate">{set.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {set.cards?.length || 0} cards
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSet(set.id);
                      }}
                      className="mt-2 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs"
                    >
                      <FiTrash2 size={14} />
                      Delete
                    </button>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Flashcard Viewer */}
      {selectedSet && (
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{selectedSet.title}</h2>
              <p className="text-gray-400 text-sm mt-1">
                Card {currentCardIndex + 1} of {selectedSet.cards.length}
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedSetId(null);
                setCurrentCardIndex(0);
              }}
              className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Card */}
          <div className="flex justify-center mb-8">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full max-w-2xl h-64 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-8 flex items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              <div className="text-center">
                <p className="text-sm text-blue-100 mb-4 font-medium">
                  {isFlipped ? 'Answer' : 'Question'}
                </p>
                <p className="text-2xl font-bold text-white">
                  {isFlipped ? currentCard.answer : currentCard.question}
                </p>
                <p className="text-xs text-blue-100 mt-8">Click to flip</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrentCardIndex(Math.max(0, currentCardIndex - 1));
                setIsFlipped(false);
              }}
              disabled={currentCardIndex === 0}
              className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed p-2 rounded-lg transition-colors"
            >
              <FiChevronLeft size={24} />
            </button>

            <div className="text-center min-w-[200px]">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${((currentCardIndex + 1) / selectedSet.cards.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentCardIndex(Math.min(selectedSet.cards.length - 1, currentCardIndex + 1));
                setIsFlipped(false);
              }}
              disabled={currentCardIndex === selectedSet.cards.length - 1}
              className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed p-2 rounded-lg transition-colors"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
