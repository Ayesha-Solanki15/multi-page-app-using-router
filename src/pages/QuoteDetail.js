import { useEffect } from "react";
import { Route, useParams , Link, useRouteMatch} from "react-router-dom";
import Comments from '../components/comments/Comments'
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

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

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  // console.log(match);

  const {quoteId} = params;

  const {sendRequest, status, data:loadedQuote, error} = useHttp(getSingleQuote, true);

  // const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

  useEffect( () => {
    sendRequest(quoteId);
  },[sendRequest,quoteId])

  if ( status === 'pending' ) {
    return <div className="centered">
      <LoadingSpinner/>
    </div>
  }

  if (error) {
    return <p className="centered">{error}</p>
  }

  if(!loadedQuote.text) {
    return <p>No quote found</p>
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {/* whatever we write in dynamic route path that becomes the key of the param object */}
      <Route path={`/quotes/${params.quoteId}`} exact>
        <div className='centered' >
          <Link  className='btn--flat' to={`/quotes/${params.quoteId}/comments`}>Load Comments</Link> 
        </div>
      </Route>
      {/* <Route path={`/quotes/${params.quoteId}/comments`}> */}
      <Route path={`${match.path}/comments`}>
        {/* also can do'/quotes/:quoteId/comments' */}
        <Comments/>
      </Route>
    </>
  )
};

export default QuoteDetail;