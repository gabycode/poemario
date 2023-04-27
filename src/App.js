import "./App.css";
import "./fonts.css";
import { useEffect, useRef, useState } from "react";
import Poem from "./components/Poem";
import PoemsList from "./components/PoemsList";
import { poems } from "./poems/poems";
import WheelReact from "wheel-react";
import SwipeReact from "swipe-react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

function App() {
  const [selectedPoemIndex, setSelectedPoemIndex] = useState(null);
  const selectedPoem = poems[selectedPoemIndex];
  const poemContainerRef = useRef(null);
  const [isRendered, setIsRendered] = useState(true);
  const [isPoemSelected, setIsPoemSelected] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsRendered(false);
    }, 5000);
  }, []);

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
    setIsPoemSelected(true);
  };

  if (isRendered) {
    return (
      <div className="container">
        <h1 className="intro">mi poemario</h1>
      </div>
    );
  }

  return (
    <div
      className="main-container"
      {...WheelReact.events}
      {...SwipeReact.events}>
      <h1 className="main-title">Ricardo Domínguez</h1>
      <div className="content">
        <nav className="poem-navbar">
          <PoemsList
            poems={poems}
            handlePoemSelect={handlePoemSelect}
            selectedPoemIndex={selectedPoemIndex}
            setIsPoemSelected={setIsPoemSelected}
          />
        </nav>

        {isPoemSelected ? (
          <SwitchTransition>
            <CSSTransition
              classNames="fade"
              key={selectedPoemIndex}
              addEndListener={(node, done) =>
                node.addEventListener("transitionend", done, false)
              }>
              <Poem
                title={selectedPoem.title}
                text={selectedPoem.text}
                poemContainerRef={poemContainerRef}
              />
            </CSSTransition>
          </SwitchTransition>
        ) : (
          <div className="select">
            <h1 className="select-title">
              Escoge un poema del menú a la izquierda
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

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
