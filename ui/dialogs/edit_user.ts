import { LitElement, html, customElement, css } from 'lit-element';
import ACTION_USER from '../../data/actions/user_action';
import { UserAction } from '../../data/states/user_state';
import { ApplicationStore } from '../../data/store';
import Branch from '../../model/branch';
import Department from '../../model/department';
import Rank from '../../model/rank';
import User, { UserBase } from '../../model/user';
import {
  buttonStyles,
  cardStyles,
  globalStyles,
  inputStyles,
  passwordInputStyles
} from '../global_styles';
import {
  InputState,
  INPUT_VALIDITY,
  passwordInput,
  PasswordInputState,
  textInput
} from '../base/input';
import { onPressed } from '../utils';
import '../base/custom_dialog';
import { DIALOG_STATE } from '../base/custom_dialog';

@customElement('edit-user')
export default class EditUser extends LitElement {
  private user?: User;
  private branch?: Branch;
  private department?: Department;
  private editing = false;
  private errorState = {
    message: '',
    visible: false
  };
  private dialogState = DIALOG_STATE.OPENING;
  private nameState: InputState = {
    value: '',
    validity: INPUT_VALIDITY.PENDING
  };
  private rankState: InputState = {
    value: '',
    validity: INPUT_VALIDITY.PENDING
  };
  private emailState: InputState = {
    value: '',
    validity: INPUT_VALIDITY.PENDING
  };
  private passwordState: PasswordInputState = {
    value: '',
    validity: INPUT_VALIDITY.PENDING,
    visible: false
  };
  private isRegularState = false;

  static get properties() {
    return {
      user: { type: Object },
      branch: { type: Object },
      department: { type: Object },
      editing: { type: Boolean, reflect: true },
      dialogState: { type: Number },
      nameState: { type: Object },
      rankState: { type: Object },
      emailState: { type: Object },
      passwordState: { type: Object },
      isRegularState: { type: Boolean },
      errorState: { type: Object }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.user) {
      this.nameState = {
        value: this.user.name,
        validity: INPUT_VALIDITY.VALID
      };
      this.rankState = {
        value: this.user.rank.text,
        validity: INPUT_VALIDITY.VALID
      };
      this.emailState = {
        value: this.user.email.split('@')[0],
        validity: INPUT_VALIDITY.VALID
      };
      this.isRegularState = this.user.regular;
    }
  }

  showError(message: string) {
    this.errorState = { visible: true, message };
  }

  checkValidity() {
    if (this.rankState.validity !== INPUT_VALIDITY.VALID) {
      this.showError('Please enter a valid rank!');
    } else if (this.nameState.validity !== INPUT_VALIDITY.VALID) {
      this.showError('Please enter a valid name!');
    } else if (this.emailState.validity !== INPUT_VALIDITY.VALID) {
      this.showError('Please enter a valid email!');
    } else if (
      !this.editing &&
      this.passwordState.validity !== INPUT_VALIDITY.VALID
    ) {
      this.showError('Please enter a valid password!');
    }
  }

  submit() {
    return onPressed(() => {
      this.checkValidity();
      if (this.errorState.visible) return;

      const name = this.nameState.value;
      const rank = new Rank(this.rankState.value);
      const email = this.emailState.value + '@' + this.branch?.domain;
      const regular = this.isRegularState;
      const departmentid = this.department!.id;
      const branchid = this.branch!.id;

      let data = { name, rank, email, regular, branchid, departmentid };
      let action: UserAction;

      if (this.editing) {
        action = ACTION_USER.requestModify({
          ...this.user!,
          ...data
        });
      } else {
        let user = new UserBase({ ...data });
        action = ACTION_USER.requestAdd(user);
      }

      ApplicationStore.dispatch(action);
      this.dialogState = DIALOG_STATE.CLOSING;
    });
  }

  changePassword() {
    return onPressed(() => {});
  }

  delete() {
    return onPressed(() => {
      let action = ACTION_USER.requestRemove(this.user!);
      ApplicationStore.dispatch(action);
      this.dialogState = DIALOG_STATE.CLOSING;
    });
  }

  reset() {
    this.errorState = {
      ...this.errorState,
      visible: false
    };
  }

  render() {
    return html`<custom-dialog .state="${this.dialogState}">
      <div id="root" tabindex="0" class="selectable">
        <p id="department-name">${this.department!.name}</p>

        <div class="header">
          <h3>${this.editing ? 'Edit' : 'Add'} User</h3>

          ${this.editing
            ? html` <button
                plain
                id="delete"
                @click="${this.delete()}"
                aria-label="Delete user"
              >
                delete
              </button>`
            : ''}
        </div>

        <div id="rankname" class="row-box">
          ${textInput(
            this.rankState,
            (state) => {
              let isValid = Rank.isValid(state.value.toUpperCase());
              if (state.validity !== INPUT_VALIDITY.PENDING && !isValid) {
                state.validity = INPUT_VALIDITY.INVALID;
              }
              this.rankState = state;
            },
            {
              placeholder: 'Rank',
              label: 'Rank',
              id: 'rank'
            },
            () => this.reset()
          )}
          ${textInput(
            this.nameState,
            (state) => (this.nameState = state),
            {
              placeholder: 'Name',
              label: 'Name',
              id: 'name'
            },
            () => this.reset()
          )}
        </div>

        <div id="email" class="row-box">
          ${textInput(
            this.emailState,
            (state) => (this.emailState = state),
            {
              placeholder: 'Email',
              label: 'Email',
              changeText: (text: string) => text.replace(/\W/g, '')
            },
            () => this.reset()
          )}

          <p>@${this.branch?.domain}</p>
        </div>

        <div id="password" class="row-box">
          ${passwordInput(
            this.passwordState,
            (state) => (this.passwordState = state),
            () => this.reset()
          )}

          <button
            plain
            id="change"
            ?hidden="${!this.editing}"
            @click=${this.changePassword()}
          >
            change
          </button>
        </div>

        <div class="regular-box">
          <input
            type="checkbox"
            .checked="${this.isRegularState}"
            @click="${() => (this.isRegularState = !this.isRegularState)}"
          />

          <label for="regular">Regular serviceman</label>
        </div>

        <button
          id="confirm"
          @click=${this.submit()}
          aria-label="Add/Edit department"
          @keydown="${(e: Event) => {
            let key = (e as KeyboardEvent).key;
            if (key === 'Tab') {
              this.shadowRoot?.getElementById('root')?.focus();
            }
          }}"
          solid
        >
          Confirm
        </button>

        <p class="error card" ?show=${this.errorState.visible}>
          ${this.errorState.message}
        </p>
      </div>
    </custom-dialog>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      inputStyles,
      passwordInputStyles,
      css`
        #root {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .row-box {
          width: 100%;
          display: flex;
          align-items: center;
        }

        #rankname,
        #password {
          margin-bottom: 10px;
        }

        #email {
          margin-bottom: 8px;
        }

        input {
          margin: 0;
        }

        #department-name {
          width: 100%;
          text-align: center;
          margin: 0;
          font-size: 1.2rem;
          font-weight: 900;
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        #rank {
          text-transform: uppercase;
          width: 25%;
        }

        #rank::placeholder {
          text-transform: none;
        }

        #name {
          text-transform: capitalize;
          margin-left: 15px;
          width: calc(75% - 15px);
        }

        #email > p {
          margin: 0 15px;
        }

        #email > input {
          flex-grow: 1;
          min-width: 0;
        }

        #password > .password-container {
          flex-grow: 1;
        }

        #password > #change {
          font-size: 1rem;
          margin: 0 0 0 10px;
        }

        .password-container > .password-toggle {
          top: 0px;
          right: 15px;
          bottom: 0px;
        }

        .password-container > input {
          margin: 0;
        }

        .regular-box {
          display: flex;
          align-items: center;
          width: 100%;
        }

        .regular-box > label {
          font-size: 1rem;
        }

        .regular-box > input {
          margin: 0 10px 0 0;
          position: relative;
        }

        .regular-box > input::before {
          position: absolute;
          top: -5px;
          bottom: -5px;
          left: -5px;
          right: -5px;
          border-radius: 30px;
          content: '';
          z-index: -1;
          background-color: transparent;
          transition: background-color 0.3s;
        }

        .regular-box > input:focus::before,
        .regular-box > input:active::before {
          background-color: #cacad8;
        }

        @media (hover: hover) {
          .regular-box > input:hover::before {
            background-color: #cacad8;
          }
        }

        .error {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -3rem;
          text-align: center;
          color: var(--color-primary);
          margin: 0;
          padding: 10px;
          border-radius: 5px;
          transform: translateY(50%);
          opacity: 0;
          transition: transform 0.3s, opacity 0.3s;
        }

        .error[show] {
          transform: translateY(0);
          opacity: 1;
        }

        #delete {
          font-size: 1.3rem;
        }

        #confirm {
          font-size: 1.3rem;
          font-weight: 500;
          width: 100%;
          margin-top: 10px;
        }
      `
    ];
  }
}