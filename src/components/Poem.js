const Poem = ({ title, text, poemContainerRef }) => {
  return (
    <div className="poem" ref={poemContainerRef}>
      <h2 className="poem-title">{title}</h2>
      <div
        className="poem-verse"
        dangerouslySetInnerHTML={{ __html: text }}></div>
      <div className="gradient"></div>
    </div>
  );
};

export default Poem;
