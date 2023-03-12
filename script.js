const button = document.querySelector('.btn-open');
const form = document.querySelector('.recipe-form');
const recipesList = document.querySelector('.recipes-list');

recipesList.innerHTML = '';

button.addEventListener('click', function () {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden');
    button.textContent = 'Close';
  } else {
    form.classList.add('hidden');
    button.textContent = 'Share a recipe';
  }
});
