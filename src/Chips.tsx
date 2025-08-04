import { Popover } from "@mui/material";
import { FC, MouseEvent, RefObject, useCallback, useEffect, useRef, useState } from "react";
import "./chips.css"
import { ChipsData } from "./App";

interface ChipsProps {
  items: ChipsData[];
  selectedItems?: string[];
  onSelect?: (items: string[]) => void;
  maxVisibleItems?: number;
}

interface ChipProps {
  label: string;
  isSelected?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const useChipsOverflow = (
  containerRef: RefObject<HTMLElement | null>,
  items: ChipsData[],
) => {
  const [visibleItems, setVisibleItems] = useState<ChipsData[]>([]);
  const [hiddenItems, setHiddenItems] = useState<ChipsData[]>([]);

  const calculateVisibleItems = useCallback(() => {
    if (!containerRef.current || items.length === 0) {
      setVisibleItems(items);
      setHiddenItems([]);
      return;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const chipElements = containerRef.current.querySelectorAll("#chip");
    const newVisibleItems: ChipsData[] = [];
    const newHiddenItems: ChipsData[] = [];
    let totalWidth = 0;
    const moreButtonWidth = 60;
    
    let i = 0;
    for (const item of items) {
      const chipElement = chipElements[i] as HTMLElement;
      const chipWidth = chipElement?.offsetWidth || 80;
      const spacing = i > 0 ? 8 : 0;
      
      if (totalWidth + chipWidth + spacing + moreButtonWidth <= containerWidth) {
        newVisibleItems.push(item);
        totalWidth += chipWidth + spacing;
      } else {
        newHiddenItems.push(item);
      }
      i++;
    }

    setVisibleItems(newVisibleItems);
    setHiddenItems(newHiddenItems);
  }, [containerRef, items]);

  useEffect(() => {
    calculateVisibleItems();
    window.addEventListener("resize", calculateVisibleItems);
    return () => window.removeEventListener("resize", calculateVisibleItems);
  }, [calculateVisibleItems]);

  return { visibleItems, hiddenItems };
};

export const Chip: FC<ChipProps> = ({ label, isSelected, onClick }) => {
  return (
    <button
      id="chip"
      onClick={onClick}
      className={`btn ${isSelected ? "btn-active" : "btn-inactive"}`}
    >
      {label}
    </button>
  );
};

export const Chips: FC<ChipsProps> = ({
  items,
  selectedItems = [],
  onSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { visibleItems, hiddenItems } = useChipsOverflow(
    containerRef,
    items
  );

  const handleMoreClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item: string) => {
    const newSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter(i => i !== item)
      : [...selectedItems, item];
    
    onSelect?.(newSelectedItems);
  };

  return (
    <div ref={containerRef} className="container">
      {visibleItems.map((item) => (
        <Chip
          key={item.id}
          label={item.name}
          isSelected={selectedItems.includes(item.name)}
          onClick={() => handleItemClick(item.name)}
        />
      ))}

      {hiddenItems.length > 0 && (
        <>
          <Chip label="..." onClick={handleMoreClick} />
          <Popover
            id={Boolean(anchorEl) ? "simple-popover" : undefined}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div className="hidden-items">
              {hiddenItems.map((item) => (
                <Chip
                  key={item.id}
                  label={item.name}
                  isSelected={selectedItems.includes(item.name)}
                  onClick={() => handleItemClick(item.name)}
                />
              ))}
            </div>
          </Popover>
        </>
      )}
    </div>
  );
};