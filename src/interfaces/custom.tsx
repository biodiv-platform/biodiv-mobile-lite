export enum AssetStatus {
  Pending = 1,
  InProgress = 2,
  Uploaded = 3,
  Failed = 4
}

export interface IDBObservationAsset {
  id?: number;
  hashKey: string;
  fileName?: string;
  path?: string;
  url?: string;
  type: string;
  licenseId: string;
  status?: AssetStatus;
  caption?: string;
  rating?: number;
  latitude?: number;
  longitude?: number;
  blob?: any;
  isUsed?: number;
  dateCreated?: number;
  dateUploaded?: number;
}

export interface IDBPendingObservation {
  id: number;
  data: any;
}
