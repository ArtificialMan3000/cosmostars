export type ErrorResponse = {
  reason: string;
};

export enum RequestStatus {
  OK = 200,
}
export enum HTTPMethods {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
  PATCH = 'patch',
}

export enum Tags {
  LEADERBOARD = 'Leaderboard',
  USER = 'User',
  FORUM = 'Forum',
}

export enum InternalTags {
  TOPICS = 'Topics',
  COMMENTS = 'Comments',
  THEME = 'Theme',
}
