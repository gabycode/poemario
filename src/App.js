import "./App.css";
import "./fonts.css";
import { useEffect, useRef, useState } from "react";
import Poem from "./components/Poem";
import PoemNav from "./components/PoemNav";
import { poems } from "./poems/poems";
import WheelReact from "wheel-react";
import SwipeReact from "swipe-react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Footer from "./components/Footer";

function App() {
  const [selectedPoemIndex, setSelectedPoemIndex] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [slideIntro, setSlideIntro] = useState(false);
  const [showAuthorList, setShowAuthorList] = useState(false);
  const selectedPoem = poems[selectedPoemIndex];
  const poemContainerRef = useRef(null);
  const [isPoemSelected, setIsPoemSelected] = useState(false);
  const [isRendered, setIsRendered] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

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
    setIsAnimating(true);
    setIsRendered(false);
  };

  const handlePoemSelect = (index) => {
    setSelectedPoemIndex(index);
    setIsPoemSelected(true);
  };

  const renderPoems = () => {
    if (selectedAuthor) {
      const authorPoems = poems.filter(
        (poem) => poem.author === selectedAuthor
      );
      return authorPoems.map((poem) => (
        <SwitchTransition>
          <CSSTransition
            classNames="fade"
            key={poem.id}
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }>
            <Poem
              title={poem.title}
              text={poem.text}
              author={poem.author}
              poemContainerRef={poemContainerRef}
              isPoemSelected={isPoemSelected}
            />
          </CSSTransition>
        </SwitchTransition>
      ));
    }
  };

  if (isRendered) {
    return (
      <div
        className={`container ${
          selectedAuthor && isAnimating ? "fade-out" : ""
        }`}
        id="home"
        onAnimationEnd={() => setIsAnimating(false)}>
        <h1 className={`intro ${slideIntro ? "slide-up" : ""}`}>mi poemario</h1>
        {showAuthorList && (
          <div className="author-list">
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
        <div className="poems">{renderPoems()}</div>
      </div>
    );
  }

  return (
    <div
      className="main-container"
      {...WheelReact.events}
      {...SwipeReact.events}>
      <a href="home">
        <h1 className="main-title">mi poemario</h1>
      </a>

      <div className="content">
        {isPoemSelected && (
          <h2 className="poem-author">{selectedPoem.author}</h2>
        )}
        <nav className="poem-navbar">
          <PoemNav
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
      </div>
      <Footer />
    </div>
  );
}

export default App;
