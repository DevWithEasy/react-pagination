import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './App.css';
import fetchData from './functionmanager/fetchData';


function App() {
  //সকল লোড করা ডাটা এখানে
  const [data,setData] = useState([])

  //এপিআই দিয়ে ডাটা লোড
  useEffect(() =>{
    //main data fetch function
    fetchData(data,setData)
  },[])

  //প্রতি পেজে কত গুলো ডাটা দেখানো হবে
  const perPage = 5


  //পেজ নাম্বার কত গুলো হবে
  const pageCount = Math.ceil(data.length/perPage)


  //পেজ নাম্বার সিলেক্ট করার মাধ্যমে চেঞ্জ করা হবে
  //রিয়েক্ট পেজিনেশনের মাধ্যমে যে সংখ্যা গুলো আসবে সেগুলোকে সিলেক্ট করলে এই নাম্বারটা পরিবর্তন হবে একটা ফাংশনের  মাধ্যমে
  const[pageNumber,setPageNumber] = useState(0)


  //কত গুলো পেজ বা ডাটা দেখা হয়েছে বা সিলেক্ট করা পেজে বর্তমান ডাটা 
  // দেখানো_ডাটা_সংখ্যা = পেজ_নাম্বার (সিলেক্ট করা পেজ নাম্বার)  * প্রতি_পেজে_ডাটার_সংখ্যা)
  const pageVisited = pageNumber * perPage


  //পেজ নাম্বার সিলেক্ট করার পর যে ডাটা গুলো পাওয়া যাবে বা ডিসপ্লে হবে
  //দেখানো ডাটা = ডাটা.slice(দেখানো_ডাটা_সংখ্যা,দেখানো_ডাটা_সংখ্যা+প্রতি_পেজে_ডাটার_সংখ্যা)
  const displayData = data.slice(pageVisited,pageVisited+perPage)


  // পেজ নাম্বার চেঞ্জ করার ফাংশন
  //এখানে যে নাম্বারটি সিলেক্ট করবেন ইভেন্টের সিলেক্ট দ্বারা এর ভ্যালু অটোমেটিক পরিবর্তন হবে
  const changePage = ({selected})=>{
    setPageNumber(selected)
  }
  
  

  return (
    <div className="App">

    <h1 className="title">React Pagination</h1>

    {
      displayData.map(post=>
        <div className='post' key={post.id}>
          <h3 className="post_title">{post.title}</h3>
          <p className='post_body'>{post.body}</p>
        </div>
      )
    }  
    <div className="post_count">
      <p>Now you are : ({pageVisited+1}-{pageVisited+perPage}) No. post {pageNumber+1}/{pageCount} pages </p>
    </div>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={changePage}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="paginate"
        previousClassName = "previousBtn"
        nextsClassName = "nextBtn"
        disabledClassName="disabled"
        activeClassName="active"
      />
    {/* রিয়েক্ট পেজিনেশন একটি লিস্ট আইটেম।
    যার একটি ক্লাস দিতে হয় দিতে হয়। যেমন  paginate.
    লিস্টের প্রতিটি আইটেম হল  anchor ট্যাগ। 
    আলাদা করে previousBtn,nextBtnactive ডিজাইন করতে পারবেন। 
    */}

    <div className="github">Github</div>
    </div>
  );
}

export default App;
