const PoemNav = ({
  poems,
  handlePoemSelect,
  selectedPoemIndex,
  selectedPoem,
}) => {
  return (
    <ul>
      {poems.map((poem, index) => (
        <li
          key={index}
          onClick={() => {
            handlePoemSelect(index);
          }}
          className={`poem-number ${
            selectedPoem && poem.id === selectedPoem.id ? "active" : ""
          }`}>
          {poem.id}
        </li>
      ))}
    </ul>
  );
};

export default PoemNav;
