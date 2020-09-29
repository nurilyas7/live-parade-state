import { ApplicationStore } from './store';
import Department from '../model/department';
import ACTION_DEPARTMENT from './actions/department_action';
import ACTION_USER from './actions/user_action';
import User from '../model/user';

export enum ACTION_TYPE {
  INITIALIZED,
  ADDED,
  MODIFIED,
  REMOVED,
  REQUEST_ADD,
  REQUEST_MODIFY,
  REQUEST_REMOVE,
  REQUEST_SUCCESSFUL,
  REQUEST_ERROR
}

export const ACTION_TYPE_TEXT = {
  [ACTION_TYPE.ADDED]: 'added',
  [ACTION_TYPE.MODIFIED]: 'updated',
  [ACTION_TYPE.REMOVED]: 'removed',
  [ACTION_TYPE.REQUEST_ADD]: 'adding',
  [ACTION_TYPE.REQUEST_MODIFY]: 'updating',
  [ACTION_TYPE.REQUEST_REMOVE]: 'removing',
  [ACTION_TYPE.REQUEST_SUCCESSFUL]: 'successfully',
  [ACTION_TYPE.REQUEST_ERROR]: 'error'
};

export const REQUEST_TYPES = [
  ACTION_TYPE.REQUEST_ADD,
  ACTION_TYPE.REQUEST_MODIFY,
  ACTION_TYPE.REQUEST_REMOVE,
  ACTION_TYPE.REQUEST_SUCCESSFUL,
  ACTION_TYPE.REQUEST_ERROR
];

export const REQUEST_ACTIONS = [
  ACTION_TYPE.REQUEST_ADD,
  ACTION_TYPE.REQUEST_MODIFY,
  ACTION_TYPE.REQUEST_REMOVE
];

export type DepartmentChange = (
  department: Department,
  type: ACTION_TYPE
) => void;

export interface DataResults {
  departments: Array<Department>;
  users: Array<User>;
}

export abstract class DataManager {
  protected isDbConnected = false;

  constructor() {}

  protected abstract async connectDB(): Promise<DataResults>;
  protected abstract startRequestListening(): void;
  protected abstract stopRequestListening(): void;

  departmentOnChange(department: Department, type: ACTION_TYPE) {
    switch (type) {
      case ACTION_TYPE.ADDED:
        ApplicationStore.dispatch(ACTION_DEPARTMENT.added(department));
        break;
      case ACTION_TYPE.MODIFIED:
        ApplicationStore.dispatch(ACTION_DEPARTMENT.modified(department));
        break;
      case ACTION_TYPE.REMOVED:
        ApplicationStore.dispatch(ACTION_DEPARTMENT.removed(department));
        break;
    }
  }

  userOnChange(user: User, type: ACTION_TYPE) {
    const departments = ApplicationStore.getDepartments().items;
    if (!departments.find((dep) => dep.id === user.departmentid)) return;
    switch (type) {
      case ACTION_TYPE.ADDED:
        ApplicationStore.dispatch(ACTION_USER.added(user));
        break;
      case ACTION_TYPE.MODIFIED:
        ApplicationStore.dispatch(ACTION_USER.modified(user));
        break;
      case ACTION_TYPE.REMOVED:
        ApplicationStore.dispatch(ACTION_USER.removed(user));
        break;
    }
  }

  async subscribe() {
    let results = await this.connectDB();
    const actionDepartment = ACTION_DEPARTMENT.initialized(results.departments);
    const actionUser = ACTION_USER.initialized(results.users);
    ApplicationStore.dispatch(actionDepartment);
    ApplicationStore.dispatch(actionUser);
    this.isDbConnected = true;
    this.startRequestListening();
  }

  unsubscribe() {
    this.isDbConnected = false;
    this.stopRequestListening();
  }
}
