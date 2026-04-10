import './styles/global.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CharacterGrid from './components/CharacterGrid/CharacterGrid';

function App() {
  return (
    <>
      <Header />
      <main>
        <CharacterGrid />
      </main>
      <Footer />
    </>
  );
}

export default App;
