const Poem = ({ title, text, poemContainerRef, poemChanged }) => {
  return (
    <div
      className={`poem ${poemChanged ? "fadein" : ""}`}
      ref={poemContainerRef}>
      <h2 className="poem-title">{title}</h2>
      <div className="gradient-top"></div>
      <div
        className="poem-text"
        dangerouslySetInnerHTML={{ __html: text }}></div>
      <div className="gradient"></div>
    </div>
  );
};

export default Poem;
