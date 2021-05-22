import queryString from "query-string";

export const emptyQuestionData: GetQuestionsData = {
  items: [],
  has_more: false,
};

export type GetQuestionsParm = {
  page?: number;
  pageSize?: number;
  fromdate?: Date;
  todate?: Date;
  min?: Date;
  max?: Date;
  order?: "desc" | "asc";
  sort?: "activity" | "votes" | "creation" | "hot" | "week" | "month";
  tagged?: string;
};

export type GetQuestionsError = {
  error_id: number;
  error_message: string;
  error_name: string;
};

export type GetQuestionsData = {
  items: {
    tags: string[];
    owner: {
      user_id: number;
      profile_image: string;
      display_name: string;
      link: string;
    };
    accepted_answer_id?: number;
    is_answered: boolean;
    view_count: number;
    answer_count: number;
    score: number;
    creation_date: number;
    question_id: number;
    link: string;
    title: string;
  }[];
  has_more: boolean;
};
export type GetQuestionsResponse = GetQuestionsData | GetQuestionsError;

export const getQuestions = (
  parm: GetQuestionsParm
): Promise<GetQuestionsResponse> => {
  const { page, pageSize, fromdate, todate, min, max, order, sort, tagged } =
    parm;

  const url = queryString.stringifyUrl({
    url: "https://api.stackexchange.com/2.2/questions",
    query: {
      page,
      pageSize,
      fromdate: fromdate ? fromdate.getTime() / 1000 : undefined,
      todate: todate ? todate.getTime() / 1000 : undefined,
      min: min ? min.getTime() / 1000 : undefined,
      max: max ? max.getTime() / 1000 : undefined,
      order,
      sort,
      tagged,
      site: "stackoverflow",
    },
  });

  return fetch(url).then((res) => res.json());
};
