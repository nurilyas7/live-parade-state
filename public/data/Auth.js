import { SingletonEventDispatcher } from '../../src/util/EventDispatcher.js';

export default class Auth extends SingletonEventDispatcher {

    constructor() {
        super();
    }

    init() {
        let isSignedIn = false;
        var userObject = localStorage.getItem('user');
        if (userObject) {
            isSignedIn = true;
            this.emit('signed-in', JSON.parse(userObject));
        } else this.emit('signed-out');

        firebase.auth().onAuthStateChanged(async user => {
            if(user) {
                let isAdmin = user.email.split('@')[0] === 'admin';
                let { uid, email } = user;
                let userInfo;
                if (isAdmin) userInfo = { isAdmin, email, uid }; 
                else {
                    let idTokenResult = await this.getUserToken();
                    let { branchid, departmentid } = idTokenResult.claims;
                    userInfo = { uid, email, branchid, departmentid };
                }
                localStorage.setItem('user', JSON.stringify(userInfo));
                if(!isSignedIn) {
                    isSignedIn = true;
                    this.emit('signed-in', userInfo);
                }
            }
            else if(isSignedIn) {
                isSignedIn = false;
                localStorage.clear();
                this.emit('signed-out');
            }
        });
    }

    async getUserToken() {
        return await firebase.auth().currentUser.getIdTokenResult();
    }

    login(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
            let message = 'User doesn\'t exist';
            if (error.code === 'auth/wrong-password') message = 'Password is invalid';
            this.emit('error', message);
        });
    }

    logout() {
        firebase.auth().signOut();
    }

}
Auth.instance = null;