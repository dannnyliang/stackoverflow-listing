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
import { isEmpty, take } from "ramda";
import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "../hooks";
import { FETCH_STATUS } from "../redux/reducer/constant";
import { fetchTagStart } from "../redux/reducer/tag";

const ClickableTag = styled(Tag)`
  cursor: pointer;
`;

function TrendingTagList() {
  const [selectedTag, setSelectedTag] = useState<string>();
  const { status, error, data } = useAppSelector((state) => state.tag);
  const dispatch = useAppDispatch();

  const handleClickTag = (name: string) => {
    setSelectedTag(name);
  };

  useEffect(() => {
    dispatch(fetchTagStart());
  }, [dispatch]);

  const topTagList = useMemo(() => take(10, data?.items ?? []), [data?.items]);
  const isTagListEmpty = topTagList.length === 0;

  useEffect(() => {
    if (!isEmpty(topTagList)) {
      setSelectedTag(topTagList[0].name);
    }
  }, [topTagList]);

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
        {topTagList.map((tag) => (
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
