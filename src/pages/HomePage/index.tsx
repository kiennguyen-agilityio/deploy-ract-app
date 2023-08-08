import { useState } from 'react';

// components
import Button from '@/components/Button/index';
import Topic from '@/components/Topics/index';
import AddNewModal from '@/components/AddNewModal/index';

//styles
import './index.css';

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="homepage-container">
      <h1>Add &amp; Select Topic</h1>
      <h2>Please choose a topic or create a topic</h2>
      <div className="button-topic-container">
        <Topic />
        <Button label="Add Topic" variant="secondary" onClick={handleOpenModal} />
      </div>

      {isModalOpen && <AddNewModal onClose={handleCloseModal} />}
    </div>
  );
};

export default HomePage;
