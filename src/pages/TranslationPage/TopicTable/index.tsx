import { useState } from 'react';

// interfaces
import { Vocabulary } from 'interfaces/topic';

// components
import TableHeader from '@/components/Table/TableHeader';
import TableBody from '@/components/Table/TableBody';
import TableRow from '@/components/Table/TableRow';
import TableCell from '@/components/Table/TableCell';
import Action from '@/components/Table/ActionTable';
import Table from '@/components/Table';
import ConfirmModal from '@/components/Modal/index';

// styles
import './index.css';

export interface Props {
  topicId: string;
  onDelete: (vocabularyId: string) => void;
  vocabularies: Vocabulary[];
}

const TopicTable: React.FC<Props> = ({ vocabularies, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVocabularyId, setSelectedVocabularyId] = useState<string>('');

  const handleDelete = (id: string) => {
    setSelectedVocabularyId(id);
    setIsOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(selectedVocabularyId);
    setIsOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="table-container">
      <Table>
        <TableHeader />
        <TableBody>
          {vocabularies.map(({ id, firstLanguage, secondLanguage }: Vocabulary, index: number) => (
            <TableRow key={id}>
              <TableCell value={index + 1} />
              <TableCell value={firstLanguage} />
              <TableCell value={secondLanguage} />
              <TableCell value={''}>
                <Action onDelete={() => handleDelete(id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmModal
        isOpen={isOpen}
        onClose={handleDeleteCancel}
        title="Delete Vocabulary"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default TopicTable;
