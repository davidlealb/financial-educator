import { useTranslation } from 'react-i18next';
import { BookOpen, Search, Calculator, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, icon, label }) => {
    const Icon = icon;
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-deep-navy' : 'text-text-muted hover:text-text-secondary'
                }`
            }
        >
            {({ isActive }) => (
                <>
                    {isActive && (
                        <span className="absolute top-2 right-1/2 translate-x-3 w-1.5 h-1.5 bg-emerald-green rounded-full" />
                    )}
                    <Icon size={24} />
                    <span className="text-xs font-medium">{label}</span>
                </>
            )}
        </NavLink>
    );
};

export default function BottomNav() {
    const { t } = useTranslation();
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-slate-200 z-50 pb-safe">
            <div className="flex justify-around items-center h-full max-w-md mx-auto">
                <NavItem to="/" icon={BookOpen} label={t('common.learn')} />
                <NavItem to="/search" icon={Search} label={t('common.search')} />
                <NavItem to="/calculators" icon={Calculator} label={t('common.calculators')} />
                <NavItem to="/settings" icon={Settings} label={t('common.settings')} />
            </div>
        </nav>
    );
}
