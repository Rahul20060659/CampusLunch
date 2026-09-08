// Sample cafeteria menu data embedded directly so index.html works locally and on GitHub Pages without fetch or a server
const MENU_DATA = [
  {
    day: "Monday",
    name: "Bibimbap",
    price: 6500,
    vegetarian: true,
    description: "Rice, vegetables, and gochujang."
  },
  {
    day: "Monday",
    name: "Chicken rice",
    price: 7000,
    vegetarian: false,
    description: "Grilled chicken with steamed rice."
  },
  {
    day: "Monday",
    name: "Tofu bowl",
    price: 6000,
    vegetarian: true,
    description: "Tofu, greens, and sesame dressing."
  },
  {
    day: "Tuesday",
    name: "Mushroom pasta",
    price: 7500,
    vegetarian: true,
    description: "Pasta with mushrooms and herbs."
  },
  {
    day: "Tuesday",
    name: "Beef noodles",
    price: 8000,
    vegetarian: false,
    description: "Noodles with beef and vegetables."
  },
  {
    day: "Tuesday",
    name: "Lentil soup",
    price: 5500,
    vegetarian: true,
    description: "Lentils with bread on the side."
  },
  {
    day: "Wednesday",
    name: "Fish rice",
    price: 7500,
    vegetarian: false,
    description: "Fish with rice and seasonal greens."
  },
  {
    day: "Wednesday",
    name: "Pork cutlet",
    price: 8000,
    vegetarian: false,
    description: "Breaded pork with cabbage salad."
  },
  {
    day: "Wednesday",
    name: "Chicken noodles",
    price: 7000,
    vegetarian: false,
    description: "Chicken and noodles in broth."
  }
];

/**
 * Format price in KRW with standard thousand separators.
 * @param {number} price
 * @returns {string} e.g. "6,500 KRW"
 */
function formatPrice(price) {
  return `${price.toLocaleString("ko-KR")} KRW`;
}

/**
 * Update the meal count element text.
 * @param {number} count
 */
function updateMealCount(count) {
  const countElement = document.getElementById("meal-count");
  if (!countElement) return;

  if (count === 1) {
    countElement.textContent = "1 meal available";
  } else {
    countElement.textContent = `${count} meals available`;
  }
}

/**
 * Render meal cards into the DOM and update count.
 * @param {Array} meals
 */
function renderMeals(meals) {
  const mealList = document.getElementById("meal-list");
  const emptyMessage = document.getElementById("empty-message");

  if (!mealList) return;

  mealList.innerHTML = "";
  const count = meals ? meals.length : 0;
  updateMealCount(count);

  if (count === 0) {
    if (emptyMessage) emptyMessage.hidden = false;
    return;
  }

  if (emptyMessage) emptyMessage.hidden = true;

  meals.forEach((meal) => {
    const card = document.createElement("article");
    card.className = "meal-card";
    card.tabIndex = 0;
    card.setAttribute(
      "aria-label",
      `${meal.name}, ${formatPrice(meal.price)}${meal.vegetarian ? ", Vegetarian" : ""}`
    );

    // Card body (title, badge, description)
    const cardBody = document.createElement("div");
    cardBody.className = "meal-card-body";

    const header = document.createElement("div");
    header.className = "meal-header";

    const title = document.createElement("h3");
    title.className = "meal-name";
    title.textContent = meal.name;
    header.appendChild(title);

    if (meal.vegetarian) {
      const badge = document.createElement("span");
      badge.className = "badge-vegetarian";
      badge.textContent = "Vegetarian";
      badge.setAttribute("aria-label", "Vegetarian meal");
      header.appendChild(badge);
    }

    const description = document.createElement("p");
    description.className = "meal-description";
    description.textContent = meal.description;

    cardBody.appendChild(header);
    cardBody.appendChild(description);

    // Price in KRW anchored at bottom
    const price = document.createElement("p");
    price.className = "meal-price";
    price.textContent = formatPrice(meal.price);

    card.appendChild(cardBody);
    card.appendChild(price);

    mealList.appendChild(card);
  });
}

/**
 * Filter meals by selected day and re-render.
 */
function applyDayFilter() {
  const daySelect = document.getElementById("day-select");
  const selectedDay = daySelect ? daySelect.value : "Monday";
  const filteredMeals = MENU_DATA.filter((meal) => meal.day === selectedDay);
  renderMeals(filteredMeals);
}

/**
 * Setup layout preview switcher between Laptop and Phone views.
 */
function setupLayoutSwitcher() {
  const btnLaptop = document.getElementById("btn-laptop-view");
  const btnPhone = document.getElementById("btn-phone-view");
  const container = document.getElementById("page-container");

  if (!btnLaptop || !btnPhone || !container) return;

  btnLaptop.addEventListener("click", () => {
    container.className = "page-container view-laptop";
    btnLaptop.classList.add("active");
    btnLaptop.setAttribute("aria-pressed", "true");
    btnPhone.classList.remove("active");
    btnPhone.setAttribute("aria-pressed", "false");
  });

  btnPhone.addEventListener("click", () => {
    container.className = "page-container view-phone";
    btnPhone.classList.add("active");
    btnPhone.setAttribute("aria-pressed", "true");
    btnLaptop.classList.remove("active");
    btnLaptop.setAttribute("aria-pressed", "false");
  });
}

/**
 * Initial page setup: binds events and loads default (Monday) menu.
 */
function init() {
  const daySelect = document.getElementById("day-select");
  if (daySelect) {
    daySelect.value = "Monday";
    daySelect.addEventListener("change", applyDayFilter);
  }

  setupLayoutSwitcher();
  applyDayFilter();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
