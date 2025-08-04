import { useState } from "react";
import { Chips, Chip } from "./Chips";
import "./app.css"

export interface ChipsData {
  id: number,
  name: string,
}

export const allChips: ChipsData[] = [
  { name: "Чипс 1", id: 1 },
  { name: "Чипс 2", id: 2 },
  { name: "Чипс 3", id: 3 },
  { name: "Чипс 4", id: 4 },
  { name: "Чипс 5", id: 5 },
  { name: "Чипс 6", id: 6 },
  { name: "Чипс 7", id: 7 },
  { name: "Чипс 8", id: 8 },
  { name: "Чипс 9", id: 9 },
  { name: "Чипс 10", id: 10 },
  { name: "Чипс 11", id: 11 },
  { name: "Чипс 12", id: 12 },
  { name: "Чипс 13", id: 13 },
  ];

const App = () => {
  const [selectedChip, setSelectedChip] = useState<string[]>([]);
  const [singleSelectedChip, setSingleSelectedChip] = useState<string | null>(null);

  const handleSingleChipClick = () => {
    if (singleSelectedChip === "Отдельный чип") {
      setSingleSelectedChip(null);
    } else {
      setSingleSelectedChip("Отдельный чип");
    }
  };

  return (
    <div className="main">
      <h2>Chips</h2>
      
      {/* Полнофункциональный компонент */}
      <Chips 
        items={allChips} 
        selectedItems={selectedChip} 
        onSelect={setSelectedChip}
      />
      
      {/* Пример использования чиспа отдельно от списка */}
      <div className="container-chip">
        <h3>Отдельный чип</h3>
        <Chip 
          label="Отдельный чип" 
          isSelected={singleSelectedChip === "Отдельный чип"}
          onClick={handleSingleChipClick}
        />
      </div>
    </div>
  );
};

export default App;