const AuthorList = ({ showAuthorList, selectedAuthor, handleAuthorSelect }) => {
  return (
    <>
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
    </>
  );
};

export default AuthorList;
