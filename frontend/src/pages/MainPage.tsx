import { useEffect, useState } from 'react';
import { Word } from '../models/Word';
import { Link } from 'react-router-dom';

function MainPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [totalWords, setTotalWords] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("id,asc");

  const wordsPerPage = 3;

  // useEffect(() => {
  //   fetch("http://localhost:8080/words")
  //     .then(res => res.json())
  //     .then(json => setWords(json));
  // }, []);

  useEffect(() => {
    fetchWordsByPage(page);
  }, [sort]);

  function fetchWordsByPage(currentPage: number) {
    setPage(currentPage);

    fetch(`http://localhost:8080/words/words-pageable?type=ALL&page=${currentPage}&size=${wordsPerPage}&sort=${sort}`)
    .then(res => res.json())
      .then(json => {
        setWords(json.content);
        setTotalWords(json.totalElements);
      });
  }

  function changePage(newPage: number) {
    fetchWordsByPage(newPage);
  }

  return (
    <div>
      <h2>All Words</h2>
      <h6>Total: {totalWords}</h6>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h3>Sort By</h3>
        <button onClick={() => setSort("id,asc")}>The Oldest</button>
        <button onClick={() => setSort("id,desc")}>The Newest</button>
        <button onClick={() => setSort("name,asc")}>A-Z</button>
        <button onClick={() => setSort("name,desc")}>Z-A</button>
      </div>

      {
        words.map(word => (
          <div key={word.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc" }}>
            <div style={{ marginBottom: "10px" }}>
              <div><strong>id:</strong> {word.id}</div>
              <div><strong>type:</strong> {word.type}</div>
              <Link to={"/words/" + word.id}>
                <button style={{ borderColor: "grey", borderRadius: "20px", backgroundColor: "white", color: "black" }}>See More</button>
              </Link>
            </div>
          </div>
        ))
      }

      <div style={{ marginTop: "40px" }}>
        <button disabled={page === 0} onClick={() => changePage(page - 1)}>Previous</button>
        <span style={{ margin: "0 10px" }}>{page + 1}</span>
        <button
          disabled={page === Math.ceil(totalWords / wordsPerPage - 1)}
          onClick={() => changePage(page + 1)}
        >Next</button>
      </div>
    </div >
  );
}

export default MainPage;
