import React from 'react';
import './styles.css';

function App() {
  const appTitle = 'Recipe Rank';
  return (
    <>
      {/* Header */}
      <header className='header'>
        <div className='logo'>
          <img
            src='https://img.icons8.com/external-bearicons-outline-color-bearicons/64/null/external-Recipe-Book-cooking-bearicons-outline-color-bearicons.png'
            alt='Recipe Rank Logo'
          />
          <h1>{appTitle}</h1>
        </div>
        <button className='btn btn-large btn-open'>Share a recipe</button>
      </header>

      <NewRecipeForm />

      <main className='main'>
        <CategoryFilter />
        <RecipeList />
      </main>
    </>
  );
}

function NewRecipeForm() {
  return <form className='recipe-form'>Recipe Form</form>;
}

function CategoryFilter() {
  return <aside>Category Filter</aside>;
}

function RecipeList() {
  return <section>Recipe List</section>;
}

export default App;
