import { Download } from 'lucide-react';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';
import logo from '../../assets/logo.png';

export default function Header() {
    const { isInstallable, promptToInstall } = useInstallPrompt();

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-slate-200 z-50 pt-safe">
            <div className="relative flex justify-center items-center h-full max-w-md mx-auto px-4">
                <img src={logo} alt="Financial Educator" className="h-8 w-auto" />

                {isInstallable && (
                    <button
                        onClick={promptToInstall}
                        className="absolute right-4 p-2 text-primary hover:bg-slate-100 rounded-full transition-colors"
                        aria-label="Install App"
                    >
                        <Download size={24} />
                    </button>
                )}
            </div>
        </header>
    );
}
