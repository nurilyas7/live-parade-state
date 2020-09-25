import { ACTION_TYPE, DataResults } from '../data/data_manager';
import { DepartmentStoreState } from '../data/states/department_state';
import Department from '../model/department';
import { MockModel } from './mock_data';
import { UserStoreState } from '../data/states/user_state';
import User from '../model/user';
import AdminManager from '../data/admin_manager';
import { generateActionId } from '../data/store';

export default class MockAdminManager extends AdminManager {
  constructor() {
    super();
  }

  protected async connectDB(): Promise<DataResults> {
    return {
      departments: MockModel.DepartmentArray,
      users: MockModel.UserArray
    };
  }

  protected requestAddDepartment(state: DepartmentStoreState): void {
    let department = state.action.payload as Department;
    department.id = `dep-${generateActionId()}`;
    this.departmentOnChange(department, ACTION_TYPE.ADDED);
  }

  protected requestModifyDepartment(state: DepartmentStoreState): void {
    this.departmentOnChange(
      state.action.payload as Department,
      ACTION_TYPE.MODIFIED
    );
  }

  protected requestRemoveDepartment(state: DepartmentStoreState): void {
    this.departmentOnChange(
      state.action.payload as Department,
      ACTION_TYPE.REMOVED
    );
  }

  protected requestAddUser(state: UserStoreState): void {
    let user = state.action.payload as User;
    this.userOnChange(user, ACTION_TYPE.ADDED);
  }

  protected requestModifyUser(state: UserStoreState): void {
    this.userOnChange(state.action.payload as User, ACTION_TYPE.MODIFIED);
  }

  protected requestRemoveUser(state: UserStoreState): void {
    this.userOnChange(state.action.payload as User, ACTION_TYPE.REMOVED);
  }
}
