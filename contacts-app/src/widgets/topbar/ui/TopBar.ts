import styles from './Topbar.module.scss';
import { showLeftBar } from "../../leftbar/ui/LeftBar.ts";

export const TopBar = (): string => {
    return `
    <div class="${styles.topbar}">
      <div class="${styles['topbar__label']}">Книга контактов</div>  
      <div class="${styles['topbar__buttons']}">
        <button id="create-contact-btn" class="${styles['topbar__buttons--create']}">Создать контакт</button>
        <button id="create-group-btn" class="${styles['topbar__buttons--groups']}">Группы</button>
      </div>
    </div>
  `;
}

export const initTopBar = () => {
    const createBtn = document.getElementById('create-contact-btn');
    createBtn?.addEventListener('click', () => {
        showLeftBar('contact');
    });
    const groupBtn = document.getElementById('create-group-btn');
    groupBtn?.addEventListener('click', () => {
        showLeftBar('group');
    });
};