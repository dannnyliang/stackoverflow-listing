import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Spinner,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { isNil } from "ramda";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { FETCH_STATUS, QUESTION_PAGE_SIZE } from "../constant";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMoreQuestionStart } from "../redux/reducer/question";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const { status, error, data } = useAppSelector((state) => state.question);
  const selectedTag = useAppSelector((state) => state.tag.selected);
  const dispatch = useAppDispatch();

  const hasNextPage = data?.has_more ?? false;
  const questionList = data?.items ?? [];
  const isQuestionListEmpty = questionList.length === 0;

  const loading = status === FETCH_STATUS.LOADING;
  const refetchLoading = loading && isQuestionListEmpty;
  const fetchMoreLoading = loading && !isQuestionListEmpty;

  const handleLoadMore = () => {
    const currentPage = Math.ceil(questionList.length / QUESTION_PAGE_SIZE);
    dispatch(
      fetchMoreQuestionStart({
        page: currentPage + 1,
        pageSize: QUESTION_PAGE_SIZE,
        tagged: selectedTag,
      })
    );
  };

  const [sentryRef] = useInfiniteScroll({
    loading: fetchMoreLoading,
    hasNextPage: data?.has_more ?? false,
    onLoadMore: handleLoadMore,
    disabled: !!error,
    rootMargin: "0px 0px 600px 0px",
  });

  if (refetchLoading) {
    return <Spinner />;
  }

  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>
            Error({error.error_id}): {error.error_name}
          </AlertTitle>
          <AlertDescription>{error.error_message}</AlertDescription>
        </Alert>
      )}
      {!loading && isQuestionListEmpty && (
        <Alert status="warning">
          <AlertIcon />
          Can't found any question
        </Alert>
      )}
      <VStack
        pb={4}
        align="start"
        divider={<StackDivider borderColor="gray.200" />}
      >
        {questionList.map((question) => (
          <QuestionItem
            key={question.question_id}
            title={question.title}
            link={question.link}
            score={question.score}
            answerCount={question.answer_count}
            viewCount={question.view_count}
            hasAcceptedAnswer={!isNil(question.accepted_answer_id)}
            owner={question.owner}
          />
        ))}
        {(fetchMoreLoading || hasNextPage) && (
          <Center ref={sentryRef}>
            <Spinner />
          </Center>
        )}
      </VStack>
    </>
  );
}

export default QuestionList;
