"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { Sidebar } from "@/components/app/Sidebar";
import { Topbar } from "@/components/app/Topbar";
import { MobileNav } from "@/components/app/MobileNav";
import { GlobalSearch } from "@/components/app/GlobalSearch";
import { KnowledgeDrawer } from "@/components/knowledge/KnowledgeDrawer";
import { ToastProvider } from "@/components/ui/Toast";

interface AppShellContextType {
  openDrawer: (nodeId: string) => void;
  closeDrawer: () => void;
  openSearch: () => void;
}

const AppShellContext = createContext<AppShellContextType | undefined>(undefined);

export function useAppShell() {
  const ctx = useContext(AppShellContext);
  if (!ctx) {
    return {
      openDrawer: () => {},
      closeDrawer: () => {},
      openSearch: () => {}
    };
  }
  return ctx;
}

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedDrawerNodeId, setSelectedDrawerNodeId] = useState<string | null>(null);

  // Global keyboard shortcuts (Cmd+K, Ctrl+K, /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger search if typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "/") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openDrawer = (nodeId: string) => {
    setSelectedDrawerNodeId(nodeId);
  };

  const closeDrawer = () => {
    setSelectedDrawerNodeId(null);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  return (
    <ToastProvider>
      <AppShellContext.Provider value={{ openDrawer, closeDrawer, openSearch }}>
        <div className="flex min-h-screen bg-[#070809] text-[#F5F5F7]">
          {/* Persistent Minimal Desktop Sidebar */}
          <Sidebar />

          {/* Main Work Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Unified Topbar */}
            <Topbar
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenMobileMenu={() => setIsMobileNavOpen(true)}
            />

            {/* Page Content with safe padding for mobile bottom bar */}
            <main className="flex-1 flex flex-col min-h-0 pb-16 lg:pb-0">
              {children}
            </main>

            {/* Mobile Bottom Navigation Bar */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 h-14 bg-[#0A0D11]/95 backdrop-blur-md border-t border-white/[0.08] px-4 flex items-center justify-around text-[10px] font-mono uppercase tracking-wider">
              <a
                href="/dashboard"
                className="flex flex-col items-center gap-1 text-[#A1A1AA] hover:text-white"
              >
                <span className="w-1 h-1 rounded-full bg-[#D4FF00]" />
                <span>Dash</span>
              </a>
              <a
                href="/explore"
                className="flex flex-col items-center gap-1 text-[#A1A1AA] hover:text-[#D4FF00]"
              >
                <span>Explore</span>
              </a>
              <a
                href="/knowledge"
                className="flex flex-col items-center gap-1 text-[#A1A1AA] hover:text-white"
              >
                <span>Nodes</span>
              </a>
              <a
                href="/ask"
                className="flex flex-col items-center gap-1 text-[#A1A1AA] hover:text-[#D4FF00]"
              >
                <span>Ask AI</span>
              </a>
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="flex flex-col items-center gap-1 text-[#A1A1AA] hover:text-white"
              >
                <span>Menu</span>
              </button>
            </nav>
          </div>

          {/* Mobile Navigation Drawer */}
          <MobileNav
            isOpen={isMobileNavOpen}
            onClose={() => setIsMobileNavOpen(false)}
          />

          {/* Global Search Modal */}
          <GlobalSearch
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectEntity={(id) => {
              setIsSearchOpen(false);
              setSelectedDrawerNodeId(id);
            }}
          />

          {/* Reusable Entity Detail Drawer */}
          <KnowledgeDrawer
            nodeId={selectedDrawerNodeId}
            onClose={closeDrawer}
            onSelectNode={(id) => setSelectedDrawerNodeId(id)}
          />
        </div>
      </AppShellContext.Provider>
    </ToastProvider>
  );
}
