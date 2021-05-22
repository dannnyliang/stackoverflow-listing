import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Spinner,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { isNil } from "ramda";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../hooks";
import { FETCH_STATUS } from "../redux/reducer/constant";
import { fetchQuestionStart } from "../redux/reducer/question";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const { status, error, data } = useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestionStart({ pageSize: 20 }));
  }, [dispatch]);

  const questionList = data?.items ?? [];

  if (status === FETCH_STATUS.LOADING) {
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
      <VStack
        spacing={4}
        align="start"
        divider={<StackDivider borderColor="gray.200" />}
      >
        {questionList.map((question) => (
          <QuestionItem
            title={question.title}
            link={question.link}
            score={question.score}
            answerCount={question.answer_count}
            viewCount={question.view_count}
            hasAcceptedAnswer={!isNil(question.accepted_answer_id)}
            owner={question.owner}
          />
        ))}
      </VStack>
    </>
  );
}

export default QuestionList;
