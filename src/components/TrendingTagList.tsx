import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Heading,
  Spinner,
  Tag,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useCallback } from "react";

import { FETCH_STATUS } from "../constant";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectTag } from "../redux/reducer/tag";

const ClickableTag = styled(Tag)`
  cursor: pointer;
`;

function TrendingTagList() {
  const {
    selected: selectedTag,
    status,
    error,
    data,
  } = useAppSelector((state) => state.tag);
  const dispatch = useAppDispatch();

  const handleClickTag = useCallback(
    (name: string) => dispatch(selectTag(name)),
    [dispatch]
  );

  const tagList = data?.items ?? [];
  const isTagListEmpty = tagList.length === 0;

  if (status === FETCH_STATUS.LOADING) {
    return (
      <VStack align="start" spacing={4}>
        <Heading size="md">Trending</Heading>
        <Spinner />
      </VStack>
    );
  }

  return (
    <VStack align="start" spacing={4}>
      <Heading size="md">Trending</Heading>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>
            Error({error.error_id}): {error.error_name}
          </AlertTitle>
          <AlertDescription>{error.error_message}</AlertDescription>
        </Alert>
      )}
      {isTagListEmpty && (
        <Alert status="warning">
          <AlertIcon />
          Can't found related tags
        </Alert>
      )}
      <Wrap>
        {tagList.map((tag) => (
          <WrapItem key={tag.name}>
            <ClickableTag
              size="lg"
              colorScheme="teal"
              variant={selectedTag === tag.name ? "solid" : "outline"}
              onClick={() => handleClickTag(tag.name)}
            >
              {tag.name}
            </ClickableTag>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  );
}

export default TrendingTagList;
