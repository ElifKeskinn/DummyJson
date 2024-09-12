import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';  
import Posts from './components/Posts'; 
import { CommentProvider } from './components/CommentContext';  

function App() {
  const [page, setPage] = useState(null);

  return (
    <CommentProvider> 
    <div className="app-container">
      <Navbar setPage={setPage} />  
      <hr className="separator" />
      <main className="page-content">
        {page ? page : (
          <section className="homepage">
            <h1>Welcome to Our Site</h1>
            <p>Discover a wide range of products, posts, and recipes.</p>
            <img 
              src="https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMTA2MjF8MHwxfGFsbHwxfHx8fHx8fHwxNjg3NzMzOTI&ixlib=rb-1.2.1&q=80&w=1080" 
              alt="Welcome" 
              className="homepage-image" 
            />
            <p>Explore our collections and find something you love!</p>
          </section>
        )}
      </main>
    </div>
    </CommentProvider>
  );
}

export default App;
