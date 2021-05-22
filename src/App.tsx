import { Container, VStack } from "@chakra-ui/react";

import QuestionList from "./components/QuestionList";
import SearchInput from "./components/SearchInput";
import TrendingTagList from "./components/TrendingTagList";

function App() {
  return (
    <Container maxW="container.md">
      <VStack spacing={8} mt={8} align="stretch">
        <SearchInput />
        <TrendingTagList />
        <QuestionList />
      </VStack>
    </Container>
  );
}

export default App;
