// import react
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// contexts
import { TopicProvider } from './contexts/TopicContext';

import Routing from './Routing';
import { VocabularyProvider } from './contexts/VocabularyContext';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <TopicProvider>
          <VocabularyProvider>
            <Routing />
          </VocabularyProvider>
        </TopicProvider>
      </Router>
    </div>
  );
};

export default App;
