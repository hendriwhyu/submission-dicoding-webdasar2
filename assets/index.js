const slider = document.getElementById("slider");
const items = document.querySelectorAll(".item");

let visibleItems = 3; // Number of items visible at a time
let currentItem = 0; // Index of the first visible item
let isDragging = false;
let startX = 0;
let startTranslate = 0;
let currentTranslate = 0;

const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  nav.classList.toggle("nav-active");
  burger.classList.toggle("toggle");
});

nav.querySelectorAll("[data-scroll]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const element = document.getElementById(e.currentTarget.dataset.scroll);
    let position = element.getBoundingClientRect();
    window.scrollTo(
      position.left,
      position.top + window.scrollY - (nav.clientHeight + 50)
    );
  });
});

// Function to update the slider's position based on currentItem
function updateSliderPosition() {
  const itemWidth =
    items[0].offsetWidth +
    parseInt(window.getComputedStyle(items[0]).marginRight);
  const offset = -currentItem * itemWidth;
  slider.style.transform = `translateX(${offset}px)`;
  updateItemVisibility();
}

// Function to update item visibility
function updateItemVisibility() {
  items.forEach((item, index) => {
    if (index >= currentItem && index < currentItem + visibleItems) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function handleStart(event) {
  isDragging = true;
  startX = event.touches ? event.touches[0].clientX : event.clientX;
  startTranslate = currentTranslate;
  slider.style.cursor = "grabbing";
}

function handleEnd() {
  isDragging = false;
  slider.style.cursor = "grab";
}

function handleMove(event) {
  if (!isDragging) return;
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const deltaX = clientX - startX;
  const itemWidth =
    items[0].offsetWidth +
    parseInt(window.getComputedStyle(items[0]).marginRight);
  const maxTranslate = 0;
  const minTranslate = -(items.length - visibleItems) * itemWidth;
  currentTranslate = Math.min(
    Math.max(startTranslate + deltaX, minTranslate),
    maxTranslate
  );
  slider.style.transform = `translateX(${currentTranslate}px)`;
  currentItem = Math.round(-currentTranslate / itemWidth);
  updateItemVisibility();
}

// Event listeners for both mouse and touch events
slider.addEventListener("mousedown", handleStart);
slider.addEventListener("mouseup", handleEnd);
slider.addEventListener("mousemove", handleMove);
slider.addEventListener("pointerdown", handleStart);
slider.addEventListener("pointerup", handleEnd);
slider.addEventListener("pointermove", handleMove);
slider.addEventListener("touchstart", handleStart);
slider.addEventListener("touchend", handleEnd);
slider.addEventListener("touchmove", handleMove);

// Initialize the slider with the first visible items
updateItemVisibility();

function updateVisibleItems() {
  visibleItems = window.innerWidth <= 820 ? 6 : 3;
  updateSliderPosition();
}

window.addEventListener("resize", updateVisibleItems);
window.addEventListener("DOMContentLoaded", updateVisibleItems);