import Header from './Components/Header';
import styles from './CSS/App.module.css'
function App() {
  return (
    <div className= {styles.container}>
      <Header />
      <div className= {styles.content}>
        <h2>Busca la pieza que necesites</h2>
      </div>
    </div>
  );
}

export default App;
