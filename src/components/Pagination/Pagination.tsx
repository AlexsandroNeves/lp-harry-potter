import styles from './Pagination.module.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) return null;

  const getPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const delta = 2;

    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push('...');
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages) {
      if (right < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className={styles.pagination} aria-label="Paginação">
      <button
        className={`${styles.btn} ${styles.arrow}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        ‹
      </button>

      {getPages().map((page, idx) =>
        page === '...' ? (
          <span key={`dots-${idx}`} className={styles.dots}>…</span>
        ) : (
          <button
            key={page}
            className={`${styles.btn} ${page === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(page as number)}
            aria-label={`Ir para página ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        className={`${styles.btn} ${styles.arrow}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;
