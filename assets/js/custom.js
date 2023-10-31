const custom = () => {
  // Click to show language list for Vimium C
  const languageSelector = document.querySelector(".menu-item-lang");
  const submenu = document.querySelector(".submenu");
  languageSelector.addEventListener("click", () => {
    if (getComputedStyle(submenu).visibility === "hidden") {
      submenu.classList.add("visible");
    } else {
      submenu.classList.remove("visible");
    }
  });
};

export default custom;
