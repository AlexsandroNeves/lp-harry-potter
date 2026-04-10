import { useEffect } from 'react';
import { Character } from '../../services/characterService';
import styles from './CharacterModal.module.scss';

const NO_PHOTO = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

const formatDate = (d: string | undefined): string => (d ? d.replace(/-/g, '/') : '—');
const capitalize = (s: string | undefined): string =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : '—';

interface RowProps {
  label: string;
  value: string | number | boolean | undefined | null;
}

const Row = ({ label, value }: RowProps) => (
  <div className={styles.row}>
    <dt className={styles.rowLabel}>{label}</dt>
    <dd className={styles.rowValue}>{value ?? '—'}</dd>
  </div>
);

interface Props {
  character: Character;
  onClose: () => void;
}

const CharacterModal = ({ character, onClose }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!character) return null;

  const {
    name, image, dateOfBirth, yearOfBirth, house, patronus, actor,
    alive, species, gender, ancestry, eyeColour, hairColour,
    wand, hogwartsStudent, hogwartsStaff, wizard, alternate_names,
  } = character;

  const houseClass = house ? styles[house.toLowerCase()] : styles.noHouse;
  const imgSrc = image || NO_PHOTO;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={name}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">✕</button>

        {/* Top: image + identity */}
        <div className={`${styles.hero} ${houseClass}`}>
          <div className={styles.imageWrap}>
            <img
              src={imgSrc}
              alt={name}
              className={styles.image}
              onError={(e) => { (e.target as HTMLImageElement).src = NO_PHOTO; }}
            />
          </div>

          <div className={styles.identity}>
            <div className={`${styles.statusBadge} ${alive ? styles.alive : styles.deceased}`}>
              <span className={styles.statusDot} />
              {alive ? 'Vivo' : 'Falecido'}
            </div>

            <h2 className={styles.name}>{name || '—'}</h2>

            {house && (
              <div className={styles.houseRow}>
                <span className={`${styles.houseName} ${houseClass}`}>{house}</span>
              </div>
            )}

            {alternate_names?.length > 0 && (
              <p className={styles.altNames}>
                Também conhecido como: {alternate_names.join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Details grid */}
        <div className={styles.body}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Informações Pessoais</h3>
            <dl className={styles.grid}>
              <Row label="Espécie"        value={capitalize(species)} />
              <Row label="Gênero"         value={capitalize(gender)} />
              <Row label="Ancestralidade" value={capitalize(ancestry)} />
              <Row label="Nascimento"     value={formatDate(dateOfBirth)} />
              <Row label="Ano Nasc."      value={yearOfBirth} />
              <Row label="Olhos"          value={capitalize(eyeColour)} />
              <Row label="Cabelo"         value={capitalize(hairColour)} />
              <Row label="Bruxo"          value={wizard ? 'Sim' : 'Não'} />
            </dl>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Hogwarts & Magia</h3>
            <dl className={styles.grid}>
              <Row label="Patrono"               value={capitalize(patronus)} />
              <Row label="Estudante"             value={hogwartsStudent ? 'Sim' : 'Não'} />
              <Row label="Equipe"                value={hogwartsStaff ? 'Sim' : 'Não'} />
              <Row label="Varinha — Núcleo"      value={capitalize(wand?.core)} />
              <Row label="Varinha — Madeira"     value={capitalize(wand?.wood)} />
              <Row label="Varinha — Comprimento" value={wand?.length ? `${wand.length}"` : '—'} />
            </dl>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Ator / Atriz</h3>
            <dl className={styles.grid}>
              <Row label="Intérprete" value={actor} />
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
