export interface IFileStatus {
  file: File;
  progress: number;
}

export interface IFilterOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortDirection?: string;
}

export interface IFilterOptionsWithActiveInActive extends IFilterOptions {
  flag?: number;
}
export interface IUserDetails {
  userid: number;
  channel_id: number;
  channel_name: string;
  reporting_to: number;
  emp_id: string;
  username: string;
  user_role_name: string;
  roleid: number;
  email: string;
  isactive: boolean;
  password: string;
}
export interface IUserRoles {
  roleid: number;
  rolename: string;
}

interface IProgrammeField {
  field_id: string;
  is_active: boolean;
  field_name: string;
  field_type: string;
  input_type: string;
  has_options?: boolean;
  field_values?: string[];
  include_in_qr?: boolean;
}

export interface IProgrammeDetails {
  programme_id: number;
  programme_name: string;
  fields: IProgrammeField[];
  is_active: boolean;
  created_by: number;
  created_by_name: string;
  channel_id: number;
  channel_name: string;
  programme_type_id: number;
  programem_type_name: string;
  attendance: boolean;
  enable_qr: boolean;
  created_at: string;
  updated_at: string;
  is_referenced: boolean;
}

export interface CoFacilitator {
  id: number;
  cofacilitator_id: number;
  cofacilitator_name: string;
  assigned_date: string;
  start_time: string;
  end_time: string;
}

export interface IBatchDetails {
  batch_id: number;
  batch_number: string;
  branch_id: number;
  branch_name: string;
  programme_id: number;
  programme_name: string;
  batch_description: string;
  batch_start_date: string;
  batch_start_time: string;
  batch_end_date: string;
  batch_end_time: string;
  batch_status: true;
  is_virtual: boolean;
  enable_qr: boolean;
  has_cofacilitator: boolean;
  facilitator_count: number;
  data_count: number;
  cofacilitators: CoFacilitator[];
  created_by: number;
  qr_code: string;
  created_by_name: string;
  created_date: string;
  updated_at: string;
}

export interface IBranchDetails {
  branch_id: number;
  branch_code: string;
  branch_name: string;
  created_at: string;
}

export interface IAllProgramme {
  programme_id: number;
  programme_name: string;
}
export interface IDownloadProgramme {
  column_name: string;
  data_type: string;
}

export interface IProgrammeShowCase {
  total_programmes: string;
  active_programmes: string;
  inactive_programmes: string;
}
export interface IBatchShowCase {
  total_batches: string;
  active_batches: string;
  inactive_batches: string;
}

export interface IProgrammeDashboardTable {
  programme_name: string;
  data_count: string;
}
export interface IBatchDashboardTable {
  batch_id: number;
  batch_number: string;
  branch_id: number;
  branch_name: string;
  programme_id: number;
  programme_name: string;
  batch_start_date: string;
  batch_end_date: string;
  batch_status: boolean;
}

export interface IProgrammeDashboardChart {
  branch: string;
  activebatches: string;
  inactivebatches: string;
  ongoingbatches: string;
}
export interface IBatchDashboardChart {
  upload_date: string;
  avg_upload_time: number;
  total_data_uploaded: number;
  normalized_upload_time: number;
  normalized_data_uploaded: number;
}

export interface IEventBranch {
  branch_id: number;
  branch_code: string;
  branch_name: string;
  created_at: string;
}

export interface ISupervisorList {
  userid: number;
  username: string;
  email: string;
}
export interface ICoFacilitatorList {
  userid: number;
  username: string;
}

export interface IChannelList {
  channel_id: number;
  channel_name: string;
}

export interface IProgrammeTypeList {
  programme_type_id: number;
  programem_type_name: string;
}

export interface IDashboardFilterOptions {
  startDate?: string;
  endDate?: string;
  trainerId?: number;
  programmeId?: number;
}

export interface IDashboardTrainer {
  trainer_id: number;
  trainer_name: string;
}

export interface IDashboardProgram {
  programme_id: number;
  programme_name: string;
}

export interface IDashboardMasterData {
  trainers: IDashboardTrainer[];
  programs: IDashboardProgram[];
}

export interface ITrainerRecord {
  trainer_name: string;
  records_uploaded: number;
}

export interface ITrainerBatchRatio {
  trainer_name: string;
  batch_to_programme_ratio: number;
}

export interface IUserLoginStat {
  userid: number;
  username: string;
  login_days: number;
}

export interface IProgramRecordStat {
  programme_name: string;
  records_updated: number;
}

export interface IDashboardAggregateData {
  totalBatches: number;
  openBatches: number;
  closedBatches: number;
  totalRecords: number;
  teamSize: number;
  mtdInActiveTrainers: number;
  recordsUpdatedByTrainers: ITrainerRecord[];
  trainersBatchRatio: ITrainerBatchRatio[];
  noOfDaysUsersLoggedin: IUserLoginStat[];
  programWiseData: IProgramRecordStat[];
}
