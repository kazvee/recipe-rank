import React, { useEffect } from 'react';
import { useState } from 'react';
import supabase from './supabase';
import './styles.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(
    function () {
      async function getRecipes() {
        setIsLoading(true);

        let query = supabase.from('recipes').select('*');

        if (currentCategory !== 'all') {
          query = query.eq('category', currentCategory);
        }

        const { data: recipes, error } = await query.limit(100);

        if (!error) setRecipes(recipes);
        else console.warn('There was a problem getting data! ☹️');
        setIsLoading(false);
      }
      getRecipes();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewRecipeForm setRecipes={setRecipes} setShowForm={setShowForm} />
      ) : null}

      <main className='main'>
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <RecipesList recipes={recipes} setRecipes={setRecipes} />
        )}
      </main>
      <Footer />
    </>
  );
}

function Loader() {
  return <p className='message'>Loading . . . </p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = 'Recipe Rank';
  return (
    <header className='header'>
      <div className='logo'>
        <img
          src='https://img.icons8.com/external-bearicons-outline-color-bearicons/64/null/external-Recipe-Book-cooking-bearicons-outline-color-bearicons.png'
          alt='Recipe Rank Logo'
        />
        <h1>{appTitle}</h1>
      </div>
      <button
        className='btn btn-large btn-open'
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? 'Close' : 'Share a recipe'}
      </button>
    </header>
  );
}

const CATEGORIES = [
  { name: 'canadian' },
  { name: 'german' },
  { name: 'hungarian' },
  { name: 'indian' },
  { name: 'italian' },
  { name: 'scottish' },
];

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

function NewRecipeForm({ setRecipes, setShowForm }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const nameLength = name.length;
  const descriptionLength = description.length;

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(name, description, source, category);

    if (
      name &&
      nameLength < 50 &&
      description &&
      descriptionLength < 100 &&
      isValidHttpUrl(source) &&
      category
    ) {
      setIsUploading(true);
      const { data: newRecipe, error } = await supabase
        .from('recipes')
        .insert([{ name, description, source, category }])
        .select();
      setIsUploading(false);

      if (!error) setRecipes((recipes) => [newRecipe[0], ...recipes]);

      setName('');
      setDescription('');
      setSource('');
      setCategory('');

      setShowForm(false);
    }
  }

  return (
    <form className='recipe-form' onSubmit={handleSubmit}>
      <input
        value={name}
        type='text'
        placeholder='Enter new recipe name'
        onChange={(event) => setName(event.target.value)}
        disabled={isUploading}
      />
      <span>{50 - nameLength} characters left</span>
      <input
        value={description}
        type='text'
        placeholder='Enter new recipe description'
        onChange={(event) => setDescription(event.target.value)}
        disabled={isUploading}
      />
      <span>{100 - descriptionLength} characters left</span>
      <input
        value={source}
        type='text'
        placeholder='Enter link to recipe'
        onChange={(event) => setSource(event.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        disabled={isUploading}
      >
        <option value=''>Choose cuisine type</option>
        {CATEGORIES.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className='btn btn-large' disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className='category'>
          <button
            className='btn btn-all-categories'
            onClick={() => setCurrentCategory('all')}
          >
            All Cuisines
          </button>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category.name} className='category'>
            <button
              className='btn btn-category'
              onClick={() => setCurrentCategory(category.name)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function RecipesList({ recipes, setRecipes }) {
  if (recipes.length === 0)
    return (
      <p className='message'>
        No recipes for this category yet. Create the first one!
      </p>
    );

  return (
    <section>
      <ul className='recipes-list'>
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} setRecipes={setRecipes} />
        ))}
      </ul>
      <p>There are {recipes.length} recipes in the database. Add your own!</p>
    </section>
  );
}

function Recipe({ recipe, setRecipes }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const isUnpopular =
    recipe.votesVeryHappy + recipe.votesHappy < recipe.votesSad;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedRecipe, error } = await supabase
      .from('recipes')
      .update({ [columnName]: recipe[columnName] + 1 })
      .eq('id', recipe.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setRecipes((recipes) =>
        recipes.map((r) => (r.id === recipe.id ? updatedRecipe[0] : r))
      );
  }

  return (
    <li className='recipe'>
      <p>
        {isUnpopular ? (
          <span className='unpopular'>
            ⚠️ WARNING - This recipe was disliked by our voters!
          </span>
        ) : null}
        {recipe.name}
        <span className='description'> - {recipe.description}</span>
        <a
          className='recipe-link'
          href={recipe.source}
          target='_blank'
          rel='noreferrer'
        >
          (Recipe)
        </a>
      </p>
      <span className='tag'>{recipe.category}</span>
      <div className='vote-buttons'>
        <button
          onClick={() => handleVote('votesVeryHappy')}
          disabled={isUpdating}
        >
          <img
            src='https://img.icons8.com/pulsar-color/30/null/smiling.png'
            alt='very happy face emoji'
          />
          {recipe.votesVeryHappy}
        </button>
        <button onClick={() => handleVote('votesHappy')} disabled={isUpdating}>
          <img
            src='https://img.icons8.com/pulsar-color/30/null/happy.png'
            alt='happy face emoji'
          />
          {recipe.votesHappy}
        </button>
        <button onClick={() => handleVote('votesSad')} disabled={isUpdating}>
          <img
            src='https://img.icons8.com/pulsar-color/30/null/sad.png'
            alt='sad face emoji'
          />
          {recipe.votesSad}
        </button>
      </div>
    </li>
  );
}

function Footer() {
  return (
    <footer className='footer'>
      Made with 💚 and some lovely icons and emoji from{'  '}
      <a
        className='footer-link'
        href='https://icons8.com/'
        target='_blank'
        rel='noreferrer'
      >
        icons8.com
      </a>
    </footer>
  );
}

export default App;
