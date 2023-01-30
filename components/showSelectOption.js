import { allFilterClickListener } from "./mutiFilter.js";
export default function showSelectOption(filterName, menuName) {
  const optionMenu = document.querySelector(`.${menuName}`),
    selectBtn = document.getElementById(filterName),
    options = optionMenu.querySelectorAll(".option"),
    sBtn_text = optionMenu.querySelector(".sBtn-text");

  selectBtn.addEventListener("click", () => {
    optionMenu.classList.toggle("active");
  });
  options.forEach((option) => {
    option.addEventListener("click", () => {
      let selectedOption = option.querySelector(".option-text").innerText;
      sBtn_text.innerText = selectedOption;
      // optionMenu.classList.remove("active");
      if (filterName.includes("type")) {
        console.log("hi");
        // filterPoke(selectedOption.toLowerCase());
        allFilterClickListener(selectedOption.toLowerCase(), "types");
      } else if (filterName.includes("region")) {
        // filerPokeByRegion(selectedOption.toLowerCase());
        allFilterClickListener(selectedOption.toLowerCase(), "regions");
      }
    });
  });
}
