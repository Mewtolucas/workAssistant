import React, { useState } from 'react';
import { FiZap, FiCopy, FiCheck } from 'react-icons/fi';

export default function SummarizerTab() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!input.trim()) {
      setError('Please paste some text to summarize');
      return;
    }

    setLoading(true);
    setError('');
    setSummary('');

    try {
      const apiKey = process.env.REACT_APP_CLAUDE_API_KEY;
      if (!apiKey) {
        setError('Claude API key not configured. Please set REACT_APP_CLAUDE_API_KEY in .env');
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
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `Please summarize the following text concisely:\n\n${input}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.content[0].text);
    } catch (err) {
      setError(err.message || 'Failed to summarize text');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Text Summarizer</h1>
        <p className="text-gray-400">Paste text to get an AI-powered summary</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Input Text</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here..."
            rows="14"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
          />
          <button
            onClick={handleSummarize}
            disabled={loading || !input.trim()}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <FiZap size={20} />
            {loading ? 'Summarizing...' : 'Summarize'}
          </button>
        </div>

        {/* Output */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Summary</h2>
            {summary && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition-colors"
              >
                {copied ? (
                  <>
                    <FiCheck size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <FiCopy size={16} />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-100 rounded-lg p-4 mb-4">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {!loading && summary && (
            <div className="bg-gray-700 rounded-lg p-4 text-gray-100 max-h-96 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed">
              {summary}
            </div>
          )}

          {!loading && !summary && !error && (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <p className="text-center">Paste text and click "Summarize" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
