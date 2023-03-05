import { useRef, useState } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const formFocusedHandler = () => {
    // console.log('Focus!');
    // if we click anywhere within the form this focusHandler will be called
    setIsEntering(true);
  }

  const finishEnteringHandler = () => {
    //this extra handler for preventing the prompt to appear when the submit button is clicked
    setIsEntering(false);
    //this will run before handling the form submission
  }

  return (
    <>
    {/* //we will show the prompt when is entering is true */}
    {/* It takes in message prop as well which is a callback function and takes a location where we wanna go and return a string which will be prompted when we try to navigate to the page , it has a little flaw tho, even if i add all the data and click on Add button which takes us to /quotes page then also it prompts a message*/}
      <Prompt when={isEntering} message={(location) => 'Are you sure you want to leave? All the data will be lost!'}/>
    {/* //to find out if the form is active we can use onFocus here on the form */}
      <Card>
        <form onFocus={formFocusedHandler} className={classes.form} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor='author'>Author</label>
            <input type='text' id='author' ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='text'>Text</label>
            <textarea id='text' rows='5' ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onclick = {finishEnteringHandler} className='btn'>Add Quote</button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;


//using of Prompt hook -> suppose we start filling the form and suddenly we pressed the back button so it will navigate us to the back /previous page and all the form data is lost then. We want to prevent this behavior, instead we will promt the user if he actually wants to navigate or not