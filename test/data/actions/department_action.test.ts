import { expect } from '@open-wc/testing';
import ACTION_DEPARTMENT from '../../../data/actions/department_action';
import { MockModel, MockError } from '../../../data-mock/mock_data';
import { DepartmentAction } from '../../../data/states/department_state';
import { ACTION_ROOT } from '../../../data/store';
import { ACTION_TYPE } from '../../../data/data_manager';

describe('Department actions', () => {
  it('Add department', () => {
    const department = {
      id: '0',
      name: 'New Department'
    };
    let action = ACTION_DEPARTMENT.requestAdd(department);
    let expectedAction: DepartmentAction = {
      id: action.id,
      root: ACTION_ROOT.DEPARTMENTS,
      type: ACTION_TYPE.REQUEST_ADD,
      payload: department
    };
    expect(action).deep.equal(expectedAction);
  });
  it('Department added', () => {
    let action = ACTION_DEPARTMENT.added(MockModel.Department);
    let expectedAction: DepartmentAction = {
      id: action.id,
      root: ACTION_ROOT.DEPARTMENTS,
      type: ACTION_TYPE.ADDED,
      payload: MockModel.Department
    };
    expect(action).deep.equal(expectedAction);
  });
  it('Department request error', () => {
    let addAction = ACTION_DEPARTMENT.requestAdd({
      id: '0',
      name: 'New Department'
    });
    let error = MockError.DepartmentRequest(addAction);
    let errorAction = ACTION_DEPARTMENT.requestError(error);
    let expectedAction: DepartmentAction = {
      id: errorAction.id,
      root: ACTION_ROOT.DEPARTMENTS,
      type: ACTION_TYPE.REQUEST_ERROR,
      payload: error
    };
    expect(errorAction).deep.equal(expectedAction);
  });
});
