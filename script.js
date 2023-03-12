const initialRecipes = [
  {
    id: 1,
    text: 'White Bean & Butternut Squash Bake',
    description: 'Nutritious & easy to make in the slow cooker!',
    source:
      'https://www.barilla.com/en-us/recipes/blue-box/barilla-slow-cooker-medium-shells-with-spicy-marinara-sauce-butternut-squash-and-white-beans/',
    category: 'Italian',
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
    category: 'Hungarian',
    votesVeryHappy: 10,
    votesHappy: 3,
    votesSad: 1,
    createdIn: 2019,
  },
  {
    id: 3,
    text: 'Shahi Paneer',
    description: 'Creamy and so rich in flavour!',
    source: 'https://www.manjulaskitchen.com/shahi-paneer/',
    category: 'Indian',
    votesVeryHappy: 13,
    votesHappy: 5,
    votesSad: 0,
    createdIn: 2020,
  },
];

const CATEGORIES = [
  { name: 'Canadian' },
  { name: 'German' },
  { name: 'Hungarian' },
  { name: 'Indian' },
  { name: 'Italian' },
  { name: 'Scottish' },
];

// Selecting DOM elements
const button = document.querySelector('.btn-open');
const form = document.querySelector('.recipe-form');
const recipesList = document.querySelector('.recipes-list');

// Create DOM elements: Render recipes in list
recipesList.innerHTML = '';
createRecipesList(initialRecipes);

function createRecipesList(dataArray) {
  const htmlArray = dataArray.map(
    (recipe) => `<li class="recipe">
    <p>
    ${recipe.text}
    &#45;
    <span class="description">
    ${recipe.description}
    </span>   
    <a 
      class="recipe-link"
      href="${recipe.source}"
      target="_blank"
      >(Recipe)</a>
    </p>
    <span class="tag">${recipe.category}</span>
    </li>`
  );

  const html = htmlArray.join('');
  recipesList.insertAdjacentHTML('afterbegin', html);
}

// Toggle form visibility
button.addEventListener('click', function () {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden');
    button.textContent = 'Close';
  } else {
    form.classList.add('hidden');
    button.textContent = 'Share a recipe';
  }
});
