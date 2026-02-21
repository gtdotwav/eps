"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  IconTrophy,
  IconFlame,
  IconTarget,
  IconBooks,
  IconAward,
  IconClock,
} from "@tabler/icons-react";

interface ProgressTrackerProps {
  totalDocuments: number;
}

export function ProgressTracker({ totalDocuments }: ProgressTrackerProps) {
  const [readDocuments, setReadDocuments] = useState(0);
  const [bookmarkedDocuments, setBookmarkedDocuments] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    // Load progress from localStorage
    const read = parseInt(localStorage.getItem("readDocuments") || "0");
    setReadDocuments(read);

    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedDocs") || "[]"
    );
    setBookmarkedDocuments(bookmarks.length);

    // Calculate achievements
    const newAchievements: string[] = [];
    if (read >= 5) newAchievements.push("First Readings");
    if (read >= 10) newAchievements.push("Document Digest");
    if (read >= 20) newAchievements.push("Case Scholar");
    if (read >= 33) newAchievements.push("Complete Archive");
    if (bookmarks.length >= 5) newAchievements.push("Key Evidence");
    if (bookmarks.length >= 10) newAchievements.push("Master Collector");

    setAchievements(newAchievements);
  }, []);

  const completionPercent = Math.round((readDocuments / totalDocuments) * 100);
  const bookmarkPercent = Math.round((bookmarkedDocuments / totalDocuments) * 100);

  const allAchievements = [
    {
      id: "first-readings",
      name: "First Readings",
      description: "Read 5 documents",
      icon: "📖",
      unlocked: achievements.includes("First Readings"),
    },
    {
      id: "document-digest",
      name: "Document Digest",
      description: "Read 10 documents",
      icon: "📚",
      unlocked: achievements.includes("Document Digest"),
    },
    {
      id: "case-scholar",
      name: "Case Scholar",
      description: "Read 20 documents",
      icon: "🎓",
      unlocked: achievements.includes("Case Scholar"),
    },
    {
      id: "complete-archive",
      name: "Complete Archive",
      description: "Read all 33 documents",
      icon: "🏆",
      unlocked: achievements.includes("Complete Archive"),
    },
    {
      id: "key-evidence",
      name: "Key Evidence",
      description: "Bookmark 5 documents",
      icon: "📌",
      unlocked: achievements.includes("Key Evidence"),
    },
    {
      id: "master-collector",
      name: "Master Collector",
      description: "Bookmark 10+ documents",
      icon: "⭐",
      unlocked: achievements.includes("Master Collector"),
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-20 md:pt-0">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Investigation Progress
          </h1>
          <p className="text-zinc-400 text-lg">
            Track your case studies and discover achievements
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Documents Read */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase">
                Documents Read
              </h3>
              <IconBooks className="text-red-600" size={24} />
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold text-white">
                {readDocuments}
                <span className="text-lg text-zinc-500">/{totalDocuments}</span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                {completionPercent}% of archive
              </p>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-red-600 to-red-500"
              />
            </div>
          </motion.div>

          {/* Bookmarked */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase">
                Bookmarked Evidence
              </h3>
              <IconTarget className="text-blue-600" size={24} />
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold text-white">
                {bookmarkedDocuments}
                <span className="text-lg text-zinc-500">/{totalDocuments}</span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                {bookmarkPercent}% saved
              </p>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${bookmarkPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-600 to-blue-500"
              />
            </div>
          </motion.div>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase">
                Active Days
              </h3>
              <IconFlame className="text-orange-600" size={24} />
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold text-white">
                {readDocuments > 0 ? "1" : "0"}
              </div>
              <p className="text-xs text-zinc-500 mt-1">days active</p>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: readDocuments > 0 ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-orange-600 to-orange-500"
              />
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <IconAward size={28} className="text-yellow-500" />
            Achievements
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {allAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border transition-all ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-zinc-700 to-zinc-800 border-yellow-600"
                    : "bg-zinc-800/30 border-zinc-700 opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h3 className="font-bold text-white text-sm">
                  {achievement.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <div className="mt-3 flex items-center gap-1 text-xs text-yellow-500">
                    <span>✓ Unlocked</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="p-6 bg-zinc-800/30 border border-zinc-700 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <IconClock size={24} />
            How Progress Works
          </h2>
          <p className="text-zinc-300 text-sm mb-4">
            Your investigation progress is tracked automatically as you interact with
            documents and evidence:
          </p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex gap-3">
              <span className="text-red-600 font-bold">•</span>
              <span>
                <strong className="text-white">Documents Read:</strong> Visit a
                document's detail page to mark it as read
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong className="text-white">Bookmarked Evidence:</strong> Click
                the bookmark icon on any document to save it
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-600 font-bold">•</span>
              <span>
                <strong className="text-white">Achievements:</strong> Unlock badges
                by reaching reading milestones and collecting evidence
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
