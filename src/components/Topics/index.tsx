// contexts
import { useTopicContext } from '@/contexts/TopicContext';

import { Link } from 'react-router-dom';

// constants
import ROUTE from '@/constants/route';
// interfaces
import { Topic } from 'interfaces/topic';

// components
import Button from '@/components/Button/index';
import LoadingSpinner from '@/components/LoadingSpinner/index';

// styles
import './index.css';

const Topics = () => {
  const { topics, isAdding } = useTopicContext();

  return (
    <div>
      {isAdding ? (
        <LoadingSpinner data-testid="loading-spinner" />
      ) : (
        <ul className="topic-list" data-testid="topic-item">
          {topics.map(({ id, name, quantity }: Topic) => (
            <li key={id}>
              <Link to={ROUTE.VOCABULARY_DETAIL(id)}>
                <Button label={name} variant="primary" count={quantity} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Topics;
