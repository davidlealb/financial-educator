import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' },
        { code: 'fr', label: 'Français' }
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    return (
        <div className="flex items-center gap-2 bg-surface p-1 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex gap-1">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${i18n.language?.startsWith(lang.code)
                            ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                            : 'bg-slate-50 text-text-muted hover:bg-slate-100'
                            }`}
                        title={lang.label}
                    >
                        <span className="mr-1">{lang.flag}</span>
                        {lang.code}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;
