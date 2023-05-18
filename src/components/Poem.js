const Poem = ({ title, text, id, poemContainerRef, poemChanged }) => {
  return (
    <div
      className={`poem ${poemChanged ? "fadein" : ""}`}
      ref={poemContainerRef}>
      <div className="poem-top">
        {/* <h2 className="poem-author">{author}</h2> */}
        <h2 className="poem-title">{title !== "" ? title : id}</h2>
      </div>
      <div className="gradient-top"></div>
      <div
        className="poem-text"
        dangerouslySetInnerHTML={{ __html: text }}></div>
      <div className="gradient"></div>
    </div>
  );
};

export default Poem;
