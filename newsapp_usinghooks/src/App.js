import React, { useEffect, useState } from "react";

const App = () => {
  
  // state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react")      // by default the searchQuery = "react"
  const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=react')

  const [loading, setLoading] = useState(false)   //default is false

  // fetch news
  const fetchNews = () => {
    // while fetching we need to make the loading {TRUE}
    setLoading(true)

    fetch(url)                             // default url - first it will fetch the default url then other query
      .then(result => result.json())
      .then(data => (setNews(data.hits)) , setLoading(false))    //after getting the data - loading{false}
      .catch(error => console.log(error));
  };

  useEffect(() => {           // change only when searchQuery is search
    fetchNews();
  }, [url]);  // [] controlling the useEffect's behaviour of useEffect. (after (SearchQuery,or url) is changed then change the fetchNews)

  const handleChange = (e) => {            // e - event target value - means user typing value
    setSearchQuery(e.target.value)     // update the target value 
  };

  const handleSubmit = e => {     // url will change only when user type another query & hits the sumnit button 
    e.preventDefault()
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)  // as your search differnt query
  };

  const showLoading = () => (loading ? <h2>Loading....</h2> : " ");                    // ? - if    : then

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button>Search</button>
      </form>
  );

  const showNews = () => news.map((n, i) => <p key={i}>{n.title}</p>);

  return(
    <div>
      <h2> NEWS </h2>
      {showLoading()}
      {searchForm()}
      {showNews()}
    </div>
  );
};

export default App;
