// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Author from './components/Author/Author';
import FavoriteAuthor from './components/FavoriteAuthor/FavoriteAuthor';
function App() {
  return (
    <Router>
      <Switch>
          <Route path="/author">
            <Author />
          </Route>
          <Route path="/favoriteAuthor">
            <FavoriteAuthor />
          </Route>
          <Route path="/">
            <Author />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
