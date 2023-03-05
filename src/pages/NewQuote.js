import QuoteForm from '../components/quotes/QuoteForm';
import { useHistory } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import { useEffect } from 'react';

const NewQuote = () => {
  const {sendRequest, status}  = useHttp(addQuote);
  const history = useHistory();//returns a history object

  useEffect( () => {
    if( status === 'completed') {
      history.push('/quotes');
    }
    //history object won't change
  }, [status,history]);

  const addQuoteHandler = quoteData => {
    sendRequest(quoteData);
  // console.log(quoteData);
  
  //moved into the useEffect code
  // history.push('/quotes');
  //with push we can go back to the page we are coming from
 }  ;
 return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
  )
};

export default NewQuote;

//we wanna programmatically navigate to another page upon certain action, using useHistory hook