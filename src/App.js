import React, { useEffect } from 'react';
import { useState } from 'react';
import supabase from './supabase';
import './styles.css';

const initialRecipes = [
  {
    id: 1,
    name: 'White Bean & Butternut Squash Bake',
    description: 'Nutritious & easy to make in the slow cooker!',
    source:
      'https://www.barilla.com/en-us/recipes/blue-box/barilla-slow-cooker-medium-shells-with-spicy-marinara-sauce-butternut-squash-and-white-beans/',
    category: 'italian',
    votesVeryHappy: 12,
    votesHappy: 8,
    votesSad: 2,
    createdIn: 2021,
  },
  {
    id: 2,
    name: 'Chicken Paprikash',
    description: 'Simple yet sophisticated!',
    source: 'https://cooking.nytimes.com/recipes/1018068-chicken-paprikash/',
    category: 'hungarian',
    votesVeryHappy: 10,
    votesHappy: 3,
    votesSad: 1,
    createdIn: 2019,
  },
  {
    id: 3,
    name: 'Shahi Paneer',
    description: 'Creamy & rich in flavour!',
    source: 'https://www.manjulaskitchen.com/shahi-paneer/',
    category: 'indian',
    votesVeryHappy: 13,
    votesHappy: 5,
    votesSad: 0,
    createdIn: 2020,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getRecipes() {
      setIsLoading(true);
      const { data: recipes, error } = await supabase
        .from('recipes')
        .select('*')
        .limit(100);

      if (!error) setRecipes(recipes);
      else console.warn('There was a problem getting data! ☹️');
      setIsLoading(false);
    }
    getRecipes();
  }, []);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewRecipeForm setRecipes={setRecipes} setShowForm={setShowForm} />
      ) : null}

      <main className='main'>
        <CategoryFilter />
        {isLoading ? <Loader /> : <RecipesList recipes={recipes} />}
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
  const [source, setSource] = useState('http://example.com');
  const [category, setCategory] = useState('');
  const nameLength = name.length;
  const descriptionLength = description.length;

  function handleSubmit(event) {
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
      const newRecipe = {
        id: Math.round(Math.random() * 10000000),
        name,
        description,
        source,
        category,
        votesVeryHappy: 0,
        votesHappy: 0,
        votesSad: 0,
        createdIn: new Date().getFullYear(),
      };

      setRecipes((recipes) => [newRecipe, ...recipes]);

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
      />
      <span>{50 - nameLength} characters left</span>
      <input
        value={description}
        type='text'
        placeholder='Enter new recipe description'
        onChange={(event) => setDescription(event.target.value)}
      />
      <span>{100 - descriptionLength} characters left</span>
      <input
        value={source}
        type='text'
        placeholder='Enter link to recipe'
        onChange={(event) => setSource(event.target.value)}
      />
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value=''>Choose cuisine type</option>
        {CATEGORIES.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className='btn btn-large'>Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li className='category'>
          <button className='btn btn-all-categories'>All Cuisines</button>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category.name} className='category'>
            <button className='btn btn-category'>{category.name}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function RecipesList({ recipes }) {
  return (
    <section>
      <ul className='recipes-list'>
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </ul>
      <p>There are {recipes.length} recipes in the database. Add your own!</p>
    </section>
  );
}

function Recipe({ recipe }) {
  return (
    <li className='recipe'>
      <p>
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
        <button>
          <img
            src='https://img.icons8.com/pulsar-color/30/null/smiling.png'
            alt='very happy face emoji'
          />
          {recipe.votesVeryHappy}
        </button>
        <button>
          <img
            src='https://img.icons8.com/pulsar-color/30/null/happy.png'
            alt='happy face emoji'
          />
          {recipe.votesHappy}
        </button>
        <button>
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
      Made with 💚 and some lovely icons and emoji from{' '}
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
