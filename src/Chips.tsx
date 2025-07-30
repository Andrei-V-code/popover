import { Popover } from "@mui/material";
import { FC, MouseEvent, RefObject, useCallback, useEffect, useRef, useState } from "react";

interface ChipsProps {
  items: string[];
  selectedItem?: string;
  onSelect?: (item: string) => void;
  maxVisibleItems?: number;
}

interface ChipProps {
  label: string;
  isSelected?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const useChipsOverflow = (
  containerRef: RefObject<HTMLElement | null>,
  items: string[],
) => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [hiddenItems, setHiddenItems] = useState<string[]>([]);

  const calculateVisibleItems = useCallback(() => {
    if (!containerRef.current || items.length === 0) {
      setVisibleItems(items);
      setHiddenItems([]);
      return;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const chipElements = containerRef.current.querySelectorAll('.chip');
    const newVisibleItems: string[] = [];
    const newHiddenItems: string[] = [];
    let totalWidth = 0;
    const moreButtonWidth = 60;

    for (let i = 0; i < items.length; i++) {
      const chipWidth = (chipElements[i] as HTMLElement)?.offsetWidth || 80;
      if (totalWidth + chipWidth + (i > 0 ? 8 : 0) + moreButtonWidth <= containerWidth) {
        newVisibleItems.push(items[i]);
        totalWidth += chipWidth + (i > 0 ? 8 : 0);
      } else {
        newHiddenItems.push(items[i]);
      }
    }

    setVisibleItems(newVisibleItems);
    setHiddenItems(newHiddenItems);
  }, [containerRef, items]);

  useEffect(() => {
    calculateVisibleItems();
    window.addEventListener('resize', calculateVisibleItems);
    return () => window.removeEventListener('resize', calculateVisibleItems);
  }, [calculateVisibleItems]);

  return { visibleItems, hiddenItems };
};

export const Chip: FC<ChipProps> = ({ label, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '4px 12px',
        margin: '0 4px',
        borderRadius: '16px',
        border: '1px solid #ccc',
        backgroundColor: isSelected ? '#52b69a' : '#e0e0e0',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        fontSize: '14px',
      }}
    >
      {label}
    </button>
  );
};

export const Chips: FC<ChipsProps> = ({
  items,
  selectedItem,
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
    onSelect?.(item);
    handleClose();
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {visibleItems.map((item) => (
        <div key={item} className="chip">
          <Chip
            label={item}
            isSelected={item === selectedItem}
            onClick={() => handleItemClick(item)}
          />
        </div>
      ))}

      {hiddenItems.length > 0 && (
        <>
          <Chip label="..." onClick={handleMoreClick} />
          <Popover
            id={Boolean(anchorEl) ? 'simple-popover' : undefined}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <div style={{ padding: '8px', display: 'grid', gridTemplateColumns: '4fr 4fr 4fr' }}>
              {hiddenItems.map((item) => (
                <div key={item} style={{ margin: '4px 0' }}>
                  <Chip
                    label={item}
                    isSelected={item === selectedItem}
                    onClick={() => handleItemClick(item)}
                  />
                </div>
              ))}
            </div>
          </Popover>
        </>
      )}
    </div>
  );
};