import {
  AppActionType,
  AppReducerActionType,
  AppStateInterface,
} from '@/types/appContext';
import { v4 as uuidv4 } from 'uuid';

export const appInitialState: AppStateInterface = {
  alerts: [],
};

function appReducer(
  state: AppStateInterface,
  action: AppReducerActionType
): AppStateInterface {
  switch (action.type) {
    case AppActionType.ADD_ALERT:
      return {
        ...state,
        alerts: [
          ...state.alerts,
          {
            id: uuidv4(),
            ...action.payload,
          },
        ],
      };
    case AppActionType.CLEAR_ALERT:
      return {
        ...state,
        alerts: [],
      };
    case AppActionType.REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export default appReducer;
