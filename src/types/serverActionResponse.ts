import { typeToFlattenedError } from 'zod';
import {
  IAllProgramme,
  IBatchDashboardChart,
  IBatchDashboardTable,
  IBatchDetails,
  IBatchShowCase,
  IBranchDetails,
  IChannelList,
  ICoFacilitatorList,
  IDashboardAggregateData,
  IDashboardMasterData,
  IDownloadProgramme,
  IEventBranch,
  IProgrammeDashboardChart,
  IProgrammeDashboardTable,
  IProgrammeDetails,
  IProgrammeShowCase,
  IProgrammeTypeList,
  ISupervisorList,
  IUserDetails,
  IUserRoles,
} from './interface';

export interface CommonResponse<T> {
  success: true;
  message: string;
  data: T;
}

export type Error<T> =
  | {
      errors: string | string[];
      validationErrors?: typeToFlattenedError<T>['fieldErrors'];
    }
  | {
      errors?: string | string[];
      validationErrors: typeToFlattenedError<T>['fieldErrors'];
    };

export type CommonError = {
  error: string;
  statusCode?: number;
  message: string;
  captchaRequired?: boolean;
};

export type PaginatedResponse<T> = {
  success: boolean;
  message: string;
  count: number;
  limit: number;
  page: number;
  totalCount: number;
  totalPages: number;
  results: T[];
};

export type AuthenticationResponse = {
  success: boolean;
  message: string;
  token: string;
};

export type CommonResponseWithoutData = {
  success: boolean;
  message: string;
};

export type GetAllUserResponse = PaginatedResponse<IUserDetails>;
export type GetUserResponse = CommonResponse<IUserDetails>;
export type GetAllUserRoleResponse = CommonResponse<IUserRoles[]>;
export type PutUserDetailsResponse = CommonResponse<IUserDetails>;
export type GetAllProgrammeResponse = PaginatedResponse<IProgrammeDetails>;
export type CreateProgrammeDetailsResponse = CommonResponse<IProgrammeDetails>;
export type PutProgrammeResponse = CommonResponse<IProgrammeDetails[]>;
export type GetAllBatchResponse = PaginatedResponse<IBatchDetails>;
export type CreateBatchDetailsResponse = CommonResponse<IBatchDetails>;
export type PutBatchResponse = CommonResponse<IBatchDetails[]>;
export type GetAllBranchResponse = CommonResponse<IBranchDetails[]>;
export type GetAllProgrammeFlagResponse = CommonResponse<IAllProgramme[]>;
export type GetAllCoFacilitatorResponse = CommonResponse<ICoFacilitatorList[]>;
export type GetDownloadProgrammeResponse = CommonResponse<IDownloadProgramme[]>;
export type GetDownloadProgrammeDataResponse = {
  success: boolean;
  message: string;
  programme_name: string;
  data: any[];
};
export type GetProgrammeShowCaseResponse = CommonResponse<IProgrammeShowCase[]>;
export type GetBatchShowCaseResponse = CommonResponse<IBatchShowCase[]>;
export type GetProgrammeDashboardTableResponse = CommonResponse<
  IProgrammeDashboardTable[]
>;
export type GetBatchDashboardTableResponse = CommonResponse<
  IBatchDashboardTable[]
>;
export type GetProgrammeDashboardChartResponse = CommonResponse<
  IProgrammeDashboardChart[]
>;
export type GetBatchDashboardChartResponse = CommonResponse<
  IBatchDashboardChart[]
>;

export type GetEventBranchResponse = CommonResponse<IEventBranch[]>;
export type GetAllSupervisorListResponse = CommonResponse<ISupervisorList[]>;
export type GetAllChannelListResponse = CommonResponse<IChannelList[]>;
export type GetAllProgrammeTypeListResponse = CommonResponse<
  IProgrammeTypeList[]
>;
export type GetAllDashboardMasterDataResponse =
  CommonResponse<IDashboardMasterData>;
export type GetAllDashboardAggregateDataResponse =
  CommonResponse<IDashboardAggregateData>;
