import {
  Avatar,
  Center,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

const Title = styled(LinkOverlay)``;
const Wrapper = styled(LinkBox)`
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;
const StyledAnwserCount = styled(Text)<{
  hasAcceptedAnswer: boolean;
  hasAnswer: boolean;
}>`
  ${(props) => props.hasAnswer && "border: 1px solid green;"}
  ${(props) =>
    props.hasAcceptedAnswer &&
    `
    background-color: green;
    color: white;
  `}
`;

type QuestionItemProps = {
  title: string;
  link: string;
  score: number;
  viewCount: number;
  answerCount: number;
  hasAcceptedAnswer: boolean;
  owner: {
    profile_image: string;
    display_name: string;
    link: string;
  };
};

function QuestionItem(props: QuestionItemProps) {
  const {
    title,
    link,
    score,
    answerCount,
    viewCount,
    hasAcceptedAnswer,
    owner,
  } = props;

  return (
    <Wrapper w="100%" px={2} py={4} borderRadius="lg">
      <Flex justifyContent="space-between">
        <Flex direction="column" flex={1}>
          <VStack align="start">
            <Heading size="md">
              <Title href={link} isExternal>
                {title}
              </Title>
            </Heading>
            <Flex justifyContent="space-around" w="100%">
              <Flex direction="column">
                <Text color="red">Score</Text>
                <Text color={score < 0 ? "red" : "default"} textAlign="center">
                  {score}
                </Text>
              </Flex>
              <Flex direction="column">
                <Text color="red">Answers</Text>
                <StyledAnwserCount
                  hasAcceptedAnswer={hasAcceptedAnswer}
                  hasAnswer={answerCount > 0}
                  textAlign="center"
                >
                  {answerCount}
                </StyledAnwserCount>
              </Flex>
              <Flex direction="column">
                <Text color="red">Viewed</Text>
                <Text textAlign="center">{viewCount}</Text>
              </Flex>
            </Flex>
          </VStack>
        </Flex>
        <VStack w="120px">
          <Avatar
            size="lg"
            name={owner.display_name}
            src={owner.profile_image}
          />
          <Center textAlign="center">{owner.display_name}</Center>
        </VStack>
      </Flex>
    </Wrapper>
  );
}

export default QuestionItem;
