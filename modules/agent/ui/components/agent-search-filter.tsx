import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "../../hooks/use-agent-filters";
import { SearchIcon } from "lucide-react";

const SearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters();

  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 bg-white w-50 pl-7"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <SearchIcon className="absolute left-2 size-4 -translate-y-1/2 text-muted-foreground top-1/2" />
    </div>
  );
};
export default SearchFilter;
