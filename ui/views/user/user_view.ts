import { LitElement, html, customElement, css, property } from 'lit-element';
import { ApplicationStore } from '../../../data/store';
import { buttonStyles, cardStyles, globalStyles } from '../../global_styles';
import { onPressed } from '../../utils';
import User from '../../../model/user';
import '../../base/welcome_text';
import './user_dep_item';
import './user_dep_list';
import './user_list';
import '../../base/toggle_am';
import '../../dialogs/edit_status';
import './summary_view';

@customElement('user-view')
export default class UserView extends LitElement {
  private user = ApplicationStore.auth.action.payload as User;

  @property({ type: Boolean }) showSummary = false;
  @property({ type: Boolean }) isMorning = new Date().getHours() < 12;

  viewSummary() {
    return onPressed(() => {
      this.showSummary = true;
    });
  }

  closeSummary() {
    this.showSummary = false;
  }

  toggleAm() {
    this.isMorning = !this.isMorning;
  }

  render() {
    return html`<div id="root">
      <user-dep-list
        .user="${this.user}"
        .isMorning="${this.isMorning}"
      ></user-dep-list>

      <button id="view-summary" solid @click="${this.viewSummary()}">
        View Summary
      </button>

      <toggle-am
        @toggle-am="${this.toggleAm}"
        .isMorning="${this.isMorning}"
      ></toggle-am>

      ${this.showSummary
        ? html`<summary-view
            @on-close="${this.closeSummary}"
            .isMorning="${this.isMorning}"
          ></summary-view>`
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

        #view-summary {
          width: 50%;
          position: absolute;
          bottom: 10px;
          left: 15%;
          font-size: 1.1rem;
          padding: 15px 0px;
          border-radius: 50px;
          font-weight: 500;
        }

        toggle-am {
          position: absolute;
          z-index: 21;
          right: 10px;
          bottom: 10px;
        }
      `
    ];
  }
}
