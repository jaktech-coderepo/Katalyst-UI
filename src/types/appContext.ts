import { AlertProps } from '@mui/material';
import { Dispatch } from 'react';

export enum AppActionType {
  ADD_ALERT = 'ADD_ALERT',
  CLEAR_ALERT = 'CLEAR_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT',
  SET_COLOR = 'SET_COLOR',
  RESET_COLOR = 'RESET_COLOR',
}

export interface AppAlertInterface {
  id: string;
  message: string;
  type: AlertProps['severity'];
}

/**
 * ## App State Interface
 */

export interface AppStateInterface {
  /**
   * ## Alerts Queue
   */
  alerts: AppAlertInterface[];
}

export type AppReducerActionType =
  | {
      type: AppActionType.ADD_ALERT;
      payload: Omit<AppAlertInterface, 'id'>;
    }
  | {
      type: AppActionType.CLEAR_ALERT;
    }
  | {
      type: AppActionType.REMOVE_ALERT;
      payload: AppAlertInterface['id'];
    }
  | {
      type: AppActionType.RESET_COLOR;
    };

export interface AppContextInterface {
  state: AppStateInterface;
  dispatch: Dispatch<AppReducerActionType>;
}
