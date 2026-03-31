import { ChakraProvider } from "@chakra-ui/react";

export function ChakraProviderApp({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}