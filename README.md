# Etapa 1

## Passo 1

bash
```bash
node -v
npm -v
npx -v

git init
git commit --allow-empty -m "chore: initial commit"
```

## Passo 2

bash
```bash
npx create-vite@latest frontend --template react-ts --no-interactive
npx create-vite@9.0.3 frontend --template react-ts --no-interactive

git add .
git commit -m "chore: init project with vite and typescript"
```

## Passo 3

bash
```bash
cd frontend
npm install
npm run dev

git add .
git commit -m "chore: install dependencies and lock versions"
```

## Passo 4

src/App.tsx
```tsx
function App() {
  return <h1>Github Explorer</h1>;
}

export default App;
```

bash
```sh
git add .
git commit -m "chore: clean initial vite template"
```

## Passo 5

bash
```bash
npm install @chakra-ui/react@2 @emotion/react @emotion/styled framer-motion
npm install react-router-dom
npm install i18next react-i18next
npm install axios
npm install zod

git add .
git commit -m "chore: install core dependencies"
```

## Passo 6

src/providers/chakra-provider.tsx
```tsx
import { ChakraProvider } from "@chakra-ui/react";

export function ChakraProviderApp({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
```

src/main.tsx
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProviderApp } from "./providers/chakra-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProviderApp>
      <App />
    </ChakraProviderApp>
  </React.StrictMode>
);
```

bash
```bash
git add .
git commit -m "chore: setup chakra ui provider"
```

# Etapa 2

## Passo 1

src/routes/index.tsx
```tsx
import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile/:username",
    element: <Profile />,
  },
]);
```

src/pages/Home/index.tsx
```tsx
export function Home() {
  return <h1>Home</h1>;
}
```

src/pages/Profile/index.tsx
```tsx
export function Profile() {
  return <h1>Profile</h1>;
}
```

main.tsx
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ChakraProviderApp } from "./providers/chakra-provider";
import { router } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProviderApp>
      <RouterProvider router={router} />
    </ChakraProviderApp>
  </React.StrictMode>
);
```

bash
```bash
git add .
git commit -m "chore: configure react router with home and profile routes"
```

## Passo 2

src/i18n/index.ts
```tsx
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        search: "Search",
      },
    },
    pt: {
      translation: {
        search: "Buscar",
      },
    },
  },
  lng: "pt",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

src/main.tsx
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./i18n";
import { ChakraProviderApp } from "./providers/chakra-provider";
import { router } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProviderApp>
      <RouterProvider router={router} />
    </ChakraProviderApp>
  </React.StrictMode>
);
```

bash
```bash
git add .
git commit -m "chore: setup i18n configuration"
```

## Passo 3

src/services/api.ts
```ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.github.com",
});
```

bash
```bash
git add .
git commit -m "chore: setup axios instance for github api"
```

## Passo 4

src/schemas/user.schema.ts
```ts
import { z } from "zod";

export const userSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  avatar_url: z.string(),
});
```

bash
```bash
git add .
git commit -m "chore: add initial user schema with zod"
```

# Etapa 3

## Passo 1

src/pages/Home/index.tsx
```tsx
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
```

bash
```bash
git add .
git commit -m "feat: implement home search with navigation and basic UX improvements"
```

# Etapa 4

## Passo 1

src/schemas/user.schema.ts
```ts
import { z } from "zod";

export const userSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  avatar_url: z.string(),
  bio: z.string().nullable(),
  html_url: z.string(),
  twitter_username: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;
```

bash
```bash
git add .
git commit -m "chore: extend user schema with github profile fields"
```

## Passo 2

src/hooks/useUser.ts
```tsx
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { userSchema } from "../schemas/user.schema";
import type { User } from "../schemas/user.schema";

export function useUser(username?: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(false);

        const response = await api.get(`/users/${username}`);
        const parsed = userSchema.parse(response.data);

        setUser(parsed);
      } catch {
        setError(true);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchUser();
    }
  }, [username]);

  return { user, loading, error };
}
```

bash
```bash
git add .
git commit -m "feat: create useUser hook to fetch github user data"
```

## Passo 3

src/pages/Profile/index.tsx
```tsx
import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  VStack,
  Link,
  Spinner,
  Center,
} from "@chakra-ui/react";

import { useUser } from "../../hooks/useUser";

export function Profile() {
  const { username } = useParams();

  const { user, loading, error } = useUser(username);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }


  if (error || !user) {
    return (
      <Center height="100vh">
        <Text fontSize="lg" color="red.500">
          Usuário não encontrado
        </Text>
      </Center>
    );
  }

  return (
    <Box p={6}>
      <VStack spacing={4}>
        <Image
          src={user.avatar_url}
          boxSize="120px"
          borderRadius="full"
        />

        <Text fontSize="xl" fontWeight="bold">
          {user.name ?? user.login}
        </Text>

        {user.bio && <Text>{user.bio}</Text>}

        <Link href={user.html_url} color="blue.500" isExternal>
          Ver no GitHub
        </Link>

        {user.twitter_username && (
          <Text>@{user.twitter_username}</Text>
        )}
      </VStack>
    </Box>
  );
}
```

bash
```bash
git add .
git commit -m "feat: display github user profile with loading and error states"
```

# Etapa 5

## Passo 1

src/schemas/repo.schema.ts
```ts
import { z } from "zod";

export const repoSchema = z.object({
  id: z.number(),
  name: z.string(),
  html_url: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  updated_at: z.string(),
});

export type Repo = z.infer<typeof repoSchema>;
```

bash
```bash
git add .
git commit -m "chore: add repository schema with zod"
```

## Passo 2

src/hooks/useRepos.ts
```ts
import { useState, useEffect } from "react";
import { api } from "../services/api";
import { repoSchema } from "../schemas/repo.schema";
import type { Repo } from "../schemas/repo.schema";

export type SortOption = "updated" | "stargazers" | "name";

export function useRepos(username?: string, sort: SortOption = "updated") {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const perPage = 10;

  useEffect(() => {
    setRepos([]);
    setPage(1);
    setHasMore(true);
  }, [username, sort]);

  useEffect(() => {
    if (!username || !hasMore) return;

    const fetchRepos = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/${username}/repos`, {
          params: {
            page,
            per_page: perPage,
            sort: sort === "updated" ? "updated" : "full_name",
            direction: sort === "stargazers" ? "desc" : "asc",
          },
        });

        const data = repoSchema.array().parse(response.data);
        
        if (sort === "stargazers") {
          data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        }

        setRepos((prev) => [...prev, ...data]);
        if (data.length < perPage) setHasMore(false);
      } catch (err) {
        console.error(err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, page, sort, hasMore]);

  const loadMore = () => {
    if (!loading && hasMore) setPage((prev) => prev + 1);
  };

  return { repos, loading, hasMore, loadMore };
}
```

bash
```bash
git add .
git commit -m "feat: create useRepos hook with pagination and infinite scroll"
```

## Passo 3

src/components/RepoList.tsx
```tsx
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import type { Repo } from "../schemas/repo.schema";
import { useRef, useCallback } from "react";

interface RepoListProps {
  repos: Repo[];
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

export function RepoList({ repos, loadMore, hasMore, loading }: RepoListProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastRepoRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  return (
    <VStack spacing={4} align="stretch">
      {repos.map((repo, index) => {
        if (index === repos.length - 1) {
          return (
            <Box
              key={repo.id}
              ref={lastRepoRef}
              p={4}
              borderWidth={1}
              borderRadius="md"
            >
              <Text fontWeight="bold">{repo.name}</Text>
              <Text fontSize="sm">{repo.description}</Text>
            </Box>
          );
        }

        return (
          <Box key={repo.id} p={4} borderWidth={1} borderRadius="md">
            <Text fontWeight="bold">{repo.name}</Text>
            <Text fontSize="sm">{repo.description}</Text>
          </Box>
        );
      })}

      {loading && (
        <Box textAlign="center" p={4}>
          <Spinner />
        </Box>
      )}

      {!hasMore && !loading && repos.length > 0 && (
        <Text textAlign="center" color="gray.500">
          Todos os repositórios foram carregados.
        </Text>
      )}
    </VStack>
  );
}
```

bash
```bash
git add .
git commit -m "feat: create RepoList component with infinite scroll"
```

## Passo 4

src/pages/Profile/index.tsx
```tsx
import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  VStack,
  Link,
  Spinner,
  Center,
  Heading,
  Select,
} from "@chakra-ui/react";

import { useUser } from "../../hooks/useUser";
import { useRepos } from "../../hooks/useRepos";
import { RepoList } from "../../components/RepoList";

type SortOption = "updated" | "stargazers" | "name";

export function Profile() {
  const { username } = useParams<{ username: string }>();

  const { user, loading: userLoading, error } = useUser(username);

  const [sort, setSort] = React.useState<SortOption>("updated");

  const { repos, loadMore, hasMore, loading: reposLoading } = useRepos(
    username,
    sort
  );

  if (userLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error || !user) {
    return (
      <Center height="100vh">
        <Text fontSize="lg" color="red.500">
          Usuário não encontrado
        </Text>
      </Center>
    );
  }

  return (
    <Box p={6}>
      <VStack spacing={4} align="center">
        <Image src={user.avatar_url} boxSize="120px" borderRadius="full" />

        <Text fontSize="xl" fontWeight="bold">
          {user.name ?? user.login}
        </Text>

        {user.bio && <Text>{user.bio}</Text>}

        <Link href={user.html_url} color="blue.500" isExternal>
          Ver no GitHub
        </Link>

        {user.twitter_username && <Text>@{user.twitter_username}</Text>}
      </VStack>

      <Box mt={8}>
        <Heading size="lg" mb={4}>
          Repositórios
        </Heading>

        <Select
          mb={4}
          maxW="200px"
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as SortOption)
          }
        >
          <option value="updated">Últimos atualizados</option>
          <option value="stargazers">Mais estrelas</option>
          <option value="name">Ordem alfabética</option>
        </Select>

        <RepoList
          repos={repos}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={reposLoading}
        />
      </Box>
    </Box>
  );
}
```

bash
```bash
git add .
git commit -m "feat: implement Profile page with RepoList, sorting and infinite scroll"
```

# Etapa 6

## Passo 1

src/hooks/useRepos.ts
```ts
import { useState, useEffect } from "react";
import { api } from "../services/api";
import { repoSchema } from "../schemas/repo.schema";
import type { Repo } from "../schemas/repo.schema";

export type SortOption = "updated" | "stargazers" | "name";

export function useRepos(username?: string, sort: SortOption = "updated") {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const perPage = 10;

  useEffect(() => {
    setRepos([]);
    setPage(1);
    setHasMore(true);
  }, [username, sort]);

  useEffect(() => {
    if (!username || loading || !hasMore) return;

    const fetchRepos = async () => {
      setLoading(true);

      try {
        const response = await api.get(`/users/${username}/repos`, {
          params: {
            page,
            per_page: perPage,
          },
        });

        const data = repoSchema.array().parse(response.data);

        if (data.length < perPage) {
          setHasMore(false);
        }

        setRepos((prev) => {
          const merged = [...prev, ...data];

          if (sort === "stargazers") {
            return merged.sort(
              (a, b) => b.stargazers_count - a.stargazers_count
            );
          }

          if (sort === "name") {
            return merged.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
          }

          return merged.sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          );
        });
      } catch (err) {
        console.error(err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, page, sort]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return { repos, loading, hasMore, loadMore };
}
```

```tsx
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import type { Repo } from "../schemas/repo.schema";
import { useRef, useCallback } from "react";

interface RepoListProps {
  repos: Repo[];
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

export function RepoList({
  repos,
  loadMore,
  hasMore,
  loading,
}: RepoListProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastRepoRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  return (
    <VStack spacing={4} align="stretch">
      {repos.map((repo, index) => {
        const isLast = index === repos.length - 1;

        return (
          <Box
            key={repo.id}
            ref={isLast ? lastRepoRef : undefined}
            p={4}
            borderWidth={1}
            borderRadius="md"
          >
            <Text fontWeight="bold">{repo.name}</Text>

            <Text fontSize="sm">
              {repo.description ?? "Sem descrição"}
            </Text>
          </Box>
        );
      })}

      {loading && (
        <Box textAlign="center" p={4}>
          <Spinner />
        </Box>
      )}

      {!hasMore && !loading && repos.length > 0 && (
        <Text textAlign="center" color="gray.500">
          Todos os repositórios foram carregados.
        </Text>
      )}
    </VStack>
  );
}
```

bash
```bash
git add .
git commit -m "fix: correct pagination and global sorting in repos with infinite scroll"
```

## Passo 2

src/components/SortSelect.tsx
```tsx
import { Select } from "@chakra-ui/react";

export type SortOption = "updated" | "stargazers" | "name";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select
      maxW="200px"
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
    >
      <option value="updated">Últimos atualizados</option>
      <option value="stargazers">Mais estrelas</option>
      <option value="name">Ordem alfabética</option>
    </Select>
  );
}
```

bash
```bash
git add .
git commit -m "feat: create SortSelect component for repo ordering"
```

## Passo 3

src/pages/Profile/index.tsx
```tsx
import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  VStack,
  Link,
  Spinner,
  Center,
  Heading,
} from "@chakra-ui/react";

import { useUser } from "../../hooks/useUser";
import { useRepos } from "../../hooks/useRepos";
import { RepoList } from "../../components/RepoList";
import { SortSelect } from "../../components/SortSelect";

type SortOption = "updated" | "stargazers" | "name";

export function Profile() {
  const { username } = useParams<{ username: string }>();

  const { user, loading: userLoading, error } = useUser(username);

  const [sort, setSort] = React.useState<SortOption>("updated");

  const { repos, loadMore, hasMore, loading: reposLoading } = useRepos(
    username,
    sort
  );

  if (userLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error || !user) {
    return (
      <Center height="100vh">
        <Text fontSize="lg" color="red.500">
          Usuário não encontrado
        </Text>
      </Center>
    );
  }

  return (
    <Box p={6}>
      <VStack spacing={4} align="center">
        <Image src={user.avatar_url} boxSize="120px" borderRadius="full" />

        <Text fontSize="xl" fontWeight="bold">
          {user.name ?? user.login}
        </Text>

        {user.bio && <Text>{user.bio}</Text>}

        <Link href={user.html_url} color="blue.500" isExternal>
          Ver no GitHub
        </Link>

        {user.twitter_username && <Text>@{user.twitter_username}</Text>}
      </VStack>

      <Box mt={8}>
        <Heading size="lg" mb={4}>
          Repositórios
        </Heading>

        {/* 👇 NOVO COMPONENTE */}
        <SortSelect value={sort} onChange={setSort} />

        <RepoList
          repos={repos}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={reposLoading}
        />
      </Box>
    </Box>
  );
}
```

bash
```bash
git add .
git commit -m "refactor: extract sorting select into SortSelect component"
```

# Etapa 7

## Passo 1

src/pages/Profile/index.tsx
```tsx
import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  Link,
  Spinner,
  Center,
  Heading,
  Avatar,
  Flex,
} from "@chakra-ui/react";

import { useUser } from "../../hooks/useUser";
import { useRepos } from "../../hooks/useRepos";
import { RepoList } from "../../components/RepoList";
import { SortSelect } from "../../components/SortSelect";

type SortOption = "updated" | "stargazers" | "name";

export function Profile() {
  const { username } = useParams<{ username: string }>();

  const { user, loading: userLoading, error } = useUser(username);

  const [sort, setSort] = React.useState<SortOption>("updated");

  const { repos, loadMore, hasMore, loading: reposLoading } = useRepos(
    username,
    sort
  );

  if (userLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error || !user) {
    return (
      <Center h="100vh">
        <Text fontSize="lg" color="red.500">
          Usuário não encontrado
        </Text>
      </Center>
    );
  }

  return (
    <Box p={4} maxW="900px" mx="auto">
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        gap={6}
      >
        <Avatar src={user.avatar_url} size="xl" />

        <VStack align="start" spacing={2}>
          <Text fontSize="2xl" fontWeight="bold">
            {user.name ?? user.login}
          </Text>

          {user.bio && <Text>{user.bio}</Text>}

          <Link href={user.html_url} color="blue.500" isExternal>
            Ver no GitHub
          </Link>

          {user.twitter_username && (
            <Text fontSize="sm">@{user.twitter_username}</Text>
          )}
        </VStack>
      </Flex>

      <Box mt={8}>
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <Heading size="lg">Repositórios</Heading>

          <SortSelect value={sort} onChange={setSort} />
        </Flex>

        <RepoList
          repos={repos}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={reposLoading}
        />
      </Box>
    </Box>
  );
}
```

bash
```bash
git add .
git commit -m "feat: improve profile responsiveness and layout"
```


## Passo 2

src/i18n/index.ts
```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        search: "Search",
        repositories: "Repositories",
        notFound: "User not found",
        viewGithub: "View on GitHub",
      },
    },
    pt: {
      translation: {
        search: "Buscar",
        repositories: "Repositórios",
        notFound: "Usuário não encontrado",
        viewGithub: "Ver no GitHub",
      },
    },
  },
  lng: "pt",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

bash
```bash
git add .
git commit -m "feat: expand i18n translations"
```

## Passo 3

src/pages/Profile/index.tsx
```tsx
import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  Link,
  Spinner,
  Center,
  Heading,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useUser } from "../../hooks/useUser";
import { useRepos } from "../../hooks/useRepos";
import { RepoList } from "../../components/RepoList";
import { SortSelect } from "../../components/SortSelect";

type SortOption = "updated" | "stargazers" | "name";

export function Profile() {
  const { username } = useParams<{ username: string }>();
  const { t } = useTranslation();

  const { user, loading: userLoading, error } = useUser(username);

  const [sort, setSort] = React.useState<SortOption>("updated");

  const { repos, loadMore, hasMore, loading: reposLoading } = useRepos(
    username,
    sort
  );

  if (userLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error || !user) {
    return (
      <Center h="100vh">
        <Text fontSize="lg" color="red.500">
          {t("notFound")}
        </Text>
      </Center>
    );
  }

  return (
    <Box p={4} maxW="900px" mx="auto">
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        gap={6}
      >
        <Avatar src={user.avatar_url} size="xl" />

        <VStack align="start" spacing={2}>
          <Text fontSize="2xl" fontWeight="bold">
            {user.name ?? user.login}
          </Text>

          {user.bio && <Text>{user.bio}</Text>}

          <Link href={user.html_url} color="blue.500" isExternal>
            {t("viewGithub")}
          </Link>

          {user.twitter_username && (
            <Text fontSize="sm">@{user.twitter_username}</Text>
          )}
        </VStack>
      </Flex>

      <Box mt={8}>
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <Heading size="lg">{t("repositories")}</Heading>

          <SortSelect value={sort} onChange={setSort} />
        </Flex>

        <RepoList
          repos={repos}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={reposLoading}
        />
      </Box>
    </Box>
  );
}
```

bash
```bash
git add .
git commit -m "feat: finalize profile page with responsiveness and i18n"
```

# Roteiro

🧠 🗺️ VISÃO MACRO DO DESAFIO

Você precisa construir basicamente:

👉 Uma aplicação React que:

Busca usuário no GitHub
Mostra perfil
Lista repositórios
Tem scroll infinito
Segue layout (Figma)
Usa boas práticas (Zod, i18n, Chakra UI)
🧩 ESTRUTURA DO PROJETO (DIVIDIDO EM ETAPAS)

Vou quebrar em 7 etapas principais:

🟢 ETAPA 1 — Setup do projeto

Criar base do projeto com tudo configurado:

React (Vite recomendado)
Chakra UI v2
React Router
i18Next
Axios ou fetch
Zod

👉 Resultado esperado:
✔ Projeto rodando
✔ Estrutura inicial pronta

🟢 ETAPA 2 — Roteamento

Criar as rotas obrigatórias:

/ → Home (busca)
/profile/:username → Perfil

👉 Resultado:
✔ Navegação funcionando

🟢 ETAPA 3 — Tela Home (Busca)
Input para digitar username
Botão buscar
Redirecionar para /profile/:username

👉 Tratar:

usuário não encontrado (erro 404)
🟢 ETAPA 4 — Buscar dados do usuário

Consumir API do GitHub:

GET user
Exibir:
nome
foto
bio
link
twitter

👉 Resultado:
✔ Perfil carregando corretamente

🟢 ETAPA 5 — Listar repositórios + scroll infinito

Aqui é a parte MAIS importante:

Buscar repositórios
Paginação (10 por página)
Scroll infinito (carregar mais ao rolar)

👉 Resultado:
✔ Lista crescendo automaticamente

🟢 ETAPA 6 — Ordenação dos repositórios

Criar componente (não vem no Figma):

sort por:
stars
name
updated

👉 Resultado:
✔ Usuário consegue ordenar

🟢 ETAPA 7 — Finalização (diferenciais)
Responsividade (mobile/desktop)
i18n (PT/EN)
Modelagem com Zod
Deploy (Vercel)
🔥 RESUMO DO FLUXO
Usuário entra na Home
Digita username
Vai para perfil
Vê dados
Rola a tela → carrega mais repositórios
🧠 TECNOLOGIAS QUE VOCÊ VAI USAR
React
Chakra UI
React Router
i18Next
Zod
API do GitHub
🎯 COMO VAMOS TRABALHAR

Agora seguimos assim:

👉 Você diz: “vamos começar etapa 1”
Eu te dou:

passo a passo
comandos
código base

👉 Quando terminar:
Você diz: “finalizei etapa 1”

E seguimos pra próxima.