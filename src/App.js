import React from 'react';
import './styles.css';

function App() {
  return (
    <header class='header'>
      <div class='logo'>
        <img
          src='https://img.icons8.com/external-bearicons-outline-color-bearicons/64/null/external-Recipe-Book-cooking-bearicons-outline-color-bearicons.png'
          alt='Recipe Rank Logo'
        />
        <h1>Welcome to Recipe Rank!</h1>
      </div>
      <button class='btn btn-large btn-open'>Share a recipe</button>
    </header>
  );
}

export default App;
