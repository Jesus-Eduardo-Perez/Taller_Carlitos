import Header from './Components/Header';
import styles from './CSS/App.module.css'
function App() {
  return (
    <div className= {styles.container}>
      <Header />
      <div className= {styles.content}></div>
    </div>
  );
}

export default App;
