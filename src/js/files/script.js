// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';

window.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('click', documentActions);

	function documentActions(e) {
		const targetElement = e.target;
		const action = targetElement.closest('.action__item')
		const list = document.querySelector('.action__list')
		const pickedList = document.querySelector('.picked');
		console.log(targetElement);
		if (targetElement.closest('.action__top')) {
			targetElement.closest('.action').classList.toggle('_active');
		}
		//выбираю из выпадающего меню
		if (action && action.dataset.part !=='0') {
			const item = targetElement.closest('.action__item');
			const imgBears = document.querySelectorAll('.priorities__img')
			if (document.querySelectorAll('._shadow').length == 0) {
				imgBears.forEach(element => {
					if (element.dataset.img === action.dataset.part) {
						console.log(9);
						element.classList.add('_shadow')
					}
				});
			}
			
			imgBears.forEach(element => {
				if (element.dataset.img === action.dataset.part) {
					console.log(123);
					element.classList.toggle('_shadow')
				}
			});
			// imgBears.forEach(element => {
			// 	if (element.dataset.img === action.dataset.part) {
			// 		element.classList.remove('_shadow')
			// 	}
			// });
			// document.querySelector(`[data-img='${action.dataset.part}']`).classList.remove('_shadow')
			pickedList.querySelector("[data-part='0']") ? 
			pickedList.querySelector("[data-part='0']").remove() : null
			list.querySelector("[data-part='0']").classList.remove('_picked')
			item.classList.toggle('_picked');

			console.log(777);
			if (pickedList.querySelector('.action__item') && 
			pickedList.querySelector(`[data-part='${item.dataset.part}']`)) {
				pickedList.querySelector(`[data-part='${item.dataset.part}']`).remove()
			} else {
				// console.log(666);
				pickedList.insertAdjacentHTML(
					'beforeEnd',
					`<li class="picked__item action__item _picked" data-part="${item.dataset.part}">
						<p class="action__text">${item.querySelector('.action__text').innerText}</p>
					</li>`
				);
			}
			// if (action.dataset.part !=='0') {
			// 	console.log(123);
			// }
		} else {
			if (action && !pickedList.querySelector("[data-part='0']")) {
				pickedList.querySelectorAll('.picked__item').forEach(el=>el.remove())
				pickedList.insertAdjacentHTML(
					'beforeEnd',
					`<li class="picked__item action__item _picked" data-part="0">
						<p class="action__text">Все направления</p>
					</li>`
				);
				list.querySelectorAll('.action__item')
				.forEach(el=>el.classList.remove('_picked'))
				list.querySelector("[data-part='0']").classList.add('_picked')
				console.log(555);
			}
		}

		if (targetElement.closest('.picked__item') &&
		 targetElement.closest('.picked__item').dataset.part !== '0') {
			const pick = targetElement.closest('.picked__item').dataset.part
			list.querySelector(`[data-part='${pick}']`)
			.classList.remove('_picked')
		}

		if ((action && list.querySelectorAll('._picked').length<1)) {
			list.querySelector("[data-part='0']").classList.add('_picked');
			pickedList.insertAdjacentHTML(
				'beforeEnd',
				`<li class="picked__item action__item _picked" data-part="0">
					<p class="action__text">Все направления</p>
				</li>`
			);
		}
	}
});
