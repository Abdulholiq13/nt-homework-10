const API_URL = 'https://dummyjson.com';
const elWrapper = document.querySelector('.card-wrapper');
const elLoading = document.querySelector('.loading');
const elThemeController = document.querySelector('.theme-controller');

async function getData(api) {
  try {
    let response = await fetch(`${api}/products`);

    response
      .json()
      .then((res) => createCard(res))
      .catch((err) => console.error(err))
      .finally(() => {
        elLoading.classList.add('hidden');
      });
  } catch (err) {
    console.error(err.message);
  }
}

getData(API_URL);

function createCard(data) {
  data.products.slice(0, 9).forEach((product) => {
    let card = document.createElement('div');
    card.classList.add(
      'card',
      'dark:card',
      'bg-base-100',
      'dark:bg-base-100',
      'w-96',
      'dark:w-96',
      'shadow-xl',
      'dark:shadow-xl'
    );
    card.innerHTML = `
      <figure>
        <img
         class="w-[384px] dark:w-[384px] h-[384px] dark:h-[384px] object-contain dark:object-contain"
        src=${product.images[0]}
        alt="" />
      </figure>
    <div class="card-body">
      <h2 class="card-title">${product.title}</h2>
      <p>${product.description}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
    `;
    elWrapper.appendChild(card);
  });
}

function setThemes(theme) {
  document.body.setAttribute('data-theme', theme);
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme');
  console.log(currentTheme);
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setThemes(newTheme);
  localStorage.setItem('theme', newTheme);
}

elThemeController.addEventListener('click', toggleTheme);

const savedTheme = localStorage.getItem('theme') || 'light';
setThemes(savedTheme);
