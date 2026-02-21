"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { DocumentCard } from "./DocumentCard";
import { Post } from "@/lib/types";
import { CATEGORY_COLORS } from "@/lib/types";
import { IconFilter, IconX } from "@tabler/icons-react";

interface DocumentFeedProps {
  posts: Post[];
}

export function DocumentFeed({ posts }: DocumentFeedProps) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(12);

  // Get unique categories and people
  const categories = Array.from(
    new Set(posts.map((p) => p.document_type).filter(Boolean))
  ) as string[];

  const allPeople = Array.from(
    new Set(posts.flatMap((p) => p.key_people_names || []))
  );

  // Filter logic
  useEffect(() => {
    let result = posts;

    if (selectedCategory) {
      result = result.filter((p) => p.document_type === selectedCategory);
    }

    if (selectedPerson) {
      result = result.filter((p) =>
        p.key_people_names?.includes(selectedPerson)
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.summary?.toLowerCase().includes(query) ||
          p.key_topics?.some((t) => t.toLowerCase().includes(query)) ||
          p.key_people_names?.some((n) => n.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(result);
    setDisplayedCount(12);
  }, [selectedCategory, selectedPerson, searchQuery, posts]);

  const loadMore = useCallback(() => {
    setDisplayedCount((prev) => Math.min(prev + 12, filteredPosts.length));
  }, [filteredPosts.length]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedPerson(null);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategory || selectedPerson || searchQuery;

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search documents, people, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
            >
              <IconX size={18} />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            <IconFilter size={18} />
            Filters {hasActiveFilters && `(${1 + (selectedPerson ? 1 : 0) + (selectedCategory ? 1 : 0)})`}
          </motion.button>

          {hasActiveFilters && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-500 transition-colors"
            >
              Clear all filters
            </motion.button>
          )}

          <span className="text-sm text-zinc-500 ml-auto">
            {filteredPosts.length} documents
          </span>
        </div>

        {/* Filter Panels */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg"
          >
            {/* Categories */}
            <div>
              <h4 className="text-xs font-semibold text-white mb-3 uppercase">
                Document Type
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() =>
                        setSelectedCategory(selectedCategory === cat ? null : cat)
                      }
                      className="w-4 h-4 accent-red-600"
                    />
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          CATEGORY_COLORS[cat] || CATEGORY_COLORS.default,
                      }}
                    />
                    <span className="text-sm text-zinc-300">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* People */}
            <div>
              <h4 className="text-xs font-semibold text-white mb-3 uppercase">
                Key People
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {allPeople.slice(0, 10).map((person) => (
                  <label key={person} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="person"
                      checked={selectedPerson === person}
                      onChange={() =>
                        setSelectedPerson(selectedPerson === person ? null : person)
                      }
                      className="w-4 h-4 accent-red-600"
                    />
                    <span className="text-sm text-zinc-300">{person}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.slice(0, displayedCount).map((post) => (
          <DocumentCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load More */}
      {displayedCount < filteredPosts.length && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={loadMore}
          className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-red-600 text-white rounded-lg transition-all duration-300 font-medium"
        >
          Load More ({filteredPosts.length - displayedCount} remaining)
        </motion.button>
      )}

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-500 mb-2">No documents found</p>
          <p className="text-xs text-zinc-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
