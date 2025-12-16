"use client";

import { Table } from "@tanstack/react-table";
import { Search as SearchIcon, Filter as FilterIcon, Plus } from "lucide-react"; // Import Plus for eventual "Tambah Member"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  moduleFilter: string;
  setModuleFilter: (filter: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  searchQuery,
  setSearchQuery,
  moduleFilter,
  setModuleFilter,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    searchQuery !== "" ||
    moduleFilter !== "all";

  const modules = [
    { label: "All Modules", value: "all" },
    { label: "Form 1.0", value: "Form 1.0" },
    { label: "KK 1.0", value: "KK 1.0" },
    { label: "KK 2.0", value: "KK 2.0" },
    { label: "KK 3.0", value: "KK 3.0" },
    { label: "KK 4.0", value: "KK 4.0" },
    { label: "KK 5.0", value: "KK 5.0" },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cari member..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select
        value={moduleFilter}
        onValueChange={(value) => {
          setModuleFilter(value);
          if (value === "all") {
            table.getColumn("modules")?.setFilterValue(undefined);
          } else {
            table.getColumn("modules")?.setFilterValue(value);
          }
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Modules" />
        </SelectTrigger>
        <SelectContent>
          {modules.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            <FilterIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {/* Custom display names for columns if needed, similar to tenants */}
                  {column.id === 'name' ? 'Name' :
                   column.id === 'role' ? 'Role' :
                   column.id === 'modules' ? 'Modules' :
                   column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>

      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => {
            setSearchQuery("");
            setModuleFilter("all");
            table.resetColumnFilters();
          }}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          {/* Using Plus icon for consistency with the tenants reset button if it had one */}
          {/* <X className="ml-2 h-4 w-4" /> */}
        </Button>
      )}
      {/* Optionally add a "Tambah Member" button here if needed in the future */}
      {/* <Button className="gap-2">
        <Plus className="h-4 w-4" />
        Tambah Member
      </Button> */}
    </div>
  );
}
