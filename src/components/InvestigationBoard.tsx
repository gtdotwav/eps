"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconPlus,
  IconTrash,
  IconNote,
  IconArrowRight,
  IconDownload,
  IconX,
  IconClipboard,
} from "@tabler/icons-react";

interface BoardItem {
  id: string;
  type: "document" | "note" | "connection";
  title: string;
  content: string;
  x: number;
  y: number;
  color: string;
}

interface Connection {
  id: string;
  fromId: string;
  toId: string;
}

export function InvestigationBoard() {
  const [items, setItems] = useState<BoardItem[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("investigationBoard");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setItems(data.items || []);
        setConnections(data.connections || []);
      } catch (e) {
        console.error("Failed to load board", e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "investigationBoard",
      JSON.stringify({ items, connections })
    );
  }, [items, connections]);

  const addNote = (title: string, content: string) => {
    const newItem: BoardItem = {
      id: `note-${Date.now()}`,
      type: "note",
      title,
      content,
      x: Math.random() * 400,
      y: Math.random() * 400,
      color: "bg-yellow-500",
    };
    setItems([...items, newItem]);
    setShowNoteModal(false);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    setConnections(
      connections.filter((conn) => conn.fromId !== id && conn.toId !== id)
    );
    setSelectedItem(null);
  };

  const updatePosition = (id: string, x: number, y: number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, x, y } : item))
    );
  };

  const addConnection = () => {
    if (!selectedItem) return;
    // UI for connecting items would be added here
  };

  const clearBoard = () => {
    if (window.confirm("Clear entire board? This cannot be undone.")) {
      setItems([]);
      setConnections([]);
      setSelectedItem(null);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-zinc-900 rounded-lg overflow-hidden relative border border-zinc-800">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNoteModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <IconPlus size={18} />
          Add Note
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearBoard}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
        >
          <IconTrash size={18} />
          Clear
        </motion.button>
        <div className="flex-1" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
        >
          <IconDownload size={18} />
          Export
        </motion.button>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-full overflow-hidden">
        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((conn) => {
            const fromItem = items.find((i) => i.id === conn.fromId);
            const toItem = items.find((i) => i.id === conn.toId);
            if (!fromItem || !toItem) return null;
            return (
              <line
                key={conn.id}
                x1={fromItem.x + 100}
                y1={fromItem.y + 50}
                x2={toItem.x + 100}
                y2={toItem.y + 50}
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            );
          })}
        </svg>

        {/* Items */}
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              drag
              dragMomentum={false}
              onDragEnd={(_, { offset }) => {
                updatePosition(
                  item.id,
                  Math.max(0, item.x + offset.x),
                  Math.max(0, item.y + offset.y)
                );
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={cn(
                "absolute w-64 p-4 rounded-lg shadow-xl cursor-move select-none transition-all",
                item.color,
                selectedItem === item.id
                  ? "ring-2 ring-red-600 shadow-2xl"
                  : "hover:shadow-2xl"
              )}
              style={{ left: item.x, top: item.y }}
              onClick={() => setSelectedItem(item.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 text-sm flex-1 pr-2">
                  {item.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(item.id);
                  }}
                  className="text-gray-700 hover:text-red-600 transition-colors"
                >
                  <IconX size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-800 line-clamp-4">{item.content}</p>
              {selectedItem === item.id && (
                <div className="mt-3 pt-3 border-t border-gray-400 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addConnection();
                    }}
                    className="text-xs bg-gray-700 hover:bg-gray-800 text-white px-2 py-1 rounded transition-colors flex items-center gap-1"
                  >
                    <IconArrowRight size={12} />
                    Connect
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
            <div className="text-center">
              <IconClipboard size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-sm">Drag documents here and create connections</p>
              <p className="text-xs mt-2">Build your investigation evidence board</p>
            </div>
          </div>
        )}
      </div>

      {/* Note Modal */}
      <AnimatePresence>
        {showNoteModal && (
          <AddNoteModal
            onAdd={addNote}
            onClose={() => setShowNoteModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AddNoteModal({
  onAdd,
  onClose,
}: {
  onAdd: (title: string, content: string) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      onAdd(title, content);
      setTitle("");
      setContent("");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 z-30"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-800 rounded-lg p-6 w-96 z-40 border border-zinc-700"
      >
        <h3 className="text-lg font-bold text-white mb-4">Add Investigation Note</h3>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded mb-3 text-white placeholder-zinc-400 text-sm"
        />
        <textarea
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded mb-4 text-white placeholder-zinc-400 text-sm"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors font-medium"
          >
            Add Note
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
