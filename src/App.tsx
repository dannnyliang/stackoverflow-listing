import { Container, VStack } from "@chakra-ui/react";

import QuestionList from "./components/QuestionList";
import TrendingTagList from "./components/TrendingTagList";

function App() {
  return (
    <Container maxW="container.md">
      <VStack spacing={8} align="start">
        <TrendingTagList />
        <QuestionList />
      </VStack>
    </Container>
  );
}

export default App;
