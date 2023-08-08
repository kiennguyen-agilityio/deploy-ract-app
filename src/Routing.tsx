import { Routes, Route } from 'react-router-dom';

// constants
import ROUTE from './constants/route';

// pages
import Homepage from './pages/HomePage';
import TranslationPage from './pages/TranslationPage';

const Routing: React.FC = () => (
  <Routes>
    <Route path={ROUTE.HOMEPAGE} element={<Homepage />} />
    <Route path={ROUTE.VOCABULARY_DETAIL(':topicId')} element={<TranslationPage />} />
  </Routes>
);

export default Routing;
