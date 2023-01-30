import showSelectOption from "./showSelectOption.js";
import { typesName } from "./typesName.js";
// dropdown filter by type
const menuOptions = document.querySelector("ul");
export default function typesDropdown() {
  typesName.map((item) => {
    const option = document.createElement("li");
    option.className = "option";
    // add type
    const optionText = document.createElement("span");
    optionText.className = "option-text";
    optionText.textContent = item.type;

    option.appendChild(optionText);
    menuOptions.appendChild(option);
  });
  // show select option
  showSelectOption("dropdownArrow__type", "select-menu--type");
}
