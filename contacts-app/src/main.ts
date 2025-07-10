import './styles/style.scss';
import { TopBar, initTopBar } from "./widgets/topbar/ui/TopBar.ts";
import { LeftBar, initLeftBar } from "./widgets/leftbar/ui/LeftBar.ts";
import { ContactList, initContactsList} from "./widgets/contactlist/ui/ContactList.ts";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="contacts-page">
     ${TopBar()}
     ${LeftBar()}
     ${ContactList()}
  </div>
`;
initTopBar();
initLeftBar();
initContactsList();
