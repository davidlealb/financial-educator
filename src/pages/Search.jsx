import React from 'react';
import GlobalSearch from '../components/search/GlobalSearch';

export default function Search() {
    return (
        <div className="pb-8">
            <header className="mb-8 pt-4">
                <h1 className="text-2xl font-bold text-text-primary px-1">Discover Topics</h1>
                <p className="text-text-secondary text-sm px-1 mt-1">
                    Find the information you need to thrive in Canada
                </p>
            </header>

            <GlobalSearch />
        </div>
    );
}
