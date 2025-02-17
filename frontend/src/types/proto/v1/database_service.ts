/* eslint-disable */
import * as Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Duration } from "../google/protobuf/duration";
import { FieldMask } from "../google/protobuf/field_mask";
import { Timestamp } from "../google/protobuf/timestamp";
import { StringValue } from "../google/protobuf/wrappers";
import { State, stateFromJSON, stateToJSON } from "./common";

export const protobufPackage = "bytebase.v1";

export interface GetDatabaseRequest {
  /**
   * The name of the database to retrieve.
   * Format: environments/{environment}/instances/{instance}/databases/{database}
   */
  name: string;
}

export interface ListDatabasesRequest {
  /**
   * The parent, which owns this collection of databases.
   * Format: environments/{environment}/instances/{instance}
   * Use "environments/-/instances/-" to list all databases from all environments.
   */
  parent: string;
  /**
   * The maximum number of databases to return. The service may return fewer than
   * this value.
   * If unspecified, at most 50 databases will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize: number;
  /**
   * A page token, received from a previous `ListDatabases` call.
   * Provide this to retrieve the subsequent page.
   *
   * When paginating, all other parameters provided to `ListDatabases` must match
   * the call that provided the page token.
   */
  pageToken: string;
  /**
   * Filter is used to filter databases returned in the list.
   * For example, "project = projects/{project}" can be used to list databases in a project.
   */
  filter: string;
}

export interface ListDatabasesResponse {
  /** The databases from the specified request. */
  databases: Database[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
  nextPageToken: string;
}

export interface UpdateDatabaseRequest {
  /**
   * The database to update.
   *
   * The database's `name` field is used to identify the database to update.
   * Format: environments/{environment}/instances/{instance}/databases/{database}
   */
  database?: Database;
  /** The list of fields to update. */
  updateMask?: string[];
}

export interface BatchUpdateDatabasesRequest {
  /**
   * The parent resource shared by all databases being updated.
   * Format: environments/{environment}/instances/{instance}
   * If the operation spans parents, a dash (-) may be accepted as a wildcard.
   * We only support updating the project of databases for now.
   */
  parent: string;
  /**
   * The request message specifying the resources to update.
   * A maximum of 1000 databases can be modified in a batch.
   */
  requests: UpdateDatabaseRequest[];
}

export interface BatchUpdateDatabasesResponse {
  /** Databases updated. */
  databases: Database[];
}

export interface GetDatabaseMetadataRequest {
  /**
   * The name of the database to retrieve metadata.
   * Format: environments/{environment}/instances/{instance}/databases/{database}
   */
  name: string;
}

export interface GetDatabaseSchemaRequest {
  /**
   * The name of the database to retrieve schema.
   * Format: environments/{environment}/instances/{instance}/databases/{database}
   */
  name: string;
}

export interface GetBackupSettingRequest {
  /**
   * The name of the database to retrieve backup setting.
   * Format: environments/{environment}/instances/{instance}/databases/{database}/backupSetting
   */
  name: string;
}

export interface UpdateBackupSettingRequest {
  /** The database backup setting to update. */
  setting?: BackupSetting;
}

/** CreateBackupRequest is the request message for CreateBackup. */
export interface CreateBackupRequest {
  /**
   * The parent resource where this backup will be created.
   * Format: environments/{environment}/instances/{instance}/databases/{database}
   */
  parent: string;
  backup?: Backup;
}

/** ListBackupRequest is the request message for ListBackup. */
export interface ListBackupRequest {
  /**
   * The parent resource where this backup will be created.
   * Format: environments/{environment}/instances/{instance}/databases/{database}
   */
  parent: string;
  /**
   * Not used. The maximum number of backups to return. The service may return fewer than
   * this value.
   * If unspecified, at most 50 backups will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize: number;
  /**
   * Not used. A page token, received from a previous `ListBackup` call.
   * Provide this to retrieve the subsequent page.
   *
   * When paginating, all other parameters provided to `ListBackup` must match
   * the call that provided the page token.
   */
  pageToken: string;
}

export interface ListBackupResponse {
  /** The backups from the specified request. */
  backups: Backup[];
  /**
   * Not used. A token, which can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
  nextPageToken: string;
}

export interface Database {
  /**
   * The name of the database.
   * Format: environments/{environment}/instances/{instance}/databases/{database}
   * {database} is the database name in the instance.
   */
  name: string;
  /** The system-assigned, unique identifier for a resource. */
  uid: string;
  /** The existence of a database on latest sync. */
  syncState: State;
  /** The latest synchronization time. */
  successfulSyncTime?: Date;
  /**
   * The project for a database.
   * Format: projects/{project}
   */
  project: string;
  /** The version of database schema. */
  schemaVersion: string;
  /** Labels will be used for deployment and policy control. */
  labels: { [key: string]: string };
}

export interface Database_LabelsEntry {
  key: string;
  value: string;
}

/** DatabaseMetadata is the metadata for databases. */
export interface DatabaseMetadata {
  name: string;
  /** The schemas is the list of schemas in a database. */
  schemas: SchemaMetadata[];
  /** The character_set is the character set of a database. */
  characterSet: string;
  /** The collation is the collation of a database. */
  collation: string;
  /** The extensions is the list of extensions in a database. */
  extensions: ExtensionMetadata[];
}

/**
 * SchemaMetadata is the metadata for schemas.
 * This is the concept of schema in Postgres, but it's a no-op for MySQL.
 */
export interface SchemaMetadata {
  /**
   * The name is the schema name.
   * It is an empty string for databases without such concept such as MySQL.
   */
  name: string;
  /** The tables is the list of tables in a schema. */
  tables: TableMetadata[];
  /** The views is the list of views in a schema. */
  views: ViewMetadata[];
}

/** TableMetadata is the metadata for tables. */
export interface TableMetadata {
  /** The name is the name of a table. */
  name: string;
  /** The columns is the ordered list of columns in a table. */
  columns: ColumnMetadata[];
  /** The indexes is the list of indexes in a table. */
  indexes: IndexMetadata[];
  /** The engine is the engine of a table. */
  engine: string;
  /** The collation is the collation of a table. */
  collation: string;
  /** The row_count is the estimated number of rows of a table. */
  rowCount: number;
  /** The data_size is the estimated data size of a table. */
  dataSize: number;
  /** The index_size is the estimated index size of a table. */
  indexSize: number;
  /** The data_free is the estimated free data size of a table. */
  dataFree: number;
  /** The create_options is the create option of a table. */
  createOptions: string;
  /** The comment is the comment of a table. */
  comment: string;
  /** The foreign_keys is the list of foreign keys in a table. */
  foreignKeys: ForeignKeyMetadata[];
}

/** ColumnMetadata is the metadata for columns. */
export interface ColumnMetadata {
  /** The name is the name of a column. */
  name: string;
  /** The position is the position in columns. */
  position: number;
  /** The default is the default of a column. Use google.protobuf.StringValue to distinguish between an empty string default value or no default. */
  default?: string;
  /** The nullable is the nullable of a column. */
  nullable: boolean;
  /** The type is the type of a column. */
  type: string;
  /** The character_set is the character_set of a column. */
  characterSet: string;
  /** The collation is the collation of a column. */
  collation: string;
  /** The comment is the comment of a column. */
  comment: string;
}

/** ViewMetadata is the metadata for views. */
export interface ViewMetadata {
  /** The name is the name of a view. */
  name: string;
  /** The definition is the definition of a view. */
  definition: string;
  /** The comment is the comment of a view. */
  comment: string;
  /** The dependent_columns is the list of dependent columns of a view. */
  dependentColumns: DependentColumn[];
}

/** DependentColumn is the metadata for dependent columns. */
export interface DependentColumn {
  /** The schema is the schema of a reference column. */
  schema: string;
  /** The table is the table of a reference column. */
  table: string;
  /** The column is the name of a reference column. */
  column: string;
}

/** IndexMetadata is the metadata for indexes. */
export interface IndexMetadata {
  /** The name is the name of an index. */
  name: string;
  /**
   * The expressions are the ordered columns or expressions of an index.
   * This could refer to a column or an expression.
   */
  expressions: string[];
  /** The type is the type of an index. */
  type: string;
  /** The unique is whether the index is unique. */
  unique: boolean;
  /** The primary is whether the index is a primary key index. */
  primary: boolean;
  /** The visible is whether the index is visible. */
  visible: boolean;
  /** The comment is the comment of an index. */
  comment: string;
}

/** ExtensionMetadata is the metadata for extensions. */
export interface ExtensionMetadata {
  /** The name is the name of an extension. */
  name: string;
  /** The schema is the extension that is installed to. But the extension usage is not limited to the schema. */
  schema: string;
  /** The version is the version of an extension. */
  version: string;
  /** The description is the description of an extension. */
  description: string;
}

/** ForeignKeyMetadata is the metadata for foreign keys. */
export interface ForeignKeyMetadata {
  /** The name is the name of a foreign key. */
  name: string;
  /** The columns are the ordered referencing columns of a foreign key. */
  columns: string[];
  /**
   * The referenced_schema is the referenced schema name of a foreign key.
   * It is an empty string for databases without such concept such as MySQL.
   */
  referencedSchema: string;
  /** The referenced_table is the referenced table name of a foreign key. */
  referencedTable: string;
  /** The referenced_columns are the ordered referenced columns of a foreign key. */
  referencedColumns: string[];
  /** The on_delete is the on delete action of a foreign key. */
  onDelete: string;
  /** The on_update is the on update action of a foreign key. */
  onUpdate: string;
  /**
   * The match_type is the match type of a foreign key.
   * The match_type is the PostgreSQL specific field.
   * It's empty string for other databases.
   */
  matchType: string;
}

/** DatabaseMetadata is the metadata for databases. */
export interface DatabaseSchema {
  /** The schema dump from database. */
  schema: string;
}

/** BackupSetting is the setting for database backup. */
export interface BackupSetting {
  /**
   * The name of the database backup setting.
   * Format: environments/{environment}/instances/{instance}/databases/{database}/backupSettings
   */
  name: string;
  /**
   * The default maximum age of a Backup created via this BackupPlan.
   * If specified, a Backup will be automatically deleted after its age reaches.
   * If not specified, Backups created under this BackupPlan will be deleted after 7 DAYS.
   * It will be rounded up to the number of days.
   */
  backupRetainDuration?: Duration;
  /**
   * Cron(https://wikipedia.com/wiki/cron) string that defines a repeating schedule for creating Backups.
   * Support hour of day, day of week. (UTC time)
   *
   * Default (empty): Disable automatic backup.
   */
  cronSchedule: string;
  /** hook_url(https://www.bytebase.com/docs/administration/webhook-integration/database-webhook) is the URL to send a notification when a backup is created. */
  hookUrl: string;
}

/** The message of the backup. */
export interface Backup {
  /**
   * The resource name of the database backup. backup-name is specified by the client.
   * Format: environments/{environment}/instances/{instance}/databases/{database}/backups/{backup-name}
   */
  name: string;
  /** The timestamp when the backup resource was created initally. */
  createTime?: Date;
  /** The timestamp when the backup resource was updated. */
  updateTime?: Date;
  /** The state of the backup. */
  state: Backup_BackupState;
  /** The type of the backup. */
  backupType: Backup_BackupType;
  /** The comment of the backup. */
  comment: string;
}

/** The type of the backup. */
export enum Backup_BackupType {
  /** BACKUP_TYPE_UNSPECIFIED - The type of the backup is unknown. */
  BACKUP_TYPE_UNSPECIFIED = 0,
  /** MANUAL - The backup is created by user. */
  MANUAL = 1,
  /** AUTOMATIC - The backup is created by automatic backup. */
  AUTOMATIC = 2,
  /** PITR - The backup is created automatically after doing PITR. */
  PITR = 3,
  UNRECOGNIZED = -1,
}

export function backup_BackupTypeFromJSON(object: any): Backup_BackupType {
  switch (object) {
    case 0:
    case "BACKUP_TYPE_UNSPECIFIED":
      return Backup_BackupType.BACKUP_TYPE_UNSPECIFIED;
    case 1:
    case "MANUAL":
      return Backup_BackupType.MANUAL;
    case 2:
    case "AUTOMATIC":
      return Backup_BackupType.AUTOMATIC;
    case 3:
    case "PITR":
      return Backup_BackupType.PITR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Backup_BackupType.UNRECOGNIZED;
  }
}

export function backup_BackupTypeToJSON(object: Backup_BackupType): string {
  switch (object) {
    case Backup_BackupType.BACKUP_TYPE_UNSPECIFIED:
      return "BACKUP_TYPE_UNSPECIFIED";
    case Backup_BackupType.MANUAL:
      return "MANUAL";
    case Backup_BackupType.AUTOMATIC:
      return "AUTOMATIC";
    case Backup_BackupType.PITR:
      return "PITR";
    case Backup_BackupType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The state of the backup. */
export enum Backup_BackupState {
  /** BACKUP_STATE_UNSPECIFIED - The state of the backup is unknown. */
  BACKUP_STATE_UNSPECIFIED = 0,
  /** PENDING_CREATE - The backup is being pending to create. */
  PENDING_CREATE = 1,
  /** DONE - The backup is ready to use. */
  DONE = 2,
  /** FAILED - The backup is being deleted. */
  FAILED = 3,
  UNRECOGNIZED = -1,
}

export function backup_BackupStateFromJSON(object: any): Backup_BackupState {
  switch (object) {
    case 0:
    case "BACKUP_STATE_UNSPECIFIED":
      return Backup_BackupState.BACKUP_STATE_UNSPECIFIED;
    case 1:
    case "PENDING_CREATE":
      return Backup_BackupState.PENDING_CREATE;
    case 2:
    case "DONE":
      return Backup_BackupState.DONE;
    case 3:
    case "FAILED":
      return Backup_BackupState.FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Backup_BackupState.UNRECOGNIZED;
  }
}

export function backup_BackupStateToJSON(object: Backup_BackupState): string {
  switch (object) {
    case Backup_BackupState.BACKUP_STATE_UNSPECIFIED:
      return "BACKUP_STATE_UNSPECIFIED";
    case Backup_BackupState.PENDING_CREATE:
      return "PENDING_CREATE";
    case Backup_BackupState.DONE:
      return "DONE";
    case Backup_BackupState.FAILED:
      return "FAILED";
    case Backup_BackupState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** ListSlowQueriesRequest is the request of listing slow query. */
export interface ListSlowQueriesRequest {
  /** Format: environments/{environment}/instances/{instance}/databases/{database} */
  parent: string;
  /**
   * The filter of the slow query log.
   * follow the [ebnf](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) syntax.
   * Support filter by project and start_time in SlowQueryDetails for now.
   * For example:
   * Search the slow query log of the specific project:
   *   - the specific project: project = "projects/{project}"
   * Search the slow query log that start_time after 2022-01-01T12:00:00.000Z:
   *   - start_time > "2022-01-01T12:00:00.000Z"
   *   - Should use [RFC-3339 format](https://www.rfc-editor.org/rfc/rfc3339).
   *   - Currently we only support filtering down to date granularity.
   */
  filter: string;
  /**
   * The order by of the slow query log.
   * Support order by count, latest_log_time, average_query_time, nighty_fifth_percentile_query_time,
   * average_rows_sent, nighty_fifth_percentile_rows_sent, average_rows_examined, nighty_fifth_percentile_rows_examined for now.
   * For example:
   *  - order by count: order_by = "count"
   *  - order by latest_log_time desc: order_by = "latest_log_time desc"
   * Default: order by nighty_fifth_percentile_query_time desc.
   */
  orderBy: string;
}

/** ListSlowQueriesResponse is the response of listing slow query. */
export interface ListSlowQueriesResponse {
  /** The slow query logs. */
  slowQueryLogs: SlowQueryLog[];
}

/** SlowQueryLog is the slow query log. */
export interface SlowQueryLog {
  /**
   * The resource of the slow query log.
   * The format is "environments/{environment}/instances/{instance}/databases/{database}".
   */
  resource: string;
  /**
   * The project of the slow query log.
   * The format is "projects/{project}".
   */
  project: string;
  /** The statistics of the slow query log. */
  statistics?: SlowQueryStatistics;
}

/** SlowQueryStatistics is the statistics of the slow query log. */
export interface SlowQueryStatistics {
  /** The fingerprint of the slow query log. */
  sqlFingerprint: string;
  /** The count of the slow query log. */
  count: number;
  /** The latest log time of the slow query log. */
  latestLogTime?: Date;
  /** The average query time of the slow query log. */
  averageQueryTime?: Duration;
  /** The nighty fifth percentile query time of the slow query log. */
  nightyFifthPercentileQueryTime?: Duration;
  /** The average rows sent of the slow query log. */
  averageRowsSent: number;
  /** The nighty fifth percentile rows sent of the slow query log. */
  nightyFifthPercentileRowsSent: number;
  /** The average rows examined of the slow query log. */
  averageRowsExamined: number;
  /** The nighty fifth percentile rows examined of the slow query log. */
  nightyFifthPercentileRowsExamined: number;
  /** Samples are details of the sample slow query logs with the same fingerprint. */
  samples: SlowQueryDetails[];
}

/** SlowQueryDetails is the details of the slow query log. */
export interface SlowQueryDetails {
  /** The start time of the slow query log. */
  startTime?: Date;
  /** The query time of the slow query log. */
  queryTime?: Duration;
  /** The lock time of the slow query log. */
  lockTime?: Duration;
  /** The rows sent of the slow query log. */
  rowsSent: number;
  /** The rows examined of the slow query log. */
  rowsExamined: number;
  /** The sql text of the slow query log. */
  sqlText: string;
}

function createBaseGetDatabaseRequest(): GetDatabaseRequest {
  return { name: "" };
}

export const GetDatabaseRequest = {
  encode(message: GetDatabaseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDatabaseRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDatabaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetDatabaseRequest {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: GetDatabaseRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create(base?: DeepPartial<GetDatabaseRequest>): GetDatabaseRequest {
    return GetDatabaseRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetDatabaseRequest>): GetDatabaseRequest {
    const message = createBaseGetDatabaseRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseListDatabasesRequest(): ListDatabasesRequest {
  return { parent: "", pageSize: 0, pageToken: "", filter: "" };
}

export const ListDatabasesRequest = {
  encode(message: ListDatabasesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.pageToken !== "") {
      writer.uint32(26).string(message.pageToken);
    }
    if (message.filter !== "") {
      writer.uint32(34).string(message.filter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListDatabasesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListDatabasesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.pageToken = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.filter = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListDatabasesRequest {
    return {
      parent: isSet(object.parent) ? String(object.parent) : "",
      pageSize: isSet(object.pageSize) ? Number(object.pageSize) : 0,
      pageToken: isSet(object.pageToken) ? String(object.pageToken) : "",
      filter: isSet(object.filter) ? String(object.filter) : "",
    };
  },

  toJSON(message: ListDatabasesRequest): unknown {
    const obj: any = {};
    message.parent !== undefined && (obj.parent = message.parent);
    message.pageSize !== undefined && (obj.pageSize = Math.round(message.pageSize));
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    message.filter !== undefined && (obj.filter = message.filter);
    return obj;
  },

  create(base?: DeepPartial<ListDatabasesRequest>): ListDatabasesRequest {
    return ListDatabasesRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListDatabasesRequest>): ListDatabasesRequest {
    const message = createBaseListDatabasesRequest();
    message.parent = object.parent ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    message.filter = object.filter ?? "";
    return message;
  },
};

function createBaseListDatabasesResponse(): ListDatabasesResponse {
  return { databases: [], nextPageToken: "" };
}

export const ListDatabasesResponse = {
  encode(message: ListDatabasesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.databases) {
      Database.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(18).string(message.nextPageToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListDatabasesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListDatabasesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.databases.push(Database.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.nextPageToken = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListDatabasesResponse {
    return {
      databases: Array.isArray(object?.databases) ? object.databases.map((e: any) => Database.fromJSON(e)) : [],
      nextPageToken: isSet(object.nextPageToken) ? String(object.nextPageToken) : "",
    };
  },

  toJSON(message: ListDatabasesResponse): unknown {
    const obj: any = {};
    if (message.databases) {
      obj.databases = message.databases.map((e) => e ? Database.toJSON(e) : undefined);
    } else {
      obj.databases = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    return obj;
  },

  create(base?: DeepPartial<ListDatabasesResponse>): ListDatabasesResponse {
    return ListDatabasesResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListDatabasesResponse>): ListDatabasesResponse {
    const message = createBaseListDatabasesResponse();
    message.databases = object.databases?.map((e) => Database.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    return message;
  },
};

function createBaseUpdateDatabaseRequest(): UpdateDatabaseRequest {
  return { database: undefined, updateMask: undefined };
}

export const UpdateDatabaseRequest = {
  encode(message: UpdateDatabaseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.database !== undefined) {
      Database.encode(message.database, writer.uint32(10).fork()).ldelim();
    }
    if (message.updateMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.updateMask), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateDatabaseRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateDatabaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.database = Database.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.updateMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateDatabaseRequest {
    return {
      database: isSet(object.database) ? Database.fromJSON(object.database) : undefined,
      updateMask: isSet(object.updateMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.updateMask)) : undefined,
    };
  },

  toJSON(message: UpdateDatabaseRequest): unknown {
    const obj: any = {};
    message.database !== undefined && (obj.database = message.database ? Database.toJSON(message.database) : undefined);
    message.updateMask !== undefined && (obj.updateMask = FieldMask.toJSON(FieldMask.wrap(message.updateMask)));
    return obj;
  },

  create(base?: DeepPartial<UpdateDatabaseRequest>): UpdateDatabaseRequest {
    return UpdateDatabaseRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UpdateDatabaseRequest>): UpdateDatabaseRequest {
    const message = createBaseUpdateDatabaseRequest();
    message.database = (object.database !== undefined && object.database !== null)
      ? Database.fromPartial(object.database)
      : undefined;
    message.updateMask = object.updateMask ?? undefined;
    return message;
  },
};

function createBaseBatchUpdateDatabasesRequest(): BatchUpdateDatabasesRequest {
  return { parent: "", requests: [] };
}

export const BatchUpdateDatabasesRequest = {
  encode(message: BatchUpdateDatabasesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    for (const v of message.requests) {
      UpdateDatabaseRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchUpdateDatabasesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchUpdateDatabasesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.requests.push(UpdateDatabaseRequest.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchUpdateDatabasesRequest {
    return {
      parent: isSet(object.parent) ? String(object.parent) : "",
      requests: Array.isArray(object?.requests)
        ? object.requests.map((e: any) => UpdateDatabaseRequest.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BatchUpdateDatabasesRequest): unknown {
    const obj: any = {};
    message.parent !== undefined && (obj.parent = message.parent);
    if (message.requests) {
      obj.requests = message.requests.map((e) => e ? UpdateDatabaseRequest.toJSON(e) : undefined);
    } else {
      obj.requests = [];
    }
    return obj;
  },

  create(base?: DeepPartial<BatchUpdateDatabasesRequest>): BatchUpdateDatabasesRequest {
    return BatchUpdateDatabasesRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BatchUpdateDatabasesRequest>): BatchUpdateDatabasesRequest {
    const message = createBaseBatchUpdateDatabasesRequest();
    message.parent = object.parent ?? "";
    message.requests = object.requests?.map((e) => UpdateDatabaseRequest.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBatchUpdateDatabasesResponse(): BatchUpdateDatabasesResponse {
  return { databases: [] };
}

export const BatchUpdateDatabasesResponse = {
  encode(message: BatchUpdateDatabasesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.databases) {
      Database.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchUpdateDatabasesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchUpdateDatabasesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.databases.push(Database.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchUpdateDatabasesResponse {
    return {
      databases: Array.isArray(object?.databases) ? object.databases.map((e: any) => Database.fromJSON(e)) : [],
    };
  },

  toJSON(message: BatchUpdateDatabasesResponse): unknown {
    const obj: any = {};
    if (message.databases) {
      obj.databases = message.databases.map((e) => e ? Database.toJSON(e) : undefined);
    } else {
      obj.databases = [];
    }
    return obj;
  },

  create(base?: DeepPartial<BatchUpdateDatabasesResponse>): BatchUpdateDatabasesResponse {
    return BatchUpdateDatabasesResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BatchUpdateDatabasesResponse>): BatchUpdateDatabasesResponse {
    const message = createBaseBatchUpdateDatabasesResponse();
    message.databases = object.databases?.map((e) => Database.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetDatabaseMetadataRequest(): GetDatabaseMetadataRequest {
  return { name: "" };
}

export const GetDatabaseMetadataRequest = {
  encode(message: GetDatabaseMetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDatabaseMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDatabaseMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetDatabaseMetadataRequest {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: GetDatabaseMetadataRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create(base?: DeepPartial<GetDatabaseMetadataRequest>): GetDatabaseMetadataRequest {
    return GetDatabaseMetadataRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetDatabaseMetadataRequest>): GetDatabaseMetadataRequest {
    const message = createBaseGetDatabaseMetadataRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseGetDatabaseSchemaRequest(): GetDatabaseSchemaRequest {
  return { name: "" };
}

export const GetDatabaseSchemaRequest = {
  encode(message: GetDatabaseSchemaRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDatabaseSchemaRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDatabaseSchemaRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetDatabaseSchemaRequest {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: GetDatabaseSchemaRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create(base?: DeepPartial<GetDatabaseSchemaRequest>): GetDatabaseSchemaRequest {
    return GetDatabaseSchemaRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetDatabaseSchemaRequest>): GetDatabaseSchemaRequest {
    const message = createBaseGetDatabaseSchemaRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseGetBackupSettingRequest(): GetBackupSettingRequest {
  return { name: "" };
}

export const GetBackupSettingRequest = {
  encode(message: GetBackupSettingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBackupSettingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBackupSettingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBackupSettingRequest {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: GetBackupSettingRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create(base?: DeepPartial<GetBackupSettingRequest>): GetBackupSettingRequest {
    return GetBackupSettingRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetBackupSettingRequest>): GetBackupSettingRequest {
    const message = createBaseGetBackupSettingRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseUpdateBackupSettingRequest(): UpdateBackupSettingRequest {
  return { setting: undefined };
}

export const UpdateBackupSettingRequest = {
  encode(message: UpdateBackupSettingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.setting !== undefined) {
      BackupSetting.encode(message.setting, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateBackupSettingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateBackupSettingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.setting = BackupSetting.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateBackupSettingRequest {
    return { setting: isSet(object.setting) ? BackupSetting.fromJSON(object.setting) : undefined };
  },

  toJSON(message: UpdateBackupSettingRequest): unknown {
    const obj: any = {};
    message.setting !== undefined &&
      (obj.setting = message.setting ? BackupSetting.toJSON(message.setting) : undefined);
    return obj;
  },

  create(base?: DeepPartial<UpdateBackupSettingRequest>): UpdateBackupSettingRequest {
    return UpdateBackupSettingRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UpdateBackupSettingRequest>): UpdateBackupSettingRequest {
    const message = createBaseUpdateBackupSettingRequest();
    message.setting = (object.setting !== undefined && object.setting !== null)
      ? BackupSetting.fromPartial(object.setting)
      : undefined;
    return message;
  },
};

function createBaseCreateBackupRequest(): CreateBackupRequest {
  return { parent: "", backup: undefined };
}

export const CreateBackupRequest = {
  encode(message: CreateBackupRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.backup !== undefined) {
      Backup.encode(message.backup, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateBackupRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateBackupRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.backup = Backup.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateBackupRequest {
    return {
      parent: isSet(object.parent) ? String(object.parent) : "",
      backup: isSet(object.backup) ? Backup.fromJSON(object.backup) : undefined,
    };
  },

  toJSON(message: CreateBackupRequest): unknown {
    const obj: any = {};
    message.parent !== undefined && (obj.parent = message.parent);
    message.backup !== undefined && (obj.backup = message.backup ? Backup.toJSON(message.backup) : undefined);
    return obj;
  },

  create(base?: DeepPartial<CreateBackupRequest>): CreateBackupRequest {
    return CreateBackupRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CreateBackupRequest>): CreateBackupRequest {
    const message = createBaseCreateBackupRequest();
    message.parent = object.parent ?? "";
    message.backup = (object.backup !== undefined && object.backup !== null)
      ? Backup.fromPartial(object.backup)
      : undefined;
    return message;
  },
};

function createBaseListBackupRequest(): ListBackupRequest {
  return { parent: "", pageSize: 0, pageToken: "" };
}

export const ListBackupRequest = {
  encode(message: ListBackupRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.pageToken !== "") {
      writer.uint32(26).string(message.pageToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListBackupRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListBackupRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.pageToken = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListBackupRequest {
    return {
      parent: isSet(object.parent) ? String(object.parent) : "",
      pageSize: isSet(object.pageSize) ? Number(object.pageSize) : 0,
      pageToken: isSet(object.pageToken) ? String(object.pageToken) : "",
    };
  },

  toJSON(message: ListBackupRequest): unknown {
    const obj: any = {};
    message.parent !== undefined && (obj.parent = message.parent);
    message.pageSize !== undefined && (obj.pageSize = Math.round(message.pageSize));
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  create(base?: DeepPartial<ListBackupRequest>): ListBackupRequest {
    return ListBackupRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListBackupRequest>): ListBackupRequest {
    const message = createBaseListBackupRequest();
    message.parent = object.parent ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

function createBaseListBackupResponse(): ListBackupResponse {
  return { backups: [], nextPageToken: "" };
}

export const ListBackupResponse = {
  encode(message: ListBackupResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.backups) {
      Backup.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(18).string(message.nextPageToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListBackupResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListBackupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.backups.push(Backup.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.nextPageToken = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListBackupResponse {
    return {
      backups: Array.isArray(object?.backups) ? object.backups.map((e: any) => Backup.fromJSON(e)) : [],
      nextPageToken: isSet(object.nextPageToken) ? String(object.nextPageToken) : "",
    };
  },

  toJSON(message: ListBackupResponse): unknown {
    const obj: any = {};
    if (message.backups) {
      obj.backups = message.backups.map((e) => e ? Backup.toJSON(e) : undefined);
    } else {
      obj.backups = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    return obj;
  },

  create(base?: DeepPartial<ListBackupResponse>): ListBackupResponse {
    return ListBackupResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListBackupResponse>): ListBackupResponse {
    const message = createBaseListBackupResponse();
    message.backups = object.backups?.map((e) => Backup.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    return message;
  },
};

function createBaseDatabase(): Database {
  return { name: "", uid: "", syncState: 0, successfulSyncTime: undefined, project: "", schemaVersion: "", labels: {} };
}

export const Database = {
  encode(message: Database, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.uid !== "") {
      writer.uint32(18).string(message.uid);
    }
    if (message.syncState !== 0) {
      writer.uint32(24).int32(message.syncState);
    }
    if (message.successfulSyncTime !== undefined) {
      Timestamp.encode(toTimestamp(message.successfulSyncTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.project !== "") {
      writer.uint32(42).string(message.project);
    }
    if (message.schemaVersion !== "") {
      writer.uint32(50).string(message.schemaVersion);
    }
    Object.entries(message.labels).forEach(([key, value]) => {
      Database_LabelsEntry.encode({ key: key as any, value }, writer.uint32(58).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Database {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatabase();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.uid = reader.string();
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.syncState = reader.int32() as any;
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.successfulSyncTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.project = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.schemaVersion = reader.string();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          const entry7 = Database_LabelsEntry.decode(reader, reader.uint32());
          if (entry7.value !== undefined) {
            message.labels[entry7.key] = entry7.value;
          }
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Database {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      uid: isSet(object.uid) ? String(object.uid) : "",
      syncState: isSet(object.syncState) ? stateFromJSON(object.syncState) : 0,
      successfulSyncTime: isSet(object.successfulSyncTime) ? fromJsonTimestamp(object.successfulSyncTime) : undefined,
      project: isSet(object.project) ? String(object.project) : "",
      schemaVersion: isSet(object.schemaVersion) ? String(object.schemaVersion) : "",
      labels: isObject(object.labels)
        ? Object.entries(object.labels).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Database): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.uid !== undefined && (obj.uid = message.uid);
    message.syncState !== undefined && (obj.syncState = stateToJSON(message.syncState));
    message.successfulSyncTime !== undefined && (obj.successfulSyncTime = message.successfulSyncTime.toISOString());
    message.project !== undefined && (obj.project = message.project);
    message.schemaVersion !== undefined && (obj.schemaVersion = message.schemaVersion);
    obj.labels = {};
    if (message.labels) {
      Object.entries(message.labels).forEach(([k, v]) => {
        obj.labels[k] = v;
      });
    }
    return obj;
  },

  create(base?: DeepPartial<Database>): Database {
    return Database.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Database>): Database {
    const message = createBaseDatabase();
    message.name = object.name ?? "";
    message.uid = object.uid ?? "";
    message.syncState = object.syncState ?? 0;
    message.successfulSyncTime = object.successfulSyncTime ?? undefined;
    message.project = object.project ?? "";
    message.schemaVersion = object.schemaVersion ?? "";
    message.labels = Object.entries(object.labels ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseDatabase_LabelsEntry(): Database_LabelsEntry {
  return { key: "", value: "" };
}

export const Database_LabelsEntry = {
  encode(message: Database_LabelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Database_LabelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatabase_LabelsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Database_LabelsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: Database_LabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create(base?: DeepPartial<Database_LabelsEntry>): Database_LabelsEntry {
    return Database_LabelsEntry.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Database_LabelsEntry>): Database_LabelsEntry {
    const message = createBaseDatabase_LabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDatabaseMetadata(): DatabaseMetadata {
  return { name: "", schemas: [], characterSet: "", collation: "", extensions: [] };
}

export const DatabaseMetadata = {
  encode(message: DatabaseMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.schemas) {
      SchemaMetadata.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.characterSet !== "") {
      writer.uint32(26).string(message.characterSet);
    }
    if (message.collation !== "") {
      writer.uint32(34).string(message.collation);
    }
    for (const v of message.extensions) {
      ExtensionMetadata.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DatabaseMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatabaseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.schemas.push(SchemaMetadata.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.characterSet = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.collation = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.extensions.push(ExtensionMetadata.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DatabaseMetadata {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      schemas: Array.isArray(object?.schemas) ? object.schemas.map((e: any) => SchemaMetadata.fromJSON(e)) : [],
      characterSet: isSet(object.characterSet) ? String(object.characterSet) : "",
      collation: isSet(object.collation) ? String(object.collation) : "",
      extensions: Array.isArray(object?.extensions)
        ? object.extensions.map((e: any) => ExtensionMetadata.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DatabaseMetadata): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.schemas) {
      obj.schemas = message.schemas.map((e) => e ? SchemaMetadata.toJSON(e) : undefined);
    } else {
      obj.schemas = [];
    }
    message.characterSet !== undefined && (obj.characterSet = message.characterSet);
    message.collation !== undefined && (obj.collation = message.collation);
    if (message.extensions) {
      obj.extensions = message.extensions.map((e) => e ? ExtensionMetadata.toJSON(e) : undefined);
    } else {
      obj.extensions = [];
    }
    return obj;
  },

  create(base?: DeepPartial<DatabaseMetadata>): DatabaseMetadata {
    return DatabaseMetadata.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<DatabaseMetadata>): DatabaseMetadata {
    const message = createBaseDatabaseMetadata();
    message.name = object.name ?? "";
    message.schemas = object.schemas?.map((e) => SchemaMetadata.fromPartial(e)) || [];
    message.characterSet = object.characterSet ?? "";
    message.collation = object.collation ?? "";
    message.extensions = object.extensions?.map((e) => ExtensionMetadata.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSchemaMetadata(): SchemaMetadata {
  return { name: "", tables: [], views: [] };
}

export const SchemaMetadata = {
  encode(message: SchemaMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.tables) {
      TableMetadata.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.views) {
      ViewMetadata.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SchemaMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchemaMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.tables.push(TableMetadata.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.views.push(ViewMetadata.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SchemaMetadata {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      tables: Array.isArray(object?.tables) ? object.tables.map((e: any) => TableMetadata.fromJSON(e)) : [],
      views: Array.isArray(object?.views) ? object.views.map((e: any) => ViewMetadata.fromJSON(e)) : [],
    };
  },

  toJSON(message: SchemaMetadata): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.tables) {
      obj.tables = message.tables.map((e) => e ? TableMetadata.toJSON(e) : undefined);
    } else {
      obj.tables = [];
    }
    if (message.views) {
      obj.views = message.views.map((e) => e ? ViewMetadata.toJSON(e) : undefined);
    } else {
      obj.views = [];
    }
    return obj;
  },

  create(base?: DeepPartial<SchemaMetadata>): SchemaMetadata {
    return SchemaMetadata.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SchemaMetadata>): SchemaMetadata {
    const message = createBaseSchemaMetadata();
    message.name = object.name ?? "";
    message.tables = object.tables?.map((e) => TableMetadata.fromPartial(e)) || [];
    message.views = object.views?.map((e) => ViewMetadata.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTableMetadata(): TableMetadata {
  return {
    name: "",
    columns: [],
    indexes: [],
    engine: "",
    collation: "",
    rowCount: 0,
    dataSize: 0,
    indexSize: 0,
    dataFree: 0,
    createOptions: "",
    comment: "",
    foreignKeys: [],
  };
}

export const TableMetadata = {
  encode(message: TableMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.columns) {
      ColumnMetadata.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.indexes) {
      IndexMetadata.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.engine !== "") {
      writer.uint32(34).string(message.engine);
    }
    if (message.collation !== "") {
      writer.uint32(42).string(message.collation);
    }
    if (message.rowCount !== 0) {
      writer.uint32(48).int64(message.rowCount);
    }
    if (message.dataSize !== 0) {
      writer.uint32(56).int64(message.dataSize);
    }
    if (message.indexSize !== 0) {
      writer.uint32(64).int64(message.indexSize);
    }
    if (message.dataFree !== 0) {
      writer.uint32(72).int64(message.dataFree);
    }
    if (message.createOptions !== "") {
      writer.uint32(82).string(message.createOptions);
    }
    if (message.comment !== "") {
      writer.uint32(90).string(message.comment);
    }
    for (const v of message.foreignKeys) {
      ForeignKeyMetadata.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TableMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTableMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.columns.push(ColumnMetadata.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.indexes.push(IndexMetadata.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.engine = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.collation = reader.string();
          continue;
        case 6:
          if (tag != 48) {
            break;
          }

          message.rowCount = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag != 56) {
            break;
          }

          message.dataSize = longToNumber(reader.int64() as Long);
          continue;
        case 8:
          if (tag != 64) {
            break;
          }

          message.indexSize = longToNumber(reader.int64() as Long);
          continue;
        case 9:
          if (tag != 72) {
            break;
          }

          message.dataFree = longToNumber(reader.int64() as Long);
          continue;
        case 10:
          if (tag != 82) {
            break;
          }

          message.createOptions = reader.string();
          continue;
        case 11:
          if (tag != 90) {
            break;
          }

          message.comment = reader.string();
          continue;
        case 12:
          if (tag != 98) {
            break;
          }

          message.foreignKeys.push(ForeignKeyMetadata.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TableMetadata {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      columns: Array.isArray(object?.columns) ? object.columns.map((e: any) => ColumnMetadata.fromJSON(e)) : [],
      indexes: Array.isArray(object?.indexes) ? object.indexes.map((e: any) => IndexMetadata.fromJSON(e)) : [],
      engine: isSet(object.engine) ? String(object.engine) : "",
      collation: isSet(object.collation) ? String(object.collation) : "",
      rowCount: isSet(object.rowCount) ? Number(object.rowCount) : 0,
      dataSize: isSet(object.dataSize) ? Number(object.dataSize) : 0,
      indexSize: isSet(object.indexSize) ? Number(object.indexSize) : 0,
      dataFree: isSet(object.dataFree) ? Number(object.dataFree) : 0,
      createOptions: isSet(object.createOptions) ? String(object.createOptions) : "",
      comment: isSet(object.comment) ? String(object.comment) : "",
      foreignKeys: Array.isArray(object?.foreignKeys)
        ? object.foreignKeys.map((e: any) => ForeignKeyMetadata.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TableMetadata): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.columns) {
      obj.columns = message.columns.map((e) => e ? ColumnMetadata.toJSON(e) : undefined);
    } else {
      obj.columns = [];
    }
    if (message.indexes) {
      obj.indexes = message.indexes.map((e) => e ? IndexMetadata.toJSON(e) : undefined);
    } else {
      obj.indexes = [];
    }
    message.engine !== undefined && (obj.engine = message.engine);
    message.collation !== undefined && (obj.collation = message.collation);
    message.rowCount !== undefined && (obj.rowCount = Math.round(message.rowCount));
    message.dataSize !== undefined && (obj.dataSize = Math.round(message.dataSize));
    message.indexSize !== undefined && (obj.indexSize = Math.round(message.indexSize));
    message.dataFree !== undefined && (obj.dataFree = Math.round(message.dataFree));
    message.createOptions !== undefined && (obj.createOptions = message.createOptions);
    message.comment !== undefined && (obj.comment = message.comment);
    if (message.foreignKeys) {
      obj.foreignKeys = message.foreignKeys.map((e) => e ? ForeignKeyMetadata.toJSON(e) : undefined);
    } else {
      obj.foreignKeys = [];
    }
    return obj;
  },

  create(base?: DeepPartial<TableMetadata>): TableMetadata {
    return TableMetadata.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<TableMetadata>): TableMetadata {
    const message = createBaseTableMetadata();
    message.name = object.name ?? "";
    message.columns = object.columns?.map((e) => ColumnMetadata.fromPartial(e)) || [];
    message.indexes = object.indexes?.map((e) => IndexMetadata.fromPartial(e)) || [];
    message.engine = object.engine ?? "";
    message.collation = object.collation ?? "";
    message.rowCount = object.rowCount ?? 0;
    message.dataSize = object.dataSize ?? 0;
    message.indexSize = object.indexSize ?? 0;
    message.dataFree = object.dataFree ?? 0;
    message.createOptions = object.createOptions ?? "";
    message.comment = object.comment ?? "";
    message.foreignKeys = object.foreignKeys?.map((e) => ForeignKeyMetadata.fromPartial(e)) || [];
    return message;
  },
};

function createBaseColumnMetadata(): ColumnMetadata {
  return {
    name: "",
    position: 0,
    default: undefined,
    nullable: false,
    type: "",
    characterSet: "",
    collation: "",
    comment: "",
  };
}

export const ColumnMetadata = {
  encode(message: ColumnMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.position !== 0) {
      writer.uint32(16).int32(message.position);
    }
    if (message.default !== undefined) {
      StringValue.encode({ value: message.default! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.nullable === true) {
      writer.uint32(32).bool(message.nullable);
    }
    if (message.type !== "") {
      writer.uint32(42).string(message.type);
    }
    if (message.characterSet !== "") {
      writer.uint32(50).string(message.characterSet);
    }
    if (message.collation !== "") {
      writer.uint32(58).string(message.collation);
    }
    if (message.comment !== "") {
      writer.uint32(66).string(message.comment);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ColumnMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseColumnMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.position = reader.int32();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.default = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.nullable = reader.bool();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.type = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.characterSet = reader.string();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.collation = reader.string();
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.comment = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ColumnMetadata {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      position: isSet(object.position) ? Number(object.position) : 0,
      default: isSet(object.default) ? String(object.default) : undefined,
      nullable: isSet(object.nullable) ? Boolean(object.nullable) : false,
      type: isSet(object.type) ? String(object.type) : "",
      characterSet: isSet(object.characterSet) ? String(object.characterSet) : "",
      collation: isSet(object.collation) ? String(object.collation) : "",
      comment: isSet(object.comment) ? String(object.comment) : "",
    };
  },

  toJSON(message: ColumnMetadata): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.position !== undefined && (obj.position = Math.round(message.position));
    message.default !== undefined && (obj.default = message.default);
    message.nullable !== undefined && (obj.nullable = message.nullable);
    message.type !== undefined && (obj.type = message.type);
    message.characterSet !== undefined && (obj.characterSet = message.characterSet);
    message.collation !== undefined && (obj.collation = message.collation);
    message.comment !== undefined && (obj.comment = message.comment);
    return obj;
  },

  create(base?: DeepPartial<ColumnMetadata>): ColumnMetadata {
    return ColumnMetadata.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ColumnMetadata>): ColumnMetadata {
    const message = createBaseColumnMetadata();
    message.name = object.name ?? "";
    message.position = object.position ?? 0;
    message.default = object.default ?? undefined;
    message.nullable = object.nullable ?? false;
    message.type = object.type ?? "";
    message.characterSet = object.characterSet ?? "";
    message.collation = object.collation ?? "";
    message.comment = object.comment ?? "";
    return message;
  },
};

function createBaseViewMetadata(): ViewMetadata {
  return { name: "", definition: "", comment: "", dependentColumns: [] };
}

export const ViewMetadata = {
  encode(message: ViewMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.definition !== "") {
      writer.uint32(18).string(message.definition);
    }
    if (message.comment !== "") {
      writer.uint32(26).string(message.comment);
    }
    for (const v of message.dependentColumns) {
      DependentColumn.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ViewMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseViewMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.definition = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.comment = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.dependentColumns.push(DependentColumn.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ViewMetadata {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      definition: isSet(object.definition) ? String(object.definition) : "",
      comment: isSet(object.comment) ? String(object.comment) : "",
      dependentColumns: Array.isArray(object?.dependentColumns)
        ? object.dependentColumns.map((e: any) => DependentColumn.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ViewMetadata): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.definition !== undefined && (obj.definition = message.definition);
    message.comment !== undefined && (obj.comment = message.comment);
    if (message.dependentColumns) {
      obj.dependentColumns = message.dependentColumns.map((e) => e ? DependentColumn.toJSON(e) : undefined);
    } else {
      obj.dependentColumns = [];
    }
    return obj;
  },

  create(base?: DeepPartial<ViewMetadata>): ViewMetadata {
    return ViewMetadata.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ViewMetadata>): ViewMetadata {
    const message = createBaseViewMetadata();
    message.name = object.name ?? "";
    message.definition = object.definition ?? "";
    message.comment = object.comment ?? "";
    message.dependentColumns = object.dependentColumns?.map((e) => DependentColumn.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDependentColumn(): DependentColumn {
  return { schema: "", table: "", column: "" };
}

export const DependentColumn = {
  encode(message: DependentColumn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schema !== "") {
      writer.uint32(10).string(message.schema);
    }
    if (message.table !== "") {
      writer.uint32(18).string(message.table);
    }
    if (message.column !== "") {
      writer.uint32(26).string(message.column);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DependentColumn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDependentColumn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.schema = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.table = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.column = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DependentColumn {
    return {
      schema: isSet(object.schema) ? String(object.schema) : "",
      table: isSet(object.table) ? String(object.table) : "",
      column: isSet(object.column) ? String(object.column) : "",
    };
  },

  toJSON(message: DependentColumn): unknown {
    const obj: any = {};
    message.schema !== undefined && (obj.schema = message.schema);
    message.table !== undefined && (obj.table = message.table);
    message.column !== undefined && (obj.column = message.column);
    return obj;
  },

  create(base?: DeepPartial<DependentColumn>): DependentColumn {
    return DependentColumn.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<DependentColumn>): DependentColumn {
    const message = createBaseDependentColumn();
    message.schema = object.schema ?? "";
    message.table = object.table ?? "";
    message.column = object.column ?? "";
    return message;
  },
};

function createBaseIndexMetadata(): IndexMetadata {
  return { name: "", expressions: [], type: "", unique: false, primary: false, visible: false, comment: "" };
}

export const IndexMetadata = {
  encode(message: IndexMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.expressions) {
      writer.uint32(18).string(v!);
    }
    if (message.type !== "") {
      writer.uint32(26).string(message.type);
    }
    if (message.unique === true) {
      writer.uint32(32).bool(message.unique);
    }
    if (message.primary === true) {
      writer.uint32(40).bool(message.primary);
    }
    if (message.visible === true) {
      writer.uint32(48).bool(message.visible);
    }
    if (message.comment !== "") {
      writer.uint32(58).string(message.comment);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IndexMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndexMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.expressions.push(reader.string());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.type = reader.string();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.unique = reader.bool();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.primary = reader.bool();
          continue;
        case 6:
          if (tag != 48) {
            break;
          }

          message.visible = reader.bool();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.comment = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IndexMetadata {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      expressions: Array.isArray(object?.expressions) ? object.expressions.map((e: any) => String(e)) : [],
      type: isSet(object.type) ? String(object.type) : "",
      unique: isSet(object.unique) ? Boolean(object.unique) : false,
      primary: isSet(object.primary) ? Boolean(object.primary) : false,
      visible: isSet(object.visible) ? Boolean(object.visible) : false,
      comment: isSet(object.comment) ? String(object.comment) : "",
    };
  },

  toJSON(message: IndexMetadata): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.expressions) {
      obj.expressions = message.expressions.map((e) => e);
    } else {
      obj.expressions = [];
    }
    message.type !== undefined && (obj.type = message.type);
    message.unique !== undefined && (obj.unique = message.unique);
    message.primary !== undefined && (obj.primary = message.primary);
    message.visible !== undefined && (obj.visible = message.visible);
    message.comment !== undefined && (obj.comment = message.comment);
    return obj;
  },

  create(base?: DeepPartial<IndexMetadata>): IndexMetadata {
    return IndexMetadata.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<IndexMetadata>): IndexMetadata {
    const message = createBaseIndexMetadata();
    message.name = object.name ?? "";
    message.expressions = object.expressions?.map((e) => e) || [];
    message.type = object.type ?? "";
    message.unique = object.unique ?? false;
    message.primary = object.primary ?? false;
    message.visible = object.visible ?? false;
    message.comment = object.comment ?? "";
    return message;
  },
};

function createBaseExtensionMetadata(): ExtensionMetadata {
  return { name: "", schema: "", version: "", description: "" };
}

export const ExtensionMetadata = {
  encode(message: ExtensionMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.schema !== "") {
      writer.uint32(18).string(message.schema);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtensionMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtensionMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.schema = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.version = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtensionMetadata {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      schema: isSet(object.schema) ? String(object.schema) : "",
      version: isSet(object.version) ? String(object.version) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: ExtensionMetadata): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.schema !== undefined && (obj.schema = message.schema);
    message.version !== undefined && (obj.version = message.version);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  create(base?: DeepPartial<ExtensionMetadata>): ExtensionMetadata {
    return ExtensionMetadata.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ExtensionMetadata>): ExtensionMetadata {
    const message = createBaseExtensionMetadata();
    message.name = object.name ?? "";
    message.schema = object.schema ?? "";
    message.version = object.version ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseForeignKeyMetadata(): ForeignKeyMetadata {
  return {
    name: "",
    columns: [],
    referencedSchema: "",
    referencedTable: "",
    referencedColumns: [],
    onDelete: "",
    onUpdate: "",
    matchType: "",
  };
}

export const ForeignKeyMetadata = {
  encode(message: ForeignKeyMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.columns) {
      writer.uint32(18).string(v!);
    }
    if (message.referencedSchema !== "") {
      writer.uint32(26).string(message.referencedSchema);
    }
    if (message.referencedTable !== "") {
      writer.uint32(34).string(message.referencedTable);
    }
    for (const v of message.referencedColumns) {
      writer.uint32(42).string(v!);
    }
    if (message.onDelete !== "") {
      writer.uint32(50).string(message.onDelete);
    }
    if (message.onUpdate !== "") {
      writer.uint32(58).string(message.onUpdate);
    }
    if (message.matchType !== "") {
      writer.uint32(66).string(message.matchType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ForeignKeyMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseForeignKeyMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.columns.push(reader.string());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.referencedSchema = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.referencedTable = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.referencedColumns.push(reader.string());
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.onDelete = reader.string();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.onUpdate = reader.string();
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.matchType = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ForeignKeyMetadata {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      columns: Array.isArray(object?.columns) ? object.columns.map((e: any) => String(e)) : [],
      referencedSchema: isSet(object.referencedSchema) ? String(object.referencedSchema) : "",
      referencedTable: isSet(object.referencedTable) ? String(object.referencedTable) : "",
      referencedColumns: Array.isArray(object?.referencedColumns)
        ? object.referencedColumns.map((e: any) => String(e))
        : [],
      onDelete: isSet(object.onDelete) ? String(object.onDelete) : "",
      onUpdate: isSet(object.onUpdate) ? String(object.onUpdate) : "",
      matchType: isSet(object.matchType) ? String(object.matchType) : "",
    };
  },

  toJSON(message: ForeignKeyMetadata): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.columns) {
      obj.columns = message.columns.map((e) => e);
    } else {
      obj.columns = [];
    }
    message.referencedSchema !== undefined && (obj.referencedSchema = message.referencedSchema);
    message.referencedTable !== undefined && (obj.referencedTable = message.referencedTable);
    if (message.referencedColumns) {
      obj.referencedColumns = message.referencedColumns.map((e) => e);
    } else {
      obj.referencedColumns = [];
    }
    message.onDelete !== undefined && (obj.onDelete = message.onDelete);
    message.onUpdate !== undefined && (obj.onUpdate = message.onUpdate);
    message.matchType !== undefined && (obj.matchType = message.matchType);
    return obj;
  },

  create(base?: DeepPartial<ForeignKeyMetadata>): ForeignKeyMetadata {
    return ForeignKeyMetadata.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ForeignKeyMetadata>): ForeignKeyMetadata {
    const message = createBaseForeignKeyMetadata();
    message.name = object.name ?? "";
    message.columns = object.columns?.map((e) => e) || [];
    message.referencedSchema = object.referencedSchema ?? "";
    message.referencedTable = object.referencedTable ?? "";
    message.referencedColumns = object.referencedColumns?.map((e) => e) || [];
    message.onDelete = object.onDelete ?? "";
    message.onUpdate = object.onUpdate ?? "";
    message.matchType = object.matchType ?? "";
    return message;
  },
};

function createBaseDatabaseSchema(): DatabaseSchema {
  return { schema: "" };
}

export const DatabaseSchema = {
  encode(message: DatabaseSchema, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.schema !== "") {
      writer.uint32(10).string(message.schema);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DatabaseSchema {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatabaseSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.schema = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DatabaseSchema {
    return { schema: isSet(object.schema) ? String(object.schema) : "" };
  },

  toJSON(message: DatabaseSchema): unknown {
    const obj: any = {};
    message.schema !== undefined && (obj.schema = message.schema);
    return obj;
  },

  create(base?: DeepPartial<DatabaseSchema>): DatabaseSchema {
    return DatabaseSchema.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<DatabaseSchema>): DatabaseSchema {
    const message = createBaseDatabaseSchema();
    message.schema = object.schema ?? "";
    return message;
  },
};

function createBaseBackupSetting(): BackupSetting {
  return { name: "", backupRetainDuration: undefined, cronSchedule: "", hookUrl: "" };
}

export const BackupSetting = {
  encode(message: BackupSetting, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.backupRetainDuration !== undefined) {
      Duration.encode(message.backupRetainDuration, writer.uint32(18).fork()).ldelim();
    }
    if (message.cronSchedule !== "") {
      writer.uint32(26).string(message.cronSchedule);
    }
    if (message.hookUrl !== "") {
      writer.uint32(34).string(message.hookUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BackupSetting {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBackupSetting();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.backupRetainDuration = Duration.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.cronSchedule = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.hookUrl = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BackupSetting {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      backupRetainDuration: isSet(object.backupRetainDuration)
        ? Duration.fromJSON(object.backupRetainDuration)
        : undefined,
      cronSchedule: isSet(object.cronSchedule) ? String(object.cronSchedule) : "",
      hookUrl: isSet(object.hookUrl) ? String(object.hookUrl) : "",
    };
  },

  toJSON(message: BackupSetting): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.backupRetainDuration !== undefined && (obj.backupRetainDuration = message.backupRetainDuration
      ? Duration.toJSON(message.backupRetainDuration)
      : undefined);
    message.cronSchedule !== undefined && (obj.cronSchedule = message.cronSchedule);
    message.hookUrl !== undefined && (obj.hookUrl = message.hookUrl);
    return obj;
  },

  create(base?: DeepPartial<BackupSetting>): BackupSetting {
    return BackupSetting.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BackupSetting>): BackupSetting {
    const message = createBaseBackupSetting();
    message.name = object.name ?? "";
    message.backupRetainDuration = (object.backupRetainDuration !== undefined && object.backupRetainDuration !== null)
      ? Duration.fromPartial(object.backupRetainDuration)
      : undefined;
    message.cronSchedule = object.cronSchedule ?? "";
    message.hookUrl = object.hookUrl ?? "";
    return message;
  },
};

function createBaseBackup(): Backup {
  return { name: "", createTime: undefined, updateTime: undefined, state: 0, backupType: 0, comment: "" };
}

export const Backup = {
  encode(message: Backup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.updateTime !== undefined) {
      Timestamp.encode(toTimestamp(message.updateTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(32).int32(message.state);
    }
    if (message.backupType !== 0) {
      writer.uint32(40).int32(message.backupType);
    }
    if (message.comment !== "") {
      writer.uint32(50).string(message.comment);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Backup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBackup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.createTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.updateTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.backupType = reader.int32() as any;
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.comment = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Backup {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      createTime: isSet(object.createTime) ? fromJsonTimestamp(object.createTime) : undefined,
      updateTime: isSet(object.updateTime) ? fromJsonTimestamp(object.updateTime) : undefined,
      state: isSet(object.state) ? backup_BackupStateFromJSON(object.state) : 0,
      backupType: isSet(object.backupType) ? backup_BackupTypeFromJSON(object.backupType) : 0,
      comment: isSet(object.comment) ? String(object.comment) : "",
    };
  },

  toJSON(message: Backup): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.createTime !== undefined && (obj.createTime = message.createTime.toISOString());
    message.updateTime !== undefined && (obj.updateTime = message.updateTime.toISOString());
    message.state !== undefined && (obj.state = backup_BackupStateToJSON(message.state));
    message.backupType !== undefined && (obj.backupType = backup_BackupTypeToJSON(message.backupType));
    message.comment !== undefined && (obj.comment = message.comment);
    return obj;
  },

  create(base?: DeepPartial<Backup>): Backup {
    return Backup.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Backup>): Backup {
    const message = createBaseBackup();
    message.name = object.name ?? "";
    message.createTime = object.createTime ?? undefined;
    message.updateTime = object.updateTime ?? undefined;
    message.state = object.state ?? 0;
    message.backupType = object.backupType ?? 0;
    message.comment = object.comment ?? "";
    return message;
  },
};

function createBaseListSlowQueriesRequest(): ListSlowQueriesRequest {
  return { parent: "", filter: "", orderBy: "" };
}

export const ListSlowQueriesRequest = {
  encode(message: ListSlowQueriesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== "") {
      writer.uint32(10).string(message.parent);
    }
    if (message.filter !== "") {
      writer.uint32(18).string(message.filter);
    }
    if (message.orderBy !== "") {
      writer.uint32(26).string(message.orderBy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSlowQueriesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSlowQueriesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.parent = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.filter = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.orderBy = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListSlowQueriesRequest {
    return {
      parent: isSet(object.parent) ? String(object.parent) : "",
      filter: isSet(object.filter) ? String(object.filter) : "",
      orderBy: isSet(object.orderBy) ? String(object.orderBy) : "",
    };
  },

  toJSON(message: ListSlowQueriesRequest): unknown {
    const obj: any = {};
    message.parent !== undefined && (obj.parent = message.parent);
    message.filter !== undefined && (obj.filter = message.filter);
    message.orderBy !== undefined && (obj.orderBy = message.orderBy);
    return obj;
  },

  create(base?: DeepPartial<ListSlowQueriesRequest>): ListSlowQueriesRequest {
    return ListSlowQueriesRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListSlowQueriesRequest>): ListSlowQueriesRequest {
    const message = createBaseListSlowQueriesRequest();
    message.parent = object.parent ?? "";
    message.filter = object.filter ?? "";
    message.orderBy = object.orderBy ?? "";
    return message;
  },
};

function createBaseListSlowQueriesResponse(): ListSlowQueriesResponse {
  return { slowQueryLogs: [] };
}

export const ListSlowQueriesResponse = {
  encode(message: ListSlowQueriesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.slowQueryLogs) {
      SlowQueryLog.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSlowQueriesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSlowQueriesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.slowQueryLogs.push(SlowQueryLog.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListSlowQueriesResponse {
    return {
      slowQueryLogs: Array.isArray(object?.slowQueryLogs)
        ? object.slowQueryLogs.map((e: any) => SlowQueryLog.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListSlowQueriesResponse): unknown {
    const obj: any = {};
    if (message.slowQueryLogs) {
      obj.slowQueryLogs = message.slowQueryLogs.map((e) => e ? SlowQueryLog.toJSON(e) : undefined);
    } else {
      obj.slowQueryLogs = [];
    }
    return obj;
  },

  create(base?: DeepPartial<ListSlowQueriesResponse>): ListSlowQueriesResponse {
    return ListSlowQueriesResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListSlowQueriesResponse>): ListSlowQueriesResponse {
    const message = createBaseListSlowQueriesResponse();
    message.slowQueryLogs = object.slowQueryLogs?.map((e) => SlowQueryLog.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSlowQueryLog(): SlowQueryLog {
  return { resource: "", project: "", statistics: undefined };
}

export const SlowQueryLog = {
  encode(message: SlowQueryLog, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== "") {
      writer.uint32(10).string(message.resource);
    }
    if (message.project !== "") {
      writer.uint32(18).string(message.project);
    }
    if (message.statistics !== undefined) {
      SlowQueryStatistics.encode(message.statistics, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SlowQueryLog {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSlowQueryLog();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.resource = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.project = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.statistics = SlowQueryStatistics.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SlowQueryLog {
    return {
      resource: isSet(object.resource) ? String(object.resource) : "",
      project: isSet(object.project) ? String(object.project) : "",
      statistics: isSet(object.statistics) ? SlowQueryStatistics.fromJSON(object.statistics) : undefined,
    };
  },

  toJSON(message: SlowQueryLog): unknown {
    const obj: any = {};
    message.resource !== undefined && (obj.resource = message.resource);
    message.project !== undefined && (obj.project = message.project);
    message.statistics !== undefined &&
      (obj.statistics = message.statistics ? SlowQueryStatistics.toJSON(message.statistics) : undefined);
    return obj;
  },

  create(base?: DeepPartial<SlowQueryLog>): SlowQueryLog {
    return SlowQueryLog.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SlowQueryLog>): SlowQueryLog {
    const message = createBaseSlowQueryLog();
    message.resource = object.resource ?? "";
    message.project = object.project ?? "";
    message.statistics = (object.statistics !== undefined && object.statistics !== null)
      ? SlowQueryStatistics.fromPartial(object.statistics)
      : undefined;
    return message;
  },
};

function createBaseSlowQueryStatistics(): SlowQueryStatistics {
  return {
    sqlFingerprint: "",
    count: 0,
    latestLogTime: undefined,
    averageQueryTime: undefined,
    nightyFifthPercentileQueryTime: undefined,
    averageRowsSent: 0,
    nightyFifthPercentileRowsSent: 0,
    averageRowsExamined: 0,
    nightyFifthPercentileRowsExamined: 0,
    samples: [],
  };
}

export const SlowQueryStatistics = {
  encode(message: SlowQueryStatistics, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sqlFingerprint !== "") {
      writer.uint32(10).string(message.sqlFingerprint);
    }
    if (message.count !== 0) {
      writer.uint32(16).int32(message.count);
    }
    if (message.latestLogTime !== undefined) {
      Timestamp.encode(toTimestamp(message.latestLogTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.averageQueryTime !== undefined) {
      Duration.encode(message.averageQueryTime, writer.uint32(34).fork()).ldelim();
    }
    if (message.nightyFifthPercentileQueryTime !== undefined) {
      Duration.encode(message.nightyFifthPercentileQueryTime, writer.uint32(42).fork()).ldelim();
    }
    if (message.averageRowsSent !== 0) {
      writer.uint32(48).int32(message.averageRowsSent);
    }
    if (message.nightyFifthPercentileRowsSent !== 0) {
      writer.uint32(56).int32(message.nightyFifthPercentileRowsSent);
    }
    if (message.averageRowsExamined !== 0) {
      writer.uint32(64).int32(message.averageRowsExamined);
    }
    if (message.nightyFifthPercentileRowsExamined !== 0) {
      writer.uint32(72).int32(message.nightyFifthPercentileRowsExamined);
    }
    for (const v of message.samples) {
      SlowQueryDetails.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SlowQueryStatistics {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSlowQueryStatistics();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.sqlFingerprint = reader.string();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.count = reader.int32();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.latestLogTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.averageQueryTime = Duration.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.nightyFifthPercentileQueryTime = Duration.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag != 48) {
            break;
          }

          message.averageRowsSent = reader.int32();
          continue;
        case 7:
          if (tag != 56) {
            break;
          }

          message.nightyFifthPercentileRowsSent = reader.int32();
          continue;
        case 8:
          if (tag != 64) {
            break;
          }

          message.averageRowsExamined = reader.int32();
          continue;
        case 9:
          if (tag != 72) {
            break;
          }

          message.nightyFifthPercentileRowsExamined = reader.int32();
          continue;
        case 10:
          if (tag != 82) {
            break;
          }

          message.samples.push(SlowQueryDetails.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SlowQueryStatistics {
    return {
      sqlFingerprint: isSet(object.sqlFingerprint) ? String(object.sqlFingerprint) : "",
      count: isSet(object.count) ? Number(object.count) : 0,
      latestLogTime: isSet(object.latestLogTime) ? fromJsonTimestamp(object.latestLogTime) : undefined,
      averageQueryTime: isSet(object.averageQueryTime) ? Duration.fromJSON(object.averageQueryTime) : undefined,
      nightyFifthPercentileQueryTime: isSet(object.nightyFifthPercentileQueryTime)
        ? Duration.fromJSON(object.nightyFifthPercentileQueryTime)
        : undefined,
      averageRowsSent: isSet(object.averageRowsSent) ? Number(object.averageRowsSent) : 0,
      nightyFifthPercentileRowsSent: isSet(object.nightyFifthPercentileRowsSent)
        ? Number(object.nightyFifthPercentileRowsSent)
        : 0,
      averageRowsExamined: isSet(object.averageRowsExamined) ? Number(object.averageRowsExamined) : 0,
      nightyFifthPercentileRowsExamined: isSet(object.nightyFifthPercentileRowsExamined)
        ? Number(object.nightyFifthPercentileRowsExamined)
        : 0,
      samples: Array.isArray(object?.samples) ? object.samples.map((e: any) => SlowQueryDetails.fromJSON(e)) : [],
    };
  },

  toJSON(message: SlowQueryStatistics): unknown {
    const obj: any = {};
    message.sqlFingerprint !== undefined && (obj.sqlFingerprint = message.sqlFingerprint);
    message.count !== undefined && (obj.count = Math.round(message.count));
    message.latestLogTime !== undefined && (obj.latestLogTime = message.latestLogTime.toISOString());
    message.averageQueryTime !== undefined &&
      (obj.averageQueryTime = message.averageQueryTime ? Duration.toJSON(message.averageQueryTime) : undefined);
    message.nightyFifthPercentileQueryTime !== undefined &&
      (obj.nightyFifthPercentileQueryTime = message.nightyFifthPercentileQueryTime
        ? Duration.toJSON(message.nightyFifthPercentileQueryTime)
        : undefined);
    message.averageRowsSent !== undefined && (obj.averageRowsSent = Math.round(message.averageRowsSent));
    message.nightyFifthPercentileRowsSent !== undefined &&
      (obj.nightyFifthPercentileRowsSent = Math.round(message.nightyFifthPercentileRowsSent));
    message.averageRowsExamined !== undefined && (obj.averageRowsExamined = Math.round(message.averageRowsExamined));
    message.nightyFifthPercentileRowsExamined !== undefined &&
      (obj.nightyFifthPercentileRowsExamined = Math.round(message.nightyFifthPercentileRowsExamined));
    if (message.samples) {
      obj.samples = message.samples.map((e) => e ? SlowQueryDetails.toJSON(e) : undefined);
    } else {
      obj.samples = [];
    }
    return obj;
  },

  create(base?: DeepPartial<SlowQueryStatistics>): SlowQueryStatistics {
    return SlowQueryStatistics.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SlowQueryStatistics>): SlowQueryStatistics {
    const message = createBaseSlowQueryStatistics();
    message.sqlFingerprint = object.sqlFingerprint ?? "";
    message.count = object.count ?? 0;
    message.latestLogTime = object.latestLogTime ?? undefined;
    message.averageQueryTime = (object.averageQueryTime !== undefined && object.averageQueryTime !== null)
      ? Duration.fromPartial(object.averageQueryTime)
      : undefined;
    message.nightyFifthPercentileQueryTime =
      (object.nightyFifthPercentileQueryTime !== undefined && object.nightyFifthPercentileQueryTime !== null)
        ? Duration.fromPartial(object.nightyFifthPercentileQueryTime)
        : undefined;
    message.averageRowsSent = object.averageRowsSent ?? 0;
    message.nightyFifthPercentileRowsSent = object.nightyFifthPercentileRowsSent ?? 0;
    message.averageRowsExamined = object.averageRowsExamined ?? 0;
    message.nightyFifthPercentileRowsExamined = object.nightyFifthPercentileRowsExamined ?? 0;
    message.samples = object.samples?.map((e) => SlowQueryDetails.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSlowQueryDetails(): SlowQueryDetails {
  return { startTime: undefined, queryTime: undefined, lockTime: undefined, rowsSent: 0, rowsExamined: 0, sqlText: "" };
}

export const SlowQueryDetails = {
  encode(message: SlowQueryDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.queryTime !== undefined) {
      Duration.encode(message.queryTime, writer.uint32(18).fork()).ldelim();
    }
    if (message.lockTime !== undefined) {
      Duration.encode(message.lockTime, writer.uint32(26).fork()).ldelim();
    }
    if (message.rowsSent !== 0) {
      writer.uint32(32).int32(message.rowsSent);
    }
    if (message.rowsExamined !== 0) {
      writer.uint32(40).int32(message.rowsExamined);
    }
    if (message.sqlText !== "") {
      writer.uint32(50).string(message.sqlText);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SlowQueryDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSlowQueryDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.queryTime = Duration.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.lockTime = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.rowsSent = reader.int32();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.rowsExamined = reader.int32();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.sqlText = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SlowQueryDetails {
    return {
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      queryTime: isSet(object.queryTime) ? Duration.fromJSON(object.queryTime) : undefined,
      lockTime: isSet(object.lockTime) ? Duration.fromJSON(object.lockTime) : undefined,
      rowsSent: isSet(object.rowsSent) ? Number(object.rowsSent) : 0,
      rowsExamined: isSet(object.rowsExamined) ? Number(object.rowsExamined) : 0,
      sqlText: isSet(object.sqlText) ? String(object.sqlText) : "",
    };
  },

  toJSON(message: SlowQueryDetails): unknown {
    const obj: any = {};
    message.startTime !== undefined && (obj.startTime = message.startTime.toISOString());
    message.queryTime !== undefined &&
      (obj.queryTime = message.queryTime ? Duration.toJSON(message.queryTime) : undefined);
    message.lockTime !== undefined && (obj.lockTime = message.lockTime ? Duration.toJSON(message.lockTime) : undefined);
    message.rowsSent !== undefined && (obj.rowsSent = Math.round(message.rowsSent));
    message.rowsExamined !== undefined && (obj.rowsExamined = Math.round(message.rowsExamined));
    message.sqlText !== undefined && (obj.sqlText = message.sqlText);
    return obj;
  },

  create(base?: DeepPartial<SlowQueryDetails>): SlowQueryDetails {
    return SlowQueryDetails.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SlowQueryDetails>): SlowQueryDetails {
    const message = createBaseSlowQueryDetails();
    message.startTime = object.startTime ?? undefined;
    message.queryTime = (object.queryTime !== undefined && object.queryTime !== null)
      ? Duration.fromPartial(object.queryTime)
      : undefined;
    message.lockTime = (object.lockTime !== undefined && object.lockTime !== null)
      ? Duration.fromPartial(object.lockTime)
      : undefined;
    message.rowsSent = object.rowsSent ?? 0;
    message.rowsExamined = object.rowsExamined ?? 0;
    message.sqlText = object.sqlText ?? "";
    return message;
  },
};

export type DatabaseServiceDefinition = typeof DatabaseServiceDefinition;
export const DatabaseServiceDefinition = {
  name: "DatabaseService",
  fullName: "bytebase.v1.DatabaseService",
  methods: {
    getDatabase: {
      name: "GetDatabase",
      requestType: GetDatabaseRequest,
      requestStream: false,
      responseType: Database,
      responseStream: false,
      options: {
        _unknownFields: {
          8410: [new Uint8Array([4, 110, 97, 109, 101])],
          578365826: [
            new Uint8Array([
              51,
              18,
              49,
              47,
              118,
              49,
              47,
              123,
              110,
              97,
              109,
              101,
              61,
              101,
              110,
              118,
              105,
              114,
              111,
              110,
              109,
              101,
              110,
              116,
              115,
              47,
              42,
              47,
              105,
              110,
              115,
              116,
              97,
              110,
              99,
              101,
              115,
              47,
              42,
              47,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              115,
              47,
              42,
              125,
            ]),
          ],
        },
      },
    },
    listDatabases: {
      name: "ListDatabases",
      requestType: ListDatabasesRequest,
      requestStream: false,
      responseType: ListDatabasesResponse,
      responseStream: false,
      options: {
        _unknownFields: {
          8410: [new Uint8Array([0])],
          578365826: [
            new Uint8Array([
              51,
              18,
              49,
              47,
              118,
              49,
              47,
              123,
              112,
              97,
              114,
              101,
              110,
              116,
              61,
              101,
              110,
              118,
              105,
              114,
              111,
              110,
              109,
              101,
              110,
              116,
              115,
              47,
              42,
              47,
              105,
              110,
              115,
              116,
              97,
              110,
              99,
              101,
              115,
              47,
              42,
              125,
              47,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              115,
            ]),
          ],
        },
      },
    },
    updateDatabase: {
      name: "UpdateDatabase",
      requestType: UpdateDatabaseRequest,
      requestStream: false,
      responseType: Database,
      responseStream: false,
      options: {
        _unknownFields: {
          8410: [
            new Uint8Array([
              20,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              44,
              117,
              112,
              100,
              97,
              116,
              101,
              95,
              109,
              97,
              115,
              107,
            ]),
          ],
          578365826: [
            new Uint8Array([
              70,
              58,
              8,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              50,
              58,
              47,
              118,
              49,
              47,
              123,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              46,
              110,
              97,
              109,
              101,
              61,
              101,
              110,
              118,
              105,
              114,
              111,
              110,
              109,
              101,
              110,
              116,
              115,
              47,
              42,
              47,
              105,
              110,
              115,
              116,
              97,
              110,
              99,
              101,
              115,
              47,
              42,
              47,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              115,
              47,
              42,
              125,
            ]),
          ],
        },
      },
    },
    batchUpdateDatabases: {
      name: "BatchUpdateDatabases",
      requestType: BatchUpdateDatabasesRequest,
      requestStream: false,
      responseType: BatchUpdateDatabasesResponse,
      responseStream: false,
      options: {
        _unknownFields: {
          578365826: [
            new Uint8Array([
              66,
              58,
              1,
              42,
              34,
              61,
              47,
              118,
              49,
              47,
              123,
              112,
              97,
              114,
              101,
              110,
              116,
              61,
              101,
              110,
              118,
              105,
              114,
              111,
              110,
              109,
              101,
              110,
              116,
              115,
              47,
              42,
              47,
              105,
              110,
              115,
              116,
              97,
              110,
              99,
              101,
              115,
              47,
              42,
              125,
              47,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              115,
              58,
              98,
              97,
              116,
              99,
              104,
              85,
              112,
              100,
              97,
              116,
              101,
            ]),
          ],
        },
      },
    },
    getDatabaseMetadata: {
      name: "GetDatabaseMetadata",
      requestType: GetDatabaseMetadataRequest,
      requestStream: false,
      responseType: DatabaseMetadata,
      responseStream: false,
      options: {
        _unknownFields: {
          578365826: [
            new Uint8Array([
              60,
              18,
              58,
              47,
              118,
              49,
              47,
              123,
              110,
              97,
              109,
              101,
              61,
              101,
              110,
              118,
              105,
              114,
              111,
              110,
              109,
              101,
              110,
              116,
              115,
              47,
              42,
              47,
              105,
              110,
              115,
              116,
              97,
              110,
              99,
              101,
              115,
              47,
              42,
              47,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              115,
              47,
              42,
              47,
              109,
              101,
              116,
              97,
              100,
              97,
              116,
              97,
              125,
            ]),
          ],
        },
      },
    },
    getDatabaseSchema: {
      name: "GetDatabaseSchema",
      requestType: GetDatabaseSchemaRequest,
      requestStream: false,
      responseType: DatabaseSchema,
      responseStream: false,
      options: {
        _unknownFields: {
          578365826: [
            new Uint8Array([
              58,
              18,
              56,
              47,
              118,
              49,
              47,
              123,
              110,
              97,
              109,
              101,
              61,
              101,
              110,
              118,
              105,
              114,
              111,
              110,
              109,
              101,
              110,
              116,
              115,
              47,
              42,
              47,
              105,
              110,
              115,
              116,
              97,
              110,
              99,
              101,
              115,
              47,
              42,
              47,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              115,
              47,
              42,
              47,
              115,
              99,
              104,
              101,
              109,
              97,
              125,
            ]),
          ],
        },
      },
    },
    getBackupSetting: {
      name: "GetBackupSetting",
      requestType: GetBackupSettingRequest,
      requestStream: false,
      responseType: BackupSetting,
      responseStream: false,
      options: {
        _unknownFields: {
          578365826: [
            new Uint8Array([
              65,
              18,
              63,
              47,
              118,
              49,
              47,
              123,
              110,
              97,
              109,
              101,
              61,
              101,
              110,
              118,
              105,
              114,
              111,
              110,
              109,
              101,
              110,
              116,
              115,
              47,
              42,
              47,
              105,
              110,
              115,
              116,
              97,
              110,
              99,
              101,
              115,
              47,
              42,
              47,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              115,
              47,
              42,
              47,
              98,
              97,
              99,
              107,
              117,
              112,
              83,
              101,
              116,
              116,
              105,
              110,
              103,
              125,
            ]),
          ],
        },
      },
    },
    updateBackupSetting: {
      name: "UpdateBackupSetting",
      requestType: UpdateBackupSettingRequest,
      requestStream: false,
      responseType: BackupSetting,
      responseStream: false,
      options: {
        _unknownFields: {
          578365826: [
            new Uint8Array([
              82,
              58,
              7,
              115,
              101,
              116,
              116,
              105,
              110,
              103,
              50,
              71,
              47,
              118,
              49,
              47,
              123,
              115,
              101,
              116,
              116,
              105,
              110,
              103,
              46,
              110,
              97,
              109,
              101,
              61,
              101,
              110,
              118,
              105,
              114,
              111,
              110,
              109,
              101,
              110,
              116,
              115,
              47,
              42,
              47,
              105,
              110,
              115,
              116,
              97,
              110,
              99,
              101,
              115,
              47,
              42,
              47,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              115,
              47,
              42,
              47,
              98,
              97,
              99,
              107,
              117,
              112,
              83,
              101,
              116,
              116,
              105,
              110,
              103,
              125,
            ]),
          ],
        },
      },
    },
    createBackup: {
      name: "CreateBackup",
      requestType: CreateBackupRequest,
      requestStream: false,
      responseType: Backup,
      responseStream: false,
      options: {
        _unknownFields: {
          578365826: [
            new Uint8Array([
              69,
              58,
              6,
              98,
              97,
              99,
              107,
              117,
              112,
              34,
              59,
              47,
              118,
              49,
              47,
              123,
              112,
              97,
              114,
              101,
              110,
              116,
              61,
              101,
              110,
              118,
              105,
              114,
              111,
              110,
              109,
              101,
              110,
              116,
              115,
              47,
              42,
              47,
              105,
              110,
              115,
              116,
              97,
              110,
              99,
              101,
              115,
              47,
              42,
              47,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              115,
              47,
              42,
              125,
              47,
              98,
              97,
              99,
              107,
              117,
              112,
              115,
            ]),
          ],
        },
      },
    },
    listBackup: {
      name: "ListBackup",
      requestType: ListBackupRequest,
      requestStream: false,
      responseType: ListBackupResponse,
      responseStream: false,
      options: {
        _unknownFields: {
          8410: [new Uint8Array([6, 112, 97, 114, 101, 110, 116])],
          578365826: [
            new Uint8Array([
              61,
              18,
              59,
              47,
              118,
              49,
              47,
              123,
              112,
              97,
              114,
              101,
              110,
              116,
              61,
              101,
              110,
              118,
              105,
              114,
              111,
              110,
              109,
              101,
              110,
              116,
              115,
              47,
              42,
              47,
              105,
              110,
              115,
              116,
              97,
              110,
              99,
              101,
              115,
              47,
              42,
              47,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              115,
              47,
              42,
              125,
              47,
              98,
              97,
              99,
              107,
              117,
              112,
              115,
            ]),
          ],
        },
      },
    },
    listSlowQueries: {
      name: "ListSlowQueries",
      requestType: ListSlowQueriesRequest,
      requestStream: false,
      responseType: ListSlowQueriesResponse,
      responseStream: false,
      options: {
        _unknownFields: {
          8410: [new Uint8Array([6, 112, 97, 114, 101, 110, 116])],
          578365826: [
            new Uint8Array([
              65,
              18,
              63,
              47,
              118,
              49,
              47,
              123,
              112,
              97,
              114,
              101,
              110,
              116,
              61,
              101,
              110,
              118,
              105,
              114,
              111,
              110,
              109,
              101,
              110,
              116,
              115,
              47,
              42,
              47,
              105,
              110,
              115,
              116,
              97,
              110,
              99,
              101,
              115,
              47,
              42,
              47,
              100,
              97,
              116,
              97,
              98,
              97,
              115,
              101,
              115,
              47,
              42,
              125,
              47,
              115,
              108,
              111,
              119,
              81,
              117,
              101,
              114,
              105,
              101,
              115,
            ]),
          ],
        },
      },
    },
  },
} as const;

export interface DatabaseServiceImplementation<CallContextExt = {}> {
  getDatabase(request: GetDatabaseRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Database>>;
  listDatabases(
    request: ListDatabasesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ListDatabasesResponse>>;
  updateDatabase(request: UpdateDatabaseRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Database>>;
  batchUpdateDatabases(
    request: BatchUpdateDatabasesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BatchUpdateDatabasesResponse>>;
  getDatabaseMetadata(
    request: GetDatabaseMetadataRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<DatabaseMetadata>>;
  getDatabaseSchema(
    request: GetDatabaseSchemaRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<DatabaseSchema>>;
  getBackupSetting(
    request: GetBackupSettingRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BackupSetting>>;
  updateBackupSetting(
    request: UpdateBackupSettingRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BackupSetting>>;
  createBackup(request: CreateBackupRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Backup>>;
  listBackup(
    request: ListBackupRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ListBackupResponse>>;
  listSlowQueries(
    request: ListSlowQueriesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ListSlowQueriesResponse>>;
}

export interface DatabaseServiceClient<CallOptionsExt = {}> {
  getDatabase(request: DeepPartial<GetDatabaseRequest>, options?: CallOptions & CallOptionsExt): Promise<Database>;
  listDatabases(
    request: DeepPartial<ListDatabasesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ListDatabasesResponse>;
  updateDatabase(
    request: DeepPartial<UpdateDatabaseRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Database>;
  batchUpdateDatabases(
    request: DeepPartial<BatchUpdateDatabasesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BatchUpdateDatabasesResponse>;
  getDatabaseMetadata(
    request: DeepPartial<GetDatabaseMetadataRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<DatabaseMetadata>;
  getDatabaseSchema(
    request: DeepPartial<GetDatabaseSchemaRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<DatabaseSchema>;
  getBackupSetting(
    request: DeepPartial<GetBackupSettingRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BackupSetting>;
  updateBackupSetting(
    request: DeepPartial<UpdateBackupSettingRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BackupSetting>;
  createBackup(request: DeepPartial<CreateBackupRequest>, options?: CallOptions & CallOptionsExt): Promise<Backup>;
  listBackup(
    request: DeepPartial<ListBackupRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ListBackupResponse>;
  listSlowQueries(
    request: DeepPartial<ListSlowQueriesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ListSlowQueriesResponse>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
