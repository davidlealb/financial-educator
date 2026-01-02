import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LearningPath from './pages/LearningPath';
import Search from './pages/Search';
import Calculators from './pages/Calculators';
import Settings from './pages/Settings';
import LessonView from './pages/LessonView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LearningPath />} />
          <Route path="search" element={<Search />} />
          <Route path="calculators" element={<Calculators />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/lesson/:lessonId" element={<LessonView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
