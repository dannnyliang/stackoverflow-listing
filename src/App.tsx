import { Container, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

import QuestionList from "./components/QuestionList";
import SearchInput from "./components/SearchInput";
import TrendingTagList from "./components/TrendingTagList";
import { useAppDispatch } from "./hooks";
import { fetchTagAndQuestionStart } from "./redux/reducer/tag";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTagAndQuestionStart({ tag: { pageSize: 10 } }));
  }, [dispatch]);

  return (
    <Container
      maxW={{ lg: "container.lg", md: "container.md", sm: "container.sm" }}
    >
      <VStack spacing={8} mt={8} align="stretch">
        <SearchInput />
        <TrendingTagList />
        <QuestionList />
      </VStack>
    </Container>
  );
}

export default App;
