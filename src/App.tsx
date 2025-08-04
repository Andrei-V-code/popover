import { useState } from "react";
import { Chips, Chip } from "./Chips";
import "./app.css"

export const allChips: string[] = [
    "Чипс 1",
    "Чипс 2",
    "Чипс 3",
    "Чипс 4",
    "Чипс 5",
    "Чипс 6",
    "Чипс 7",
    "Чипс 8",
    "Чипс 9",
    "Чипс 10",
    "Чипс 11",
    "Чипс 12",
    "Чипс 13",
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