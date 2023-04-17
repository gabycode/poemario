const PoemsList = ({ poems, handlePoemSelect }) => {
  return (
    <ul>
      {poems.map((poem, index) => (
        <li
          key={index}
          onClick={() => handlePoemSelect(index)}
          className="poem-number"
          tabIndex={1}>
          {poem.id}
        </li>
      ))}
    </ul>
  );
};

export default PoemsList;
