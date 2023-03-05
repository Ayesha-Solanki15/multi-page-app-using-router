import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {

  const history = useHistory();
  const location = useLocation();//gives information about the currently loaded URL
  // console.log(ocation);
  //check it see what this location object holds

  //default js class which can be used in the browser
  const queryParams = new URLSearchParams(location.search);//returns a key-value object

  const isSortingAscending = queryParams.get('sort') === 'asc';

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    // useHistory hook allows us to change the page URL, and upon executing this function rn i want to change the page URL
    //step-1
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending?'desc':'asc')}`,
    });//till now we having been using a string to pass down the target destination, here is an alternative way where we cab pass an object, which is more readable
    
    // history.push(`${location.pathname}?sort=${(isSortingAscending?'desc':'asc')}`); 
    //causes re-evaluation of the component
  }
  return (
    <Fragment>
      <div className={classes.sorting}><button onClick={changeSortingHandler}>Sort {isSortingAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;