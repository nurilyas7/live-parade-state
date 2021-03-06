import { css, customElement } from 'lit-element';
import { html } from 'lit-html';
import User from '../../../model/user';
import BaseUserList from '../../base/base_user_list';

@customElement('admin-user-list')
export default class AdminUserList extends BaseUserList {
  listItemHeight = 3.5;

  userItemTemplate(user: User) {
    return html`
      <p class="fullname">${user.fullname}</p>
      <p class="email">${user.email}</p>
    `;
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        .user {
          height: 3.5rem;
        }
        .user[last] {
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
        }

        .user[regular] .fullname {
          color: var(--color-primary);
        }

        .user p {
          margin: 0;
        }

        .fullname {
          text-transform: capitalize;
          color: #323232;
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.2rem;
          color: var(--color-text-primary);
        }

        .email {
          color: #878787;
          font-size: 0.8rem;
          line-height: 1rem;
          font-weight: 400;
          color: var(--color-text-secondary);
        }
      `
    ];
  }
}
