import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  /** Liste des choix. Une simple liste de chaînes est acceptée (value === label). */
  options: DropdownOption[] | string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Libellé visible au-dessus du champ (optionnel, sinon fournir `ariaLabel`). */
  label?: string;
  ariaLabel?: string;
  disabled?: boolean;
  /** Classes supplémentaires pour le déclencheur (ex: bordure rouge en cas d'erreur). */
  className?: string;
  id?: string;
}

function normalizeOptions(options: DropdownOption[] | string[]): DropdownOption[] {
  return options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt));
}

/**
 * Menu déroulant accessible et responsive, stylé de façon cohérente sur tout le site
 * (remplace les `<select>` natifs dont l'apparence varie selon le navigateur/OS).
 * Utilisation clavier : Entrée/Espace pour ouvrir, flèches pour naviguer, Entrée pour
 * sélectionner, Échap pour fermer. Se ferme au clic extérieur.
 */
export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Sélectionner...',
  label,
  ariaLabel,
  disabled = false,
  className = '',
  id,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const dropdownId = id ?? generatedId;

  const normalized = normalizeOptions(options);
  const selected = normalized.find((opt) => opt.value === value);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const selectedIdx = normalized.findIndex((opt) => opt.value === value);
      setActiveIndex(selectedIdx >= 0 ? selectedIdx : 0);
    }
  }, [isOpen, value, normalized]);

  useEffect(() => {
    if (isOpen && listRef.current) {
      listRef.current.focus();
      const activeEl = listRef.current.children[activeIndex] as HTMLElement | undefined;
      activeEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, activeIndex]);

  const selectOption = (option: DropdownOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, normalized.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (normalized[activeIndex]) selectOption(normalized[activeIndex]);
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative flex flex-col gap-2">
      {label && (
        <label htmlFor={dropdownId} className="text-[#0d141b] dark:text-gray-200 text-sm font-medium">
          {label}
        </label>
      )}

      <button
        type="button"
        id={dropdownId}
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={!label ? ariaLabel : undefined}
        className={`w-full rounded-lg border bg-slate-50 dark:bg-gray-800 dark:text-white px-4 py-3 text-base transition-colors outline-none flex items-center justify-between gap-2 text-left disabled:opacity-60 disabled:cursor-not-allowed ${
          isOpen ? 'border-primary ring-1 ring-primary' : 'border-[#cfdbe7] dark:border-gray-600'
        } ${className}`}
      >
        <span className={selected ? '' : 'text-gray-400'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`${dropdownId}-option-${activeIndex}`}
          onKeyDown={handleListKeyDown}
          className="absolute z-20 top-full left-0 mt-2 w-full max-h-60 overflow-auto rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg py-1"
        >
          {normalized.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;
            return (
              <li
                key={option.value}
                id={`${dropdownId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectOption(option)}
                className={`px-4 py-2.5 sm:py-2 text-base sm:text-sm cursor-pointer flex items-center justify-between gap-2 ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-[#0d141b] dark:text-gray-200'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="h-4 w-4 shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
