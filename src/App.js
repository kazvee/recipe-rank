import React from 'react';
import './styles.css';

const CATEGORIES = [
  { name: 'canadian' },
  { name: 'german' },
  { name: 'hungarian' },
  { name: 'indian' },
  { name: 'italian' },
  { name: 'scottish' },
];

const initialRecipes = [
  {
    id: 1,
    text: 'White Bean & Butternut Squash Bake',
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
    text: 'Chicken Paprikash',
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
    text: 'Shahi Paneer',
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
        <RecipesList />
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

function RecipesList() {
  // temporary data
  const recipes = initialRecipes;

  return (
    <section>
      <ul className='recipes-list'>
        {recipes.map((recipe) => (
          <li key={recipe.id} className='recipe'>
            <p>
              {recipe.text}
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
        ))}
      </ul>
    </section>
  );
}

export default App;