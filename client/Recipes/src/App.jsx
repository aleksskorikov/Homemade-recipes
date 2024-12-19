
import './styles/css/styles.css';
import './styles/css/resets.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext.jsx';
import Loyaut from './loyaut.jsx';
import Home from './pages/home.jsx';
import Book from './pages/book.jsx';
import Recipe from './pages/recipe.jsx';
import UserPage from './pages/UserPage.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Loyaut />}>
            <Route index element={<Home />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/user" element={<UserPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

