const PoemTitleSelect = ({ poems, handlePoemSelect }) => {
  return (
    <div className="select">
      {poems.map((poem, index) => (
        <h2
          key={index}
          onClick={() => {
            handlePoemSelect(index);
          }}
          className="poem-title-select">
          {poem.title}
        </h2>
      ))}
    </div>
  );
};

export default PoemTitleSelect;
