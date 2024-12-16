/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  KTIcon,
  useDebounce,
} from "../../../..";

interface SearchProps {
  placeholder?: string;
  onChange: (term: string) => void;
}

const Search = (props: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
        props.onChange(debouncedSearchTerm);
      }
    },
    [debouncedSearchTerm], // Only call effect if debounced search term changes
    // More details about useDebounce: https://usehooks.com/useDebounce/
  );

  return (
    <div className="card-title">
      {/* begin::Search */}
      <div className="d-flex align-items-center position-relative my-1">
        <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6" />
        <input
          type="text"
          data-kt-user-table-filter="search"
          className="form-control form-control-solid w-250px ps-14"
          placeholder={props.placeholder ?? "Buscar"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* end::Search */}
    </div>
  );
};

export { Search };
