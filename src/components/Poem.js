const Poem = ({ title, text }) => {
  return (
    <div className="poem">
      <h2 className="poem-title">{title}</h2>
      <div
        className="poem-verse"
        dangerouslySetInnerHTML={{ __html: text }}></div>
      <div className="gradient"></div>
    </div>
  );
};

export default Poem;
