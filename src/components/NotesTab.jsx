import React, { useState, useEffect } from 'react';
import { FiPlus, FiX, FiTrash2, FiUpload } from 'react-icons/fi';
import { extractTextFromPDF } from '../utils/pdfReader';

export default function NotesTab({ onStatsUpdate }) {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await window.electronAPI.readNotes();
      setNotes(data);
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) return;

    try {
      const note = {
        id: editingId,
        title: title.trim(),
        content: content.trim(),
        createdAt: editingId ? undefined : new Date().toISOString()
      };

      await window.electronAPI.saveNote(note);
      await loadNotes();
      onStatsUpdate?.();
      setTitle('');
      setContent('');
      setEditingId(null);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await window.electronAPI.deleteNote(noteId);
        await loadNotes();
        onStatsUpdate?.();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setEditingId(null);
  };

  const handlePDFUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
      alert('Please select a PDF file');
      return;
    }

    setLoading(true);

    try {
      const text = await extractTextFromPDF(file);
      // Use PDF filename as note title if not already set
      if (!title.trim()) {
        setTitle(file.name.replace('.pdf', ''));
      }
      setContent(text);
    } catch (err) {
      alert('Failed to read PDF: ' + err.message);
      console.error('PDF extraction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Notes</h1>
        <p className="text-gray-400">Create, edit, and manage your notes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Note' : 'New Note'}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note title..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note here..."
                  rows="12"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={!title.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FiPlus size={20} />
                  {editingId ? 'Update' : 'Save'}
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
                {editingId && (
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FiX size={20} />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Notes List */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Your Notes ({notes.length})</h2>

            {loading ? (
              <p className="text-gray-400 text-center py-4">Loading...</p>
            ) : notes.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No notes yet. Create one!</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {notes.map(note => (
                  <div
                    key={note.id}
                    className="bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-100 truncate">{note.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(note.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(note)}
                          className="text-blue-400 hover:text-blue-300 p-1"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
