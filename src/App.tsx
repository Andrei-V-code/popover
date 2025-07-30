import { useState } from 'react';
import { Chips, Chip } from './Chips';

export const allChips: string[] = [
    'Чипс 1',
    'Чипс 2',
    'Чипс 3',
    'Чипс 4',
    'Чипс 5',
    'Чипс 6',
    'Чипс 7',
    'Чипс 8',
    'Чипс 9',
    'Чипс 10',
    'Чипс 11',
    'Чипс 12',
    'Чипс 13',
  ];

const App = () => {
  const [selectedChip, setSelectedChip] = useState<string | undefined>();

  return (
    <div id="main" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Chips</h2>
      
      {/* Полнофункциональный компонент */}
      <Chips 
        items={allChips} 
        selectedItem={selectedChip} 
        onSelect={setSelectedChip}
      />
      {/* Пример использования чиспа отдельно от списка */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h3>Отдельный чипс</h3>
        <Chip 
          label="Отдельный чипс" 
          isSelected={selectedChip === 'Отдельный чипс'}
          onClick={() => setSelectedChip('Отдельный чипс')}
        />
      </div>
    </div>
  );
};

export default App;