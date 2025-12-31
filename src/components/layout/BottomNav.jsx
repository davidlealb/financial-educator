import { BookOpen, Calculator, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-primary' : 'text-text-muted hover:text-text-secondary'
            }`
        }
    >
        <Icon size={24} />
        <span className="text-xs font-medium">{label}</span>
    </NavLink>
);

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-slate-200 z-50 pb-safe">
            <div className="flex justify-around items-center h-full max-w-md mx-auto">
                <NavItem to="/" icon={BookOpen} label="Learn" />
                <NavItem to="/calculators" icon={Calculator} label="Tools" />
                <NavItem to="/settings" icon={Settings} label="Settings" />
            </div>
        </nav>
    );
}
