import { useEffect } from "react";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

// const DUMMY_QUOTES = [
//   { 
//     id: 'q1',
//     author: 'Ayesha',
//     text: 'Learning React is fun!'
//   },
//   { 
//     id: 'q2',
//     author: 'Max',
//     text: 'Learning Redux is awesome!'
//   },
//   { 
//     id: 'q3',
//     author: 'Peter',
//     text: 'Learning Router is amazing!'
//   },

// ];

const AllQuotes = () => {
  const {sendRequest, status, data: loadedQuotes, error} = useHttp(getAllQuotes, true);
  useEffect( () => {
    sendRequest();
  }, [sendRequest]);

  if( status === 'pending') {
    return <div className="centered">
      <LoadingSpinner/>
    </div>
  }
  if(error) {
    return <p className="centered focused">{error}</p>
  }
  if(status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound/>
  }

  return (
    <QuoteList quotes={loadedQuotes} />
    //initially before fetching we were sending dummy quotes
  )
};

export default AllQuotes;