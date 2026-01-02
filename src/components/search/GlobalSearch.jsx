import React, { useMemo } from 'react';
import { useSearch } from '../../hooks/useSearch';
import lessons from '../../data/lessons';
import LessonCard from '../lessons/LessonCard';
import { Search, X, Clock, AlertCircle } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

// Level 1 lesson IDs as defined in LearningPath
const LEVEL_1_IDS = [
    'opening-first-account',
    'banking-basics',
    'atm-savvy',
    'debit-and-etransfer',
    'your-first-credit-card'
];

/**
 * GlobalSearch Component
 * 
 * Features:
 * - Fuzzy search across all lessons using Fuse.js
 * - Live search with 150ms debounce
 * - "Level 1" default view when empty
 * - "No topics found" friendly message
 * - Recent searches persistence (last 5)
 */
export default function GlobalSearch() {
    const { state } = useProgress();
    const {
        query,
        setQuery,
        results,
        recentSearches,
        isSearching
    } = useSearch(lessons);

    // Default view lessons (Level 1)
    const level1Lessons = useMemo(() => {
        return LEVEL_1_IDS
            .map(id => lessons.find(l => l.id === id))
            .filter(Boolean);
    }, []);

    // Helper to get lesson status from progress context
    const getLessonStatus = (lessonId) => {
        if (state.completedLessons.includes(lessonId)) return 'completed';
        // Everything else is 'active' for the search/recommendation view
        return 'active';
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8 px-4">
            {/* Search Bar container */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Search
                        className="text-text-muted group-focus-within:text-primary transition-colors"
                        size={22}
                    />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for lessons, topics, or keywords..."
                    className="w-full pl-14 pr-12 py-5 bg-surface border-2 border-slate-100 rounded-[2rem] outline-none 
                               shadow-sm focus:border-primary/30 focus:ring-8 focus:ring-primary/5 
                               transition-all text-text-primary text-lg placeholder:text-text-muted/60"
                />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        className="absolute inset-y-0 right-0 pr-5 flex items-center"
                        aria-label="Clear search"
                    >
                        <div className="p-1.5 hover:bg-slate-100 rounded-full text-text-muted hover:text-text-primary transition-colors">
                            <X size={20} />
                        </div>
                    </button>
                )}
            </div>

            {/* Content Area */}
            <div className="space-y-6">
                {!isSearching ? (
                    <>
                        {/* Recent Searches Section */}
                        {recentSearches.length > 0 && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock size={16} className="text-text-muted" />
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                                        Recent Searches
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {recentSearches.map((term, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setQuery(term)}
                                            className="px-4 py-2 bg-surface hover:bg-slate-50 border border-slate-200 
                                                       text-text-secondary text-sm font-semibold rounded-xl 
                                                       transition-all hover:border-primary/20 hover:text-primary"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Level 1 - Default Recommendations */}
                        <div className="animate-in fade-in duration-700">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                                    Newcomer Survival Guide (Level 1)
                                </h2>
                                <span className="text-[10px] font-bold text-sky-blue bg-sky-blue/10 px-2 py-1 rounded-md">
                                    RECOMMENDED
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {level1Lessons.map(lesson => (
                                    <LessonCard
                                        key={lesson.id}
                                        lesson={lesson}
                                        status={getLessonStatus(lesson.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                ) : results.length > 0 ? (
                    /* Search Results Section */
                    <div className="animate-in fade-in duration-400">
                        <div className="flex items-center justify-between mb-5 px-1">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                                Found {results.length} matched lessons
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {results.map(lesson => (
                                <LessonCard
                                    key={lesson.id}
                                    lesson={lesson}
                                    status={getLessonStatus(lesson.id)}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Empty "No Results" State */
                    <div className="py-20 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-white shadow-sm rounded-3xl flex items-center justify-center mx-auto mb-6 text-text-muted/40">
                            <AlertCircle size={40} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">No topics found</h3>
                        <p className="text-text-secondary text-base max-w-sm mx-auto px-4">
                            We couldn't find any matches for <span className="text-primary font-semibold">"{query}"</span>.
                            Try checking your spelling or using more general terms.
                        </p>
                        <button
                            onClick={() => setQuery('')}
                            className="mt-8 px-6 py-2 text-primary font-bold text-sm bg-primary/5 hover:bg-primary/10 rounded-full transition-colors"
                        >
                            Reset Search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
