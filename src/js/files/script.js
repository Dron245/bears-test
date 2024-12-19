// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';

window.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('click', documentActions);
	const sel= []
	function documentActions(e) {
		const targetElement = e.target;
		const action = targetElement.closest('.action__item');
		const list = document.querySelector('.action__list');
		const pickedList = document.querySelector('.picked');
		const img = document.querySelectorAll('.priorities__img') 
		console.log(targetElement);
		if (targetElement.closest('.action__top')) {
			targetElement.closest('.action').classList.toggle('_active');
		}
		//выбираю из выпадающего меню
		img.forEach(element => {
			console.log(0);
			element.classList.add('_shadow')
		});
		console.log(sel);
		
		if (action && action.dataset.part !=='0') {
			const item = targetElement.closest('.action__item');
			const imgBears = document.querySelectorAll('.priorities__img')
			
			imgBears.forEach(element => {
				// element.classList.add('_shadow')
				if (element.dataset.img === action.dataset.part ) {
					// element.classList.add('_shadow')
					function toggleElement(number) {
						const index = sel.indexOf(number);
						if (index === -1) {
						  sel.push(number);
						} else {
						  sel.splice(index, 1);
						}
					 }
					 toggleElement(element.dataset.img)
					 console.log(sel);
					 if (sel.length===0) {
						console.log(document.querySelector(`._picked[data-part="0"]`));
						img.forEach(element => {
							element.classList.remove('_shadow')
						});
					}
				}
				for (let i = 0; i < sel.length; i++) {
					if(element.dataset.img ===sel[i]) {
						element.classList.remove('_shadow')
					}
				}
				// console.log(sel.length, img.length);
				
			});
			// console.log(sel.length, img.length);
			
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
		
		} else {
			img.forEach(element => {
				element.classList.remove('_shadow')
			});
			sel.length=0
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

	const img = document.querySelector('.priorities__img')
	const banner = document.querySelector('.priorities__banner');
	banner.style.height = img.clientHeight + 'px'
	let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
	banner.style.height = img.clientHeight + 'px'
  }, 100); // Задержка в 100 миллисекунд
});
	
});
