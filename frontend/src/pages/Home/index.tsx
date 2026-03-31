import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleSearch() {
    if (!username.trim()) return;

    navigate(`/profile/${username}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={4} width="300px">
        <Heading size="md">Github Explorer</Heading>

        <Input
          placeholder={t("search")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button
          colorScheme="blue"
          width="100%"
          onClick={handleSearch}
          isDisabled={!username.trim()}
        >
          {t("search")}
        </Button>
      </VStack>
    </Box>
  );
}