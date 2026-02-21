"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconExternalLink,
  IconCalendar,
  IconUsers,
  IconTags,
} from "@tabler/icons-react";
import { Post } from "@/lib/types";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/types";

interface DocumentCardProps {
  post: Post;
}

export function DocumentCard({ post }: DocumentCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedDocs") || "[]"
    );
    setIsBookmarked(bookmarks.includes(post.id));
  }, [post.id]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedDocs") || "[]"
    );
    if (isBookmarked) {
      const updated = bookmarks.filter((id: string) => id !== post.id);
      localStorage.setItem("bookmarkedDocs", JSON.stringify(updated));
    } else {
      bookmarks.push(post.id);
      localStorage.setItem("bookmarkedDocs", JSON.stringify(bookmarks));
    }
    setIsBookmarked(!isBookmarked);
  };

  const categoryColor =
    CATEGORY_COLORS[post.document_type || "default"] ||
    CATEGORY_COLORS.default;
  const categoryIcon =
    CATEGORY_ICONS[post.document_type || "default"] ||
    CATEGORY_ICONS.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-zinc-800/50 border border-zinc-700 rounded-lg overflow-hidden hover:border-red-600/50 transition-all duration-300 group h-full flex flex-col"
    >
      {/* Header with category badge */}
      <div className="p-4 border-b border-zinc-700">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-2"
              style={{ backgroundColor: categoryColor + "20" }}
            >
              {categoryIcon}
            </div>
            <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-red-400 transition-colors">
              {post.title}
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleBookmark}
            className="text-zinc-400 hover:text-red-600 transition-colors"
          >
            {isBookmarked ? (
              <IconBookmarkFilled size={20} className="text-red-600" />
            ) : (
              <IconBookmark size={20} />
            )}
          </motion.button>
        </div>

        {/* Document type badge */}
        <div className="inline-block">
          <span
            className="text-xs px-2 py-1 rounded-full text-white font-medium"
            style={{ backgroundColor: categoryColor }}
          >
            {post.document_type || "Document"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        {post.summary && (
          <p className="text-sm text-zinc-400 line-clamp-3 mb-4">
            {post.summary}
          </p>
        )}

        {/* Metadata */}
        <div className="space-y-2 text-xs text-zinc-500">
          {post.document_date && (
            <div className="flex items-center gap-2">
              <IconCalendar size={14} />
              <span>{new Date(post.document_date).toLocaleDateString()}</span>
            </div>
          )}

          {post.key_people_names && post.key_people_names.length > 0 && (
            <div className="flex items-start gap-2">
              <IconUsers size={14} className="mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">
                {post.key_people_names.slice(0, 3).join(", ")}
                {post.key_people_names.length > 3 && "..."}
              </span>
            </div>
          )}

          {post.key_topics && post.key_topics.length > 0 && (
            <div className="flex items-start gap-2">
              <IconTags size={14} className="mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">
                {post.key_topics.slice(0, 3).join(", ")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-700 flex items-center justify-between gap-2">
        <span className="text-xs text-zinc-500">
          {post.page_count} {post.page_count === 1 ? "page" : "pages"}
        </span>
        <Link
          href={`/post/${post.id}`}
          className="flex items-center gap-2 text-xs font-medium text-red-600 hover:text-red-500 transition-colors"
        >
          View Details
          <IconExternalLink size={14} />
        </Link>
      </div>
    </motion.div>
  );
}
