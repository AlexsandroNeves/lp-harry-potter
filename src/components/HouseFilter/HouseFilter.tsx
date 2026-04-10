import styles from './HouseFilter.module.scss';

const HOUSES = ['Todas', 'Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];

interface Props {
  selected: string;
  onChange: (house: string) => void;
  total: number;
  filtered: number;
  search: string;
  onSearch: (value: string) => void;
}

const HouseFilter = ({ selected, onChange, total, filtered, search, onSearch }: Props) => {
  return (
    <div className={styles.wrapper}>
      {/* Busca por nome */}
      <div className={styles.searchWrap}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Buscar personagem pelo nome..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Buscar por nome"
        />
        {search && (
          <button className={styles.clearBtn} onClick={() => onSearch('')} aria-label="Limpar busca">
            ✕
          </button>
        )}
      </div>

      {/* Filtro por casa */}
      <div className={styles.filters}>
        {HOUSES.map((house) => (
          <button
            key={house}
            className={`${styles.btn} ${selected === house ? styles.active : ''} ${styles[house.toLowerCase()]}`}
            onClick={() => onChange(house)}
            aria-pressed={selected === house}
          >
            <span className={styles.label}>{house}</span>
          </button>
        ))}
      </div>

      <p className={styles.count}>
        Mostrando <strong>{filtered}</strong> de <strong>{total}</strong> personagens
      </p>
    </div>
  );
};

export default HouseFilter;
