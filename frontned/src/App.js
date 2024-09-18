import './App.css';
import BlogList from './Components/BlogList';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signin from './Components/Signin';
import BlogPage from './Components/BlogPage';
import BlogForm from './Components/BlogForm';

function App() {

  return (


    <div className="App">
      
      <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/blogs" element={<BlogList />} />
                <Route path="/blog-detail/:id" element={<BlogPage />} />
                <Route path="/add-blog" element={<BlogForm />} />
            </Routes>
        </Router>
      {/* <BlogList/> */}
    </div>
  );
}

export default App;
