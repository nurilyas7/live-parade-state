import { LitElement, html, customElement, css, property } from 'lit-element';
import { buttonStyles, cardStyles, globalStyles } from '../../global_styles';
import { onPressed } from '../../utils';
import '../../dialogs/edit_user';
import '../../dialogs/edit_department';
import '../../base/welcome_text';
import './request_log';
import './admin_dep_item';
import './admin_dep_list';
import './admin_user_list';

@customElement('admin-view')
export default class AdminView extends LitElement {

  @property({ type: Boolean }) showAddDepartment = false;

  onAddDepartment() {
    return onPressed(() => {
      this.showAddDepartment = true;
    });
  }

  closeAddDepartment() {
    this.showAddDepartment = false;
  }

  render() {
    return html`<div id="root">
      <admin-dep-list></admin-dep-list>

      <button id="add-department" solid @click="${this.onAddDepartment()}">
        Add department
      </button>

      <request-log></request-log>

      ${this.showAddDepartment
        ? html`<edit-department
            @close="${this.closeAddDepartment}"
          ></edit-department>`
        : ''}
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      css`
        #root {
          overflow: hidden;
          height: 100%;
          width: 100%;
          position: relative;
        }

        #add-department {
          width: 50%;
          position: absolute;
          bottom: 10px;
          left: 25%;
          right: 25%;
          font-size: 1.1rem;
          padding: 15px 0px;
          border-radius: 50px;
          font-weight: 500;
        }
      `
    ];
  }
}
