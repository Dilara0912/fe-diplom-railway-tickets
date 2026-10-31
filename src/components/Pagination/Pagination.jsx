
import { useState } from 'react';
import './Pagination.css';

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <nav className="pagination" aria-label="Страницы результатов">
      <button
        type="button"
        className="pagination__arrow"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((page) => page - 1)}
        aria-label="Предыдущая страница"
      >
        ‹
      </button>

      {[1, 2, 3].map((page) => (
        <button
          type="button"
          key={page}
          className={
            currentPage === page
              ? 'pagination__button pagination__button--active'
              : 'pagination__button'
          }
          onClick={() => setCurrentPage(page)}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="pagination__arrow"
        disabled={currentPage === 3}
        onClick={() => setCurrentPage((page) => page + 1)}
        aria-label="Следующая страница"
      >
        ›
      </button>
    </nav>
  );
}

export default Pagination;
