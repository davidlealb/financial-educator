import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X, Loader2, ArrowRight, History } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { useSearch } from '../../hooks/useSearch';
import { useLessons } from '../../hooks/useLessons';

const LEVEL_1_IDS = [
    'opening-first-account',
    'banking-basics',
    'atm-savvy',
    'debit-and-etransfer',
    'your-first-credit-card'
];

export default function GlobalSearch() {
    const { t } = useTranslation();
    const { state } = useProgress();
    const { lessons, loading } = useLessons();
    const {
        query,
        setQuery,
        results,
        recentSearches,
        isSearching,
        clearRecentSearches
    } = useSearch(lessons);

    const [isFocused, setIsFocused] = useState(false);

    // Filter Level 1 lessons for recommendations
    const level1Lessons = useMemo(() => {
        return LEVEL_1_IDS
            .map(id => lessons.find(l => l.id === id))
            .filter(Boolean);
    }, [lessons]);

    const getLessonStatus = (lessonId) => {
        if (state.completedLessons.includes(lessonId)) return 'completed';
        return 'active';
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
                <Loader2 className="text-primary animate-spin mb-4" size={32} />
                <p className="text-text-secondary font-medium">{t('common.loading')}</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto pb-24 px-4">
            {/* Search Header */}
            <div className={`sticky top-0 z-30 pt-4 pb-2 bg-background transition-all duration-300 ${isFocused ? 'pb-4' : ''}`}>
                <div className={`relative group transition-all duration-300 ${isFocused ? 'ring-2 ring-primary/20 shadow-lg' : ''}`}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder={t('common.search_placeholder')}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        className="w-full pl-12 pr-12 py-4 bg-surface border border-slate-200 rounded-3xl text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition-all text-base font-medium"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full text-text-muted transition-colors"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="mt-6 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">

                {/* Case 1: Active Search Results */}
                {isSearching ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-xs font-black uppercase tracking-widest text-text-muted">
                                {results.length} {t('common.results_found', { defaultValue: 'results found' })}
                            </h2>
                        </div>
                        {results.length > 0 ? (
                            <div className="grid gap-3">
                                {results.map((lesson) => (
                                    <SearchResultCard
                                        key={lesson.id}
                                        lesson={lesson}
                                        status={getLessonStatus(lesson.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 px-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                <p className="text-text-secondary font-medium">{t('common.no_results')} "{query}"</p>
                                <p className="text-xs text-text-muted mt-1">{t('common.try_another')}</p>
                                <button
                                    onClick={() => setQuery('')}
                                    className="mt-4 text-primary text-sm font-bold hover:underline"
                                >
                                    {t('common.clear_search', { defaultValue: 'Clear search' })}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Case 2: Recommendations / Empty State */
                    <>
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <History size={14} />
                                        <h2 className="text-xs font-black uppercase tracking-widest">{t('common.recent_searches')}</h2>
                                    </div>
                                    <button
                                        onClick={clearRecentSearches}
                                        className="text-[10px] font-bold text-text-muted hover:text-primary uppercase tracking-wider"
                                    >
                                        {t('common.clear_all', { defaultValue: 'Clear All' })}
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {recentSearches.map((term, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setQuery(term)}
                                            className="px-4 py-2 bg-surface border border-slate-200 rounded-2xl text-sm font-medium text-text-secondary hover:border-primary/30 hover:bg-primary/5 transition-all"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Level 1 Recommendations */}
                        <div className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-widest text-text-muted px-1">
                                {t('common.recommended', { defaultValue: 'Recommended for Starters' })}
                            </h2>
                            <div className="grid gap-3">
                                {level1Lessons.map((lesson) => (
                                    <SearchResultCard
                                        key={lesson.id}
                                        lesson={lesson}
                                        status={getLessonStatus(lesson.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function SearchResultCard({ lesson, status }) {
    const isCompleted = status === 'completed';

    return (
        <a
            href={`/lesson/${lesson.id}`}
            className="group flex items-center justify-between p-4 bg-surface rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all active:scale-[0.98]"
        >
            <div className="flex-1 min-w-0 pr-4">
                <h3 className="font-bold text-text-primary text-base mb-0.5 truncate group-hover:text-primary transition-colors">
                    {lesson.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-1">
                    {lesson.description}
                </p>
            </div>

            <div className="flex-shrink-0 flex items-center gap-3">
                {isCompleted && (
                    <span className="w-5 h-5 bg-emerald-green rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                        <ArrowRight size={12} className="text-white" strokeWidth={3} />
                    </span>
                )}
                {!isCompleted && (
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <ArrowRight size={16} />
                    </div>
                )}
            </div>
        </a>
    );
}
