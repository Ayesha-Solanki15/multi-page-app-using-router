import React , { Suspense }from "react"; 
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import AllQuotes from "./pages/AllQuotes";

// import NotFound from "./pages/NotFound";
// import QuoteDetail from "./pages/QuoteDetail";

const NewQuote = React.lazy(() => import('./pages/NewQuote'));
//a chunk of the code is made and when we first need the page the request to that chunk of code is made.

const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const NotFound = React.lazy( () => import('./pages/NotFound'));

function App() {
  return (
    <Layout>
      <Suspense fallback={
        <div className="centered">
          <LoadingSpinner />
        </div>
      }>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/quotes'/>
          </Route>
          <Route path='/quotes' exact>
            <AllQuotes/>
          </Route>
          <Route path='/quotes/:quoteId'>
            {/* dynamic route so that we can load the same component for different quoteId */}
            <QuoteDetail/>
          </Route>
          <Route path='/new-quote'>
            <NewQuote/>
          </Route>
          {/* this will be the fallback UI when none of the routes match */}
          <Route path='*'>
            <NotFound/>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
