import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import Header from './Header';

export default function Layout() {
    return (
        <div className="min-h-screen bg-background pb-20 pt-16">
            <Header />
            <main className="max-w-md mx-auto min-h-screen relative p-4">
                <Outlet />
            </main>
            <BottomNav />
        </div>
    );
}
