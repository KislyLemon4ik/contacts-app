import styles from './LeftBar.module.scss';
import IMask from 'imask';
import { addNewGroup } from '../../../model/group.ts';

type LeftBarMode = 'contact' | 'group';

export const LeftBar = (mode: LeftBarMode = 'contact'): string => {
    const headerText = mode;
    if (headerText === 'contact') {
        return `
        <div id="leftbar-wrapper" class="${styles['leftbar-wrapper']}">
            <div id="leftbar" class="${styles.leftbar}">
                <div class="${styles['leftbar-content']}">
                     <div class="${styles['leftbar--header']}"> 
                        <div class="${styles['leftbar--header--text']}">Добавление контакта</div>
                        <button id="leftbar--header--button" class="${styles['leftbar--header--button']}"></button>
                     </div>
                     <div class="${styles['leftbar-content--list']}">
                        <input id="contact-name" class="${styles['info-input']}" type="text" placeholder="Введите ФИО" required />
                        <input id="phone-input" class="${styles['info-input']}" type="text" placeholder="Введите номер" required />
                        <select id="group-select" class="${styles['custom-select']}" required>
                            <option value="" selected disabled>Выберите группу</option>
                            <option value="Группа 1">Группа 1</option>
                            <option value="Группа 2">Группа 2</option>
                            <option value="Группа 3">Группа 3</option>
                            <option value="Группа 4">Группа 4</option>
                            <option value="Группа 5">Группа 5</option>
                        </select>
                        <div id="validation-error" class="${styles['validation-error']}" style="display: none;">
                            Заполните все обязательные поля
                        </div>
                     </div>
                </div>
                <div class="${styles['save-button-wrapper']}">
                    <button id="leftbar-save-btn" class="${styles['save-button']}">Сохранить</button>
                </div>
            </div>
        </div>
        `;
    } else {
        return `
        <div id="leftbar-wrapper" class="${styles['leftbar-wrapper']}">
            <div id="leftbar" class="${styles.leftbar}">
                <div class="${styles['leftbar-content']}">
                     <div class="${styles['leftbar--header']}"> 
                        <div class="${styles['leftbar--header--text']}">Группы контактов</div>
                        <button id="leftbar--header--button" class="${styles['leftbar--header--button']}"></button>
                     </div>
                     <div class="${styles['group-name-wrapper']}">
                        <div class="${styles['group-button']}">
                            <div class="${styles['group-button-text']}">Группа 1</div>
                            <button class="${styles['group-button-delete']}"></button>
                        </div>
                        <div class="${styles['group-button']}">
                            <div class="${styles['group-button-text']}">Группа 2</div>
                            <button class="${styles['group-button-delete']}"></button>
                        </div>
                     </div>
                </div>
                <div class="${styles['save-button-wrapper']}">
                    <button id="leftbar-save-btn" class="${styles['add-button']}">Сохранить</button>
                    <button id="leftbar-save-btn" class="${styles['save-button']}">Добавить</button>
                </div>
            </div>
        </div>
        `;
    }
}

export const initLeftBar = () => {
    // Маска для телефона
    const phoneInput = document.getElementById('phone-input');
    if (phoneInput) {
        IMask(phoneInput, {
            mask: '+{375}(00)000-00-00',
        });
    }

    // Элементы LeftBar
    const leftbarWrapper = document.getElementById('leftbar-wrapper');
    const leftbar = document.getElementById('leftbar');
    const closeButton = document.getElementById('leftbar--header--button');
    const saveButton = document.getElementById('leftbar-save-btn');
    const validationError = document.getElementById('validation-error');

    // Закрытие при клике вне LeftBar
    if (leftbarWrapper && leftbar) {
        leftbarWrapper.addEventListener('click', (e) => {
            if (!leftbar.contains(e.target as Node)) {
                leftbarWrapper.classList.remove(styles['visible']);
            }
        });
    }

    // Закрытие при клике на кнопку закрытия
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            leftbarWrapper?.classList.remove(styles['visible']);
        });
    }

    // Обработчик кнопки "Сохранить"
    // Обработчик кнопки "Сохранить"
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            const nameInput = document.getElementById('contact-name') as HTMLInputElement;
            const phoneInput = document.getElementById('phone-input') as HTMLInputElement;
            const groupSelect = document.getElementById('group-select') as HTMLSelectElement;

            // Сбрасываем предыдущие ошибки
            nameInput.classList.remove(styles['input-error']);
            phoneInput.classList.remove(styles['input-error']);
            groupSelect.classList.remove(styles['input-error']);

            // Валидация полей
            let isValid = true;

            if (!nameInput.value.trim()) {
                nameInput.classList.add(styles['input-error']);
                isValid = false;
            }

            if (!phoneInput.value.trim() || !phoneInput.value.match(/\+375\(\d{2}\)\d{3}-\d{2}-\d{2}/)) {
                phoneInput.classList.add(styles['input-error']);
                isValid = false;
            }

            if (!groupSelect.value) {
                groupSelect.classList.add(styles['input-error']);
                isValid = false;
            }

            if (!isValid) {
                if (validationError) validationError.style.display = 'block';
                return;
            }

            // Продолжаем обработку если валидация пройдена
            if (validationError) validationError.style.display = 'none';

            // Добавляем группу
            addNewGroup(groupSelect.value, [
                {
                    name: nameInput.value.trim(),
                    phone: phoneInput.value.trim()
                }
            ]);

            // Закрываем и очищаем форму
            leftbarWrapper?.classList.remove(styles['visible']);
            nameInput.value = '';
            phoneInput.value = '';
            groupSelect.selectedIndex = 0;
        });
    }
};


export const showLeftBar = (mode: LeftBarMode = 'contact') => {
    const leftbarWrapper = document.getElementById('leftbar-wrapper');
    const headerText = mode;

    if (leftbarWrapper) {
        leftbarWrapper.outerHTML = LeftBar(mode);
        if (headerText === 'contact') {
            const newLeftbar = document.getElementById('leftbar-wrapper');
            if (newLeftbar) {
                newLeftbar.classList.add(styles['visible']);

                // Сбрасываем состояние ошибок при открытии
                const errorElements = newLeftbar.querySelectorAll(`.${styles['input-error']}`);
                errorElements.forEach(el => el.classList.remove(styles['input-error']));

                const validationError = document.getElementById('validation-error') as HTMLElement;
                if (validationError) validationError.style.display = 'none';

                initLeftBar();
            }
            else return;
        } else if (headerText === 'group') {
            const newLeftbar = document.getElementById('leftbar-wrapper');
            if (newLeftbar) {
                newLeftbar.classList.add(styles['visible']);

                initLeftBar();
            }
            else return;
        }
        else return;
    }
};