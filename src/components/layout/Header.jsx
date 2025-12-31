import logo from '../../assets/logo.png';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-slate-200 z-50 pt-safe">
            <div className="flex justify-center items-center h-full max-w-md mx-auto px-4">
                <img src={logo} alt="Financial Educator" className="h-8 w-auto" />
            </div>
        </header>
    );
}
