import styles from './ContactList.module.scss';

export const ContactList = (): string => {
    return `
    <div class="${styles['contacts-list']}">
        <div class="${styles['empty-state']}">Список контактов пуст</div>
        <div class="${styles['contacts-container']}" style="display: none;"></div>
    </div>
  `;
}

export const initContactsList = () => {
    const contactsContainer = document.querySelector<HTMLElement>(`.${styles['contacts-container']}`);
    const emptyState = document.querySelector<HTMLElement>(`.${styles['empty-state']}`);

    if (contactsContainer && emptyState) {
        const hasGroups = contactsContainer.children.length > 0;
        contactsContainer.style.display = hasGroups ? 'block' : 'none';
        emptyState.style.display = hasGroups ? 'none' : 'block';
    }
};



