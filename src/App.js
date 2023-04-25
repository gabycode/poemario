import "./App.css";
import "./fonts.css";
import { useEffect, useRef, useState } from "react";
import Poem from "./components/Poem";
import PoemsList from "./components/PoemsList";
import { poems } from "./poems/poems";
import WheelReact from "wheel-react";
import SwipeReact from "swipe-react";

function App() {
  const [selectedPoemIndex, setSelectedPoemIndex] = useState(0);
  const selectedPoem = poems[selectedPoemIndex];
  const poemContainerRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  // WheelReact.config({
  //   up: () => {
  //     if (poemContainerRef.current) {
  //       const container = poemContainerRef.current;
  //       const containerHeight = container.clientHeight;
  //       const scrollTop = container.scrollTop;

  //       if (scrollTop === 0) {
  //         setSelectedPoemIndex((prevIndex) =>
  //           prevIndex === 0 ? prevIndex : prevIndex + 1
  //         );
  //         container.scrollTop = container.scrollHeight - containerHeight;
  //       }
  //     }
  //   },
  //   down: () => {
  //     if (poemContainerRef.current) {
  //       const container = poemContainerRef.current;
  //       const containerHeight = container.clientHeight;
  //       const scrollHeight = container.scrollHeight;
  //       const scrollTop = container.scrollTop;

  //       if (scrollTop + containerHeight === scrollHeight) {
  //         setSelectedPoemIndex((prevIndex) =>
  //           prevIndex === poems.length - 1 ? prevIndex : prevIndex - 1
  //         );
  //         container.scrollTop = 0;
  //       }
  //     }
  //   },
  //   target: poemContainerRef.current,
  // });

  SwipeReact.config({
    left: () => {
      if (poemContainerRef.current) {
        setSelectedPoemIndex((prevIndex) =>
          prevIndex === poems.length - 1 ? prevIndex : prevIndex + 1
        );
      }
    },
    right: () => {
      if (poemContainerRef.current) {
        setSelectedPoemIndex((prevIndex) =>
          prevIndex === 0 ? prevIndex : prevIndex - 1
        );
      }
    },
  });

  const detectKeyDown = (e) => {
    e.preventDefault();
    if (e.keyCode === 38) {
      // up arrow
      setSelectedPoemIndex((prevIndex) =>
        prevIndex === 0 ? prevIndex : prevIndex - 1
      );
    } else if (e.keyCode === 40) {
      // down arrow
      setSelectedPoemIndex((prevIndex) =>
        prevIndex === poems.length - 1 ? prevIndex : prevIndex + 1
      );
    }
  };

  const handlePoemSelect = (index) => {
    setSelectedPoemIndex(index);
  };

  return (
    <div
      className="main-container"
      {...WheelReact.events}
      {...SwipeReact.events}>
      <h1 className="main-title">Ricardo Domínguez</h1>
      <div className="content" tabIndex={0}>
        <nav className="poem-navbar">
          <PoemsList
            poems={poems}
            handlePoemSelect={handlePoemSelect}
            selectedPoemIndex={selectedPoemIndex}
          />
        </nav>

        <Poem
          title={selectedPoem.title}
          text={selectedPoem.text}
          poemContainerRef={poemContainerRef}
        />
      </div>
    </div>
  );
}

export default App;
