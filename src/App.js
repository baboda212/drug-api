import './App.css';
import { useState, useEffect, useRef } from 'react'
import Items from './components/Items'

function App() {
  const [drugs, setDrugs] = useState([]) //약물 데이터
  const [totalCount, setTotalCount] = useState(0); // 총 글수
  const [pageNo, setPageNo] = useState(1);  // 페이지번호
  const [maxPages, setMaxPages] = useState(0); // 마지막 페이지
  const [rows, setRows] = useState(10); // 화면당 글수
  const [search, setSearch] = useState(''); // 검색어
  const inputRef = useRef(); // 검색창 요소의 위치 참조

  // 페이지당 요청
  const getDrugData = () => {
    const API_KEY = `%2BefalOjB2%2F4P8zlVJ%2BVlLxjqN1PS6NrVpqtyI3G%2F9WERm2OZRIB57ocCGqM81E5hIUU6%2F2LYYVyEgMxVauj6Sw%3D%3D`;
    const API_URL = `http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?serviceKey=${API_KEY}&pageNo=${pageNo}&startPage=1&numOfRows=${rows}&type=json${search}`;    
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data.body)
        const items = data.body.items;
        // 데이터를 state에 저장
        setDrugs(items);
        //console.log("drugs",drugs)
        // 전체글
        setTotalCount(data.body.totalCount);
        // 마지막 페이지(총게시물 / 행수)
        setMaxPages(Math.ceil(totalCount / rows))
      })
      .catch(() => {
        console.log('데이터 요청 에러');
        // setSearch('')
        setDrugs([])
      })
  }

  useEffect(() => {
    getDrugData();

  }, [pageNo, totalCount, search])

  // 이전 페이지
  const nextPage = () => {
    if(pageNo < maxPages) setPageNo(pageNo + 1)
  }

  // 다음 페이지
  const prevPage = () => {
    if(pageNo > 1) setPageNo(pageNo - 1);
  }

  console.log('drugs = ', drugs)
  console.log('totalCount = ', totalCount)
  console.log('maxPages = ', maxPages);

  return (
    <div className='App'>
      <h1>의약품 정보</h1>
      <form onSubmit={ (e) => {
        e.preventDefault();
        // 입력창에 입력된 값 참조(ref={inputRef})
        let val = inputRef.current.value; // input 값
        console.log(val)
        if(val == '') {
          setSearch(val);  // 아무 입력입 없을 때
        } else {
          setSearch(`&itemName=${val}`); // 입력값이 있으면
        }  
        setPageNo(1)
      }}>
        <input 
          onInput={ (e) => {
            console.log(e.target.value);
          }}
          ref={inputRef} type="search" name="s" placeholder='검색어 입력' />
          <button>검색</button>
          </form>
          {/* 페이징 */}
          <p>Page: {pageNo} / {maxPages}</p>
          <p>총 {totalCount}건 등록</p>
          <a href="#" onClick={prevPage}>이전 페이지</a>
          <span> | </span>
          <a href="#" onClick={nextPage}>다음 페이지</a>
          {
            (drugs.length > 0) ?  <Items drugs={drugs} /> : (<p>자료가 없습니다.</p>)
          }
          {/* 페이징 */}
          <p>Page: {pageNo} / {maxPages}</p>
          <p>{totalCount}건 등록</p>
          <a href="#" onClick={prevPage}>이전 페이지</a>
          <span> | </span>
          <a href="#" onClick={nextPage}>다음 페이지</a>
    </div>
  );
}

export default App;

