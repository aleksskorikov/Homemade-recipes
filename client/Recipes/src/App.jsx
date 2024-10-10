import './styles/css/styles.css';
import './styles/css/resets.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Loyaut from './loyaut.jsx';
import Home from './pages/home.jsx';
import Book from './pages/book.jsx';
import Recipe from './pages/recipe.jsx';

function App() {
  return (
    <Router>
      {/* <ErrorBoundary> */}
      <Routes>
        <Route path='/' element={<Loyaut />}>
          <Route index element={<Home />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/recipe/:id" element={<Recipe />} />
        </Route>
      </Routes>
      {/* </ErrorBoundary> */}
    </Router>
  );
}

export default App;
