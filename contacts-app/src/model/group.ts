import styles from '../widgets/contactlist/ui/ContactList.module.scss';

export type Contact = {
    name: string;
    phone: string;
};

export const addNewGroup = (groupName: string = 'Новая группа', initialContacts: Contact[] = []) => {
    const groupsContainer = document.querySelector<HTMLElement>(`.${styles['contacts-container']}`);
    const emptyState = document.querySelector<HTMLElement>(`.${styles['empty-state']}`);

    if (!groupsContainer || !emptyState) return;

    emptyState.style.display = 'none';
    groupsContainer.style.display = 'block';

    // 1. Поиск существующей группы
    const existingGroup = findGroupByName(groupsContainer, groupName);

    if (existingGroup) {
        // 2. Если группа существует - добавляем контакты
        addContactsToExistingGroup(existingGroup, initialContacts);
    } else {
        // 3. Если группы нет - создаем новую
        createNewGroup(groupsContainer, groupName, initialContacts);
    }
};

// Поиск группы по названию
const findGroupByName = (container: HTMLElement, name: string): HTMLElement | null => {
    const headers = container.querySelectorAll(`.${styles['group-header']}`);
    for (const header of headers) {
        const titleElement = header.querySelector('span');
        if (titleElement?.textContent?.trim() === name.trim()) {
            return header.closest(`.${styles.group}`);
        }
    }
    return null;
};

// Добавление контактов в существующую группу
const addContactsToExistingGroup = (groupElement: HTMLElement, contacts: Contact[]) => {
    const contactsContainer = groupElement.querySelector(`.${styles['group-contacts']}`);
    if (!contactsContainer) return;

    const newContactsHTML = contacts.map(contact => `
        <div class="${styles.contact}">
            <div class="${styles.name}">${contact.name}</div>
            <div class="${styles.phone}">${contact.phone}</div>
        </div>
    `).join('');

    contactsContainer.insertAdjacentHTML('beforeend', newContactsHTML);
};

// Создание новой группы
const createNewGroup = (container: HTMLElement, groupName: string, contacts: Contact[]) => {
    const groupId = `group-${Date.now()}`;
    const newGroup = document.createElement('div');
    newGroup.className = styles.group;

    const contactsHTML = contacts.map(contact => `
        <div class="${styles.contact}">
            <div class="${styles.name}">${contact.name}</div>
            <div class="${styles.phone}">${contact.phone}</div>
        </div>
    `).join('');

    newGroup.innerHTML = `
        <div class="${styles['group-header']}" data-group="${groupId}">
            <span>${groupName}</span>
            <button class="${styles['group-toggle']}"></button>
        </div>
        <div class="${styles['group-contacts']}">
            ${contactsHTML}
        </div>
    `;

    container.appendChild(newGroup);
    const header = newGroup.querySelector(`.${styles['group-header']}`);
    if (header) initSingleGroupEvents(header as HTMLElement);
};

// Инициализация событий группы (без изменений)
const initSingleGroupEvents = (header: HTMLElement) => {
    const groupElement = header.closest(`.${styles.group}`);
    if (!groupElement) return;

    const content = groupElement.querySelector(`.${styles['group-contacts']}`);
    const toggleBtn = header.querySelector(`.${styles['group-toggle']}`) as HTMLButtonElement;

    header.addEventListener('click', () => {
        if (content && toggleBtn) {
            content.classList.toggle(styles['expanded']);
            const isExpanded = content.classList.contains(styles['expanded']);
            // Вращаем SVG стрелку через transform
            toggleBtn.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    });
};