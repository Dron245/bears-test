// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

window.addEventListener("DOMContentLoaded", () => {
	document.addEventListener("click", documentActions);

	function documentActions(e) {
		const targetElement = e.target;
		// console.log(targetElement);
		if (targetElement.closest(".action__top")) {
			targetElement.closest(".action").classList.toggle("_active");
		}

		if (targetElement.closest(".action__item")) {
			targetElement.closest(".action__item").classList.toggle('_picked')
			const picked = document.querySelector('.action__picked')
			picked.insertAdjacentHTML(
				"beforeEnd",
				`<li class="picked__item action__item _picked">123</li>`
			)
		}
	}
});
