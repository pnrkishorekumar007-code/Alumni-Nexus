"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface FilterOption {
  key: string;
  label: string;
  options: string[];
}

interface AdvancedFiltersProps {
  filters: FilterOption[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  className?: string;
}

export function AdvancedFilters({ filters, values, onChange, onClear, className }: AdvancedFiltersProps) {
  const [expanded, setExpanded] = useState(false);
  const activeCount = Object.values(values).filter(Boolean).length;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={() => setExpanded(!expanded)}>
          Filters {activeCount > 0 && `(${activeCount})`}
        </Button>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="gap-1 text-muted-foreground">
            <X className="h-3 w-3" /> Clear all
          </Button>
        )}
        {Object.entries(values).filter(([, v]) => v).map(([key, value]) => {
          const filter = filters.find((f) => f.key === key);
          return (
            <Badge key={key} variant="secondary" className="gap-1">
              {filter?.label}: {value}
              <button onClick={() => onChange(key, "")} className="ml-1 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          );
        })}
      </div>

      {expanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 rounded-xl border bg-muted/30">
          {filters.map((filter) => (
            <div key={filter.key} className="space-y-2">
              <Label className="text-xs">{filter.label}</Label>
              <Select value={values[filter.key] ?? ""} onValueChange={(v) => onChange(filter.key, v === "all" ? "" : v)}>
                <SelectTrigger>
                  <SelectValue placeholder={`All ${filter.label}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {filter.label}</SelectItem>
                  {filter.options.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
