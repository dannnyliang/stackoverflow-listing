import queryString from "query-string";

export const emptyTagData: GetTagsData = {
  items: [],
  has_more: false,
};

export type GetTagsParm = {
  page?: number;
  pageSize?: number;
  fromdate?: Date;
  todate?: Date;
  min?: number;
  max?: number;
  order?: "desc" | "asc";
  sort?: "popular" | "activity" | "name";
  inname?: string;
};

export type GetTagsError = {
  error_id: number;
  error_message: string;
  error_name: string;
};

export type GetTagsData = {
  items: {
    has_synonyms: boolean;
    is_moderator_only: boolean;
    is_required: boolean;
    count: number;
    name: string;
  }[];
  has_more: boolean;
};
export type GetTagsResponse = GetTagsData | GetTagsError;

export const getTags = (parm: GetTagsParm): Promise<GetTagsResponse> => {
  const { page, pageSize, fromdate, todate, min, max, order, sort, inname } =
    parm;

  const url = queryString.stringifyUrl({
    url: "https://api.stackexchange.com/2.2/tags",
    query: {
      page,
      pageSize,
      fromdate: fromdate ? fromdate.getTime() / 1000 : undefined,
      todate: todate ? todate.getTime() / 1000 : undefined,
      min,
      max,
      order,
      sort,
      inname,
      site: "stackoverflow",
    },
  });

  return fetch(url).then((res) => res.json());
};
