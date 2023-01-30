import fetchRegion from "./regions.js";
import showSelectOption from "./showSelectOption.js";

export const regions = await fetchRegion();
const menuOptionsRegion = document.getElementById("options--region");
export default function regionDropdown() {
  menuOptionsRegion.innerHTML = "";
  console.log(regions);
  regions.map((location) => {
    const option = document.createElement("li");
    option.className = "option";
    // add type
    const optionText = document.createElement("span");
    optionText.className = "option-text";
    optionText.textContent = location.name;
    option.appendChild(optionText);
    menuOptionsRegion.appendChild(option);
  });
  // show select option
  showSelectOption("dropdownArrow__region", "select-menu--region");
}
