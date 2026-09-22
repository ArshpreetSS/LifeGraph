"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, Command } from "lucide-react";
import { searchAllKnowledge, EntityType } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntity?: (id: string, type: EntityType) => void;
}

export function GlobalSearch({ isOpen, onClose, onSelectEntity }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = searchAllKnowledge(query, activeCategory);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (item: (typeof results)[0]) => {
    onClose();
    if (onSelectEntity) {
      onSelectEntity(item.id, item.type);
    } else {
      router.push(item.route);
    }
  };

  if (!isOpen) return null;

  const categories = ["All", "Projects", "Skills", "Goals", "Documents", "Learning"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start pointer-events-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0B0E12] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-[#0E1217]">
          <Search className="w-5 h-5 text-[#A1A1AA] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search your knowledge, projects, skills, documents..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[#71717A] focus:outline-hidden font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-[#71717A] hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 rounded bg-white/[0.06] border border-white/10 text-[10px] font-mono text-[#A1A1AA]">
            ESC
          </kbd>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/[0.06] bg-[#07090C] overflow-x-auto text-xs font-mono scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full uppercase tracking-wider text-[10px] transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#D4FF00] text-black font-semibold shadow-[0_0_12px_rgba(212,255,0,0.2)]"
                  : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Sparkles className="w-6 h-6 text-[#71717A] mx-auto opacity-40" />
              <p className="text-xs font-mono text-[#71717A] uppercase tracking-wider">
                No matching knowledge found
              </p>
              <p className="text-xs text-slate-500">
                Try searching for &quot;Python&quot;, &quot;LifeGraph&quot;, &quot;Three.js&quot;, or &quot;Computer Vision&quot;
              </p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group px-3.5 py-3 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-white/[0.06] border-white/20 shadow-lg"
                      : "border-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-semibold text-white tracking-tight truncate">
                        {item.name}
                      </span>
                      <Badge entityType={item.type}>{item.type}</Badge>
                      <span className="text-[11px] font-mono text-[#71717A] truncate">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono text-[#D4FF00]">
                        {item.connectionsCount} links
                      </span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 text-[#71717A] transition-transform ${
                          isSelected ? "translate-x-0.5 text-[#D4FF00]" : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-1 mb-2">
                    {item.description}
                  </p>

                  {/* Connected Relationship Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] font-mono uppercase text-[#71717A]">
                        Related:
                      </span>
                      {item.tags.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] text-slate-300 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 4 && (
                        <span className="text-[10px] text-[#71717A] font-mono">
                          +{item.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-white/[0.08] bg-[#0A0D10] flex items-center justify-between text-[11px] font-mono text-[#71717A]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[9px] text-[#A1A1AA]">↑↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3 text-[#A1A1AA]" />
              <span>Select</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="w-3 h-3 text-[#A1A1AA]" />
            <span>K to toggle anywhere</span>
          </div>
        </div>

      </div>
    </div>
  );
}
