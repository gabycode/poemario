import "./App.css";
import "./fonts.css";
import { useEffect, useRef, useState } from "react";
import Poem from "./components/Poem";
import PoemNav from "./components/PoemNav";
import { poems } from "./poems/poems";
// import WheelReact from "wheel-react";
import SwipeReact from "swipe-react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Footer from "./components/Footer";

function App() {
  const [selectedPoemIndex, setSelectedPoemIndex] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [slideIntro, setSlideIntro] = useState(false);
  const [showAuthorList, setShowAuthorList] = useState(false);
  const poemContainerRef = useRef(null);
  const [isPoemSelected, setIsPoemSelected] = useState(false);
  const [isRendered, setIsRendered] = useState(true);
  // eslint-disable-next-line
  const [isAnimating, setIsAnimating] = useState(false);
  const [filteredPoems, setFilteredPoems] = useState([]);

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);

    setTimeout(() => {
      setSlideIntro(true);
    }, 2000);

    setTimeout(() => {
      setShowAuthorList(true);
    }, 4500);
  }, []);

  SwipeReact.config({
    left: () => {
      // setSelectedPoemIndex(null);
      if (poemContainerRef.current) {
        setSelectedPoemIndex((prevIndex) =>
          prevIndex === poems.length - 1 ? prevIndex : prevIndex + 1
        );
      }
    },
    right: () => {
      // setSelectedPoemIndex(null);
      if (poemContainerRef.current) {
        setSelectedPoemIndex((prevIndex) =>
          prevIndex === 0 ? prevIndex : prevIndex - 1
        );
      }
    },
  });

  // WheelReact.config({
  //   up: () => {
  //     const bottom =
  //       poemContainerRef.scrollHeight - poemContainerRef.scrollTop ===
  //       poemContainerRef.clientHeight;
  //     if (bottom) {
  //       console.log("wheel up detected.");
  //     }
  //   },
  //   down: () => {
  //     console.log("wheel down detected.");
  //   },
  // });

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

  const handleAuthorSelect = (author) => {
    setSelectedAuthor(author);
    setIsAnimating(false);
    // setIsRendered(true);
    const authorPoems = poems.filter((poem) => poem.author === author);
    setFilteredPoems(authorPoems);
    setTimeout(() => {
      setIsRendered(false);
      setIsAnimating(true);
    }, 2000);
    setTimeout(() => {
      setShowAuthorList(false);
    }, 500);
  };

  // Define here because filteredPoems is declared in the handleAuthorSelect function
  const selectedPoem =
    filteredPoems[selectedPoemIndex] || poems[selectedPoemIndex];

  const handlePoemSelect = (index) => {
    const selectedPoem = filteredPoems[index];
    const poemIndex = poems.findIndex((poem) => poem.id === selectedPoem.id);
    setSelectedPoemIndex(poemIndex);
    setIsPoemSelected(true);
  };

  return (
    <div
      className="container"
      id="home"
      // onAnimationEnd={() => setIsAnimating(false)}
    >
      <a
        href="https://mipoemario.com/"
        className={`intro ${slideIntro ? "slide-up" : ""}`}>
        mi poemario
      </a>

      {showAuthorList && (
        <div className={`author-list ${selectedAuthor ? "fade-out" : ""}`}>
          <button
            className="author-select"
            onClick={() => handleAuthorSelect("Ricardo Domínguez")}>
            Amanok
          </button>
          <button
            className="author-select"
            onClick={() => handleAuthorSelect("Priscilla")}>
            Priscilla
          </button>
          <button
            className="author-select"
            onClick={() => handleAuthorSelect("Rafael")}>
            Rafael
          </button>
        </div>
      )}
      {!isRendered && (
        <>
          <div className="content">
            <h2 className="poem-author">{selectedAuthor}</h2>

            <nav className="poem-navbar">
              <PoemNav
                poems={filteredPoems}
                handlePoemSelect={handlePoemSelect}
                selectedPoemIndex={selectedPoemIndex}
                selectedPoem={selectedPoem}
              />
            </nav>

            {isPoemSelected && selectedPoem ? (
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
                    author={selectedPoem.author}
                    poemContainerRef={poemContainerRef}
                    isPoemSelected={isPoemSelected}
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
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
