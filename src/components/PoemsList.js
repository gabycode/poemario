const PoemsList = ({ poems, handlePoemSelect, selectedPoemIndex }) => {
  return (
    <ul>
      {poems.map((poem, index) => (
        <li
          key={index}
          onClick={() => handlePoemSelect(index)}
          className={`poem-number ${
            selectedPoemIndex === index ? "active" : ""
          }`}>
          {poem.id}
        </li>
      ))}
    </ul>
  );
};

export default PoemsList;
