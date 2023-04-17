import "./App.css";
import "./fonts.css";
import { useState } from "react";
import Poem from "./components/Poem";
import PoemsList from "./components/PoemsList";
import { poems } from "./poems/poems";

function App() {
  const [selectedPoem, setSelectedPoem] = useState(poems[0]);

  const handlePoemSelect = (index) => {
    setSelectedPoem(poems[index]);
  };

  return (
    <div className="main-container">
      <h1 className="main-title">Ricardo Domínguez</h1>
      <div className="content">
        <nav className="poem-navbar">
          <PoemsList poems={poems} handlePoemSelect={handlePoemSelect} />
        </nav>

        <Poem title={selectedPoem.title} text={selectedPoem.text} />
      </div>
    </div>
  );
}

export default App;
