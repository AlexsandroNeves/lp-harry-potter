import { useState, useEffect } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import CharacterModal from '../CharacterModal/CharacterModal';
import HouseFilter from '../HouseFilter/HouseFilter';
import Pagination from '../Pagination/Pagination';
import { characterService, Character } from '../../services/characterService';
import styles from './CharacterGrid.module.scss';

const ITEMS_PER_PAGE = 12;

const CharacterGrid = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHouse, setSelectedHouse] = useState('Todas');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await characterService.getAll();
        setCharacters(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleHouseChange = (house: string) => {
    setSelectedHouse(house);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filtered = characters
    .filter((c) => selectedHouse === 'Todas' || c.house === selectedHouse)
    .filter((c) => !search || c.name?.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className={styles.stateCenter}>
        <div className={styles.spinner} />
        <p className={styles.stateText}>Invocando os personagens...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateCenter}>
        <span className={styles.stateIcon}>⚠</span>
        <p className={styles.stateText}>{error}</p>
        <p className={styles.stateSubText}>Tente recarregar a página.</p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <HouseFilter
        selected={selectedHouse}
        onChange={handleHouseChange}
        total={characters.length}
        filtered={filtered.length}
        search={search}
        onSearch={handleSearch}
      />

      {paginated.length === 0 ? (
        <div className={styles.stateCenter}>
          <span className={styles.stateIcon}>🔍</span>
          <p className={styles.stateText}>Nenhum personagem encontrado.</p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {paginated.map((character, index) => (
              <div
                key={character.id || index}
                style={{ animationDelay: `${(index % ITEMS_PER_PAGE) * 40}ms` }}
              >
                <CharacterCard
                  character={character}
                  onClick={() => setSelectedCharacter(character)}
                />
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </section>
  );
};

export default CharacterGrid;
