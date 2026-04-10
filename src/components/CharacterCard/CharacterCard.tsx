import { Character } from '../../services/characterService';
import styles from './CharacterCard.module.scss';

const NO_PHOTO = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

const formatDate = (dateStr: string | undefined): string => {
  if (!dateStr) return '—';
  return dateStr.replace(/-/g, '/');
};

interface Props {
  character: Character;
  onClick: () => void;
}

const CharacterCard = ({ character, onClick }: Props) => {
  const { name, image, dateOfBirth, house, patronus, actor, alive } = character;

  const houseClass = house ? styles[house.toLowerCase()] : styles.noHouse;
  const imgSrc = image || NO_PHOTO;

  return (
    <article
      className={`${styles.card} ${houseClass}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      aria-label={`Ver detalhes de ${name}`}
    >
      {/* Status badge */}
      <div className={`${styles.statusBadge} ${alive ? styles.alive : styles.deceased}`}>
        <span className={styles.statusDot} />
        {alive ? 'Vivo' : 'Falecido'}
      </div>

      {/* Click hint */}
      <div className={styles.clickHint}>Ver detalhes</div>

      {/* Image */}
      <div className={styles.imageWrapper}>
        <div className={styles.imageBorder} />
        <img
          src={imgSrc}
          alt={name}
          className={styles.image}
          onError={(e) => { (e.target as HTMLImageElement).src = NO_PHOTO; }}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className={styles.info}>
        <h2 className={styles.name}>{name || '—'}</h2>

        {house && (
          <span className={`${styles.housePill} ${houseClass}`}>
            {house}
          </span>
        )}

        <dl className={styles.details}>
          <div className={styles.detailRow}>
            <dt className={styles.detailLabel}>Nascimento</dt>
            <dd className={styles.detailValue}>{formatDate(dateOfBirth)}</dd>
          </div>
          <div className={styles.detailRow}>
            <dt className={styles.detailLabel}>Patrono</dt>
            <dd className={styles.detailValue}>{patronus || '—'}</dd>
          </div>
          <div className={styles.detailRow}>
            <dt className={styles.detailLabel}>Ator</dt>
            <dd className={styles.detailValue}>{actor || '—'}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
};

export default CharacterCard;
