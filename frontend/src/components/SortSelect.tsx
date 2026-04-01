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
      bg="white"
      borderColor="gray.200"
      focusBorderColor="purple.500"
      _hover={{ borderColor: "gray.300" }}
      onChange={(e) => onChange(e.target.value as SortOption)}
    >
      <option value="updated">Últimos atualizados</option>
      <option value="stargazers">Mais estrelas</option>
      <option value="name">Ordem alfabética</option>
    </Select>
  );
}