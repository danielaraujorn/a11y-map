export type PaginationType = {
  offset?: number;
  limit?: number;
  inserted_at?: string;
  inserted_at_start?: string;
  inserted_at_end?: string;
  sort?: 'inserted_at' | 'asc';
};

export type ErrorType = {
  toJSON: () => { status: number };
};
