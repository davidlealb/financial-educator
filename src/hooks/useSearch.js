import { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';

/**
 * Custom hook for fuzzy search across lesson objects.
 * @param {Array} lessons - Array of lesson objects. 
 * @returns {Object} Search state and handlers.
 */
export function useSearch(lessons) {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState(() => {
        try {
            const saved = localStorage.getItem('recentSearches');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to load recent searches', e);
            return [];
        }
    });

    // Debounce the search input by 150ms
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 150);
        return () => clearTimeout(timer);
    }, [query]);

    // Memoize the Fuse instance for performance
    const fuse = useMemo(() => {
        const options = {
            keys: [
                { name: 'title', weight: 0.7 },
                { name: 'description', weight: 0.5 },
                { name: 'content.text', weight: 0.3 }
            ],
            threshold: 0.3,
            ignoreLocation: true, // Search anywhere in the text
            includeMatches: true
        };
        return new Fuse(lessons, options);
    }, [lessons]);

    // Compute results based on debounced query
    const results = useMemo(() => {
        const trimmedQuery = debouncedQuery.trim();
        if (!trimmedQuery) return [];
        return fuse.search(trimmedQuery).map(r => r.item);
    }, [debouncedQuery, fuse]);

    // Persist successful search terms (last 5)
    useEffect(() => {
        const trimmedQuery = debouncedQuery.trim();
        // Save only if query is at least 4 characters and has results
        if (trimmedQuery.length >= 4 && results.length > 0) {
            setRecentSearches(prev => {
                const filtered = prev.filter(t => t.toLowerCase() !== trimmedQuery.toLowerCase());
                const updated = [trimmedQuery, ...filtered].slice(0, 5);
                localStorage.setItem('recentSearches', JSON.stringify(updated));
                return updated;
            });
        }
    }, [debouncedQuery, results.length]);

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    return {
        query,
        setQuery,
        results,
        recentSearches,
        isSearching: !!debouncedQuery.trim(),
        clearRecentSearches
    };
}
