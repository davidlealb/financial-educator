import { Trash2, Github, AlertTriangle } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export default function Settings() {
    const { resetProgress, state } = useProgress();

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
            resetProgress();
            alert('Progress reset.');
        }
    };

    return (
        <div className="space-y-6">
            <header className="mb-6 pt-4">
                <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
                <p className="text-text-secondary">Manage your preferences.</p>
            </header>

            <div className="bg-surface rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                    <h3 className="font-semibold text-text-primary">Data Management</h3>
                </div>

                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-text-primary">Reset Progress</p>
                            <p className="text-xs text-text-muted">Current XP: {state.xp}</p>
                        </div>
                        <button
                            onClick={handleReset}
                            className="flex items-center space-x-2 text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                        >
                            <Trash2 size={16} />
                            <span>Reset Data</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-orange-50 rounded-xl border border-orange-200 p-4 flex items-start space-x-3">
                <AlertTriangle className="text-orange-500 shrink-0" size={20} />
                <div className="text-sm text-orange-800">
                    <p className="font-bold">Note on Persistence</p>
                    <p className="mt-1">
                        Your progress is stored in this browser's Local Storage. If you clear your browser data or use a different device, your progress will be lost.
                    </p>
                </div>
            </div>

            <div className="text-center text-text-muted text-sm pt-8">
                <p>Financial Educator v1.0.0</p>
            </div>
        </div>
    );
}
