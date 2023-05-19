const Home = ({ slideIntro, handleAuthorListPage }) => {
  return (
    <>
      {slideIntro ? (
        <div onClick={handleAuthorListPage} className="intro slide-up">
          <h1>mi poemario</h1>
        </div>
      ) : (
        <div className={`intro ${slideIntro ? "slide-up" : ""}`}>
          <h1>mi poemario</h1>
        </div>
      )}
    </>
  );
};

export default Home;
