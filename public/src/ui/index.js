import LoginView from './LoginView.js';
import ViewSwitcher from './ViewSwitcher.js';
import WCButton from './widgets/WCButton.js';
import AdminScreen from './admin-view/AdminScreen.js';
import WCToast from './widgets/WCToast.js';
import SignOutDialogue from './widgets/SignOutDialogue.js';
import UserScreen from './user-view/UserScreen.js';

const UI = {
    init: () => {
        customElements.define('wc-button', WCButton);
        customElements.define('wc-toast', WCToast);
        customElements.define('sign-out', SignOutDialogue);
        customElements.define('view-switcher', ViewSwitcher);
    },

    adminScreen: () => {
      AdminScreen();
    },

    userScreem: () => {
      UserScreen();
    },
    
    loginScreen: () => {
      customElements.define('login-view', LoginView);
    }
}

export default UI;