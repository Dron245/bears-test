// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';



window.addEventListener('DOMContentLoaded', () => {
	// массив data-img значений выбранных медведей
	const sel = [];
	//функция добавления в массив, если элемента нет в нём и удаления элемента, если он есть
	function toggleElement(number) {
		const index = sel.indexOf(number);
		if (index === -1) {
			sel.push(number);
		} else {
			sel.splice(index, 1);
		}
	}
	document.addEventListener('click', documentActions);
	
	function documentActions(e) {
		const targetElement = e.target;
		const action = targetElement.closest('.action__item');
		const list = document.querySelector('.action__list');
		const pickedList = document.querySelector('.picked');
		const img = document.querySelectorAll('.priorities__img');

		// console.log(targetElement);
		//открытие-закрытие меню
		if (targetElement.closest('.action__top')) {
			targetElement.closest('.action').classList.toggle('_active');
		}
		// если нажал на любой пункт меню кроме "все направления"
		if (action && action.dataset.part !== '0') {
			const item = targetElement.closest('.action__item');
			const imgBears = document.querySelectorAll('.priorities__img');
			//скрываю всех медведей изначально
			img.forEach((element) => {
				element.classList.add('_shadow');
			});
			//прохожу по всем медведям, делаю проверку 
			//и добавляю-удаляю его порядковый номер из массива
			imgBears.forEach((element) => {
				if (element.dataset.img === action.dataset.part) {
					toggleElement(element.dataset.img);
					if (sel.length === 0) {
						img.forEach((element) => {
							element.classList.remove('_shadow');
						});
					}
				}
				// если порядковый номер медведя есть в массиве, 
				//то, соответствующему ему изображению удаляю класс затемнения
				for (let i = 0; i < sel.length; i++) {
					if (element.dataset.img === sel[i]) {
						element.classList.remove('_shadow');
					}
				}
			});

			// удаляю "все направления" из списка выбранного
			pickedList.querySelector("[data-part='0']")
				? pickedList.querySelector("[data-part='0']").remove()
				: null;
			//  удаляю выдедение у "все направления"
			list.querySelector("[data-part='0']").classList.remove('_picked');
			//  добавляю выдедение у "выбранного пункта"
			item.classList.toggle('_picked');

			// если нажатый элемент есть в списке выбранных элементов,
			// то удаляю его, если нет, то добавляю
			if (
				pickedList.querySelector('.action__item') &&
				pickedList.querySelector(`[data-part='${item.dataset.part}']`)
			) {
				pickedList.querySelector(`[data-part='${item.dataset.part}']`).remove();
			} else {
				pickedList.insertAdjacentHTML(
					'beforeEnd',
					`<li class="picked__item action__item _picked" data-part="${item.dataset.part}">
						<p class="action__text">${item.querySelector('.action__text').innerText}</p>
					</li>`
				);
			}
		// если нажал на пункт меню  "все направления"
		} else if (action && action.dataset.part === '0') {
			//удаляю затемнение со всех картинок
			img.forEach((element) => {
				element.classList.remove('_shadow');
			});
			//обнуляю массив выбранных значений
			sel.length = 0;
			
			if (action && !pickedList.querySelector("[data-part='0']")) {
				// удаляю все элементы из меню выбранных элементов
				pickedList.querySelectorAll('.picked__item').forEach((el) => el.remove());
				//добавляю в это меню "все направления"
				pickedList.insertAdjacentHTML(
					'beforeEnd',
					`<li class="picked__item action__item _picked" data-part="0">
						<p class="action__text">Все направления</p>
					</li>`
				);
				// из меню выбора выриантов снимаю выделение со всех пунктов
				list
					.querySelectorAll('.action__item')
					.forEach((el) => el.classList.remove('_picked'));
				// выделяю все направления
				list.querySelector("[data-part='0']").classList.add('_picked');
			}
		}

		// обрабатываю нажатия на выбранные пункты в меню уже выбранных элементов
		//если нажал на выбранный пунткт, то снимаю выделение в основном меню
		if (
			targetElement.closest('.picked__item') &&
			targetElement.closest('.picked__item').dataset.part !== '0'
		) {
			const pick = targetElement.closest('.picked__item').dataset.part;
			list.querySelector(`[data-part='${pick}']`).classList.remove('_picked');
		}

		// когда отжимаю назад со ВСЕХ отдельных пунктов меню,
		// вызвращаю выделение пункту "все направления"
		if (action && list.querySelectorAll('._picked').length === 0) {
			list.querySelector("[data-part='0']").classList.add('_picked');
			// и в список выбранных пунутов добавляю пункт "все направления"
			pickedList.insertAdjacentHTML(
				'beforeEnd',
				`<li class="picked__item action__item _picked" data-part="0">
					<p class="action__text">Все направления</p>
				</li>`
			);
		}

		// увеличиваю счётчик лайков на 1 по нажатию
		if (targetElement.closest('.actions__likes')) {
			const likes = targetElement.closest('.actions__likes');
			let count = likes.querySelector('.actions__count');
			console.log(count.innerText, typeof count.innerText);
			count.innerText = Number(count.innerText) + 1 + '';
		}
	}

	// подстраиваю размеры банера под размеры изображений медведей
	// при изменении размера окна. (сделал для удобства, ведь у пользователя
	// фиксированное значение экрана)
	const img = document.querySelector('.priorities__img');
	const banner = document.querySelector('.priorities__banner');
	banner.style.height = img.clientHeight + 'px';
	let resizeTimeout;
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function () {
			banner.style.height = img.clientHeight + 'px';
		}, 100); // Задержка в 100 миллисекунд
	});
});
