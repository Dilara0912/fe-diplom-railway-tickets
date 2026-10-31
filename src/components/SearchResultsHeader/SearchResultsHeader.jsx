
import { useEffect, useState } from 'react';
import './SearchResultsHeader.css';

const sortOptions = ['времени', 'стоимости', 'длительности'];

function SearchResultsHeader({
  total = 20,
  sortBy = 'времени',
  onSortChange,
  pageSize = 5,
  onPageSizeChange,
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [localSortBy, setLocalSortBy] = useState(sortBy);

  useEffect(() => {
    setLocalSortBy(sortBy);
  }, [sortBy]);

  function chooseSort(option) {
    setLocalSortBy(option);
    onSortChange?.(option);
    setIsSortOpen(false);
  }

  return (
    <div className="results-header">
      <p className="results-header__count">
        найдено {total}
      </p>

      <div className="results-header__controls">
        <div
          className="results-header__sort"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsSortOpen(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setIsSortOpen(false);
            }
          }}
        >
          <span className="results-header__sort-label">
            сортировать по:
          </span>

          <button
            type="button"
            className="results-header__sort-trigger"
            aria-haspopup="listbox"
            aria-expanded={isSortOpen}
            onClick={() => setIsSortOpen((open) => !open)}
          >
            {localSortBy}
          </button>

          {isSortOpen && (
            <div
              className="results-header__sort-menu"
              role="listbox"
              aria-label="Сортировать по"
            >
              {sortOptions.map((option) => (
                <button
                  type="button"
                  role="option"
                  aria-selected={localSortBy === option}
                  key={option}
                  className="results-header__sort-option"
                  onClick={() => chooseSort(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="results-header__page-size">
          <span className="results-header__page-size-label">
            показывать по:
          </span>

          {[5, 10, 20].map((size) => (
            <button
              type="button"
              key={size}
              className={
                pageSize === size
                  ? 'results-header__size results-header__size--active'
                  : 'results-header__size'
              }
              aria-pressed={pageSize === size}
              onClick={() => onPageSizeChange?.(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResultsHeader;
