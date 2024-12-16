/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  KTIcon,
} from "../../../..";


type option = { value: string, label: string }
interface SelectoProps {
  placeholder?: string;
  onChange: (term: string) => void;
  options: option[];
}

const Select = (props: SelectoProps) => {
  const defaultOptions = { value: "", label: props.placeholder || "Selecciona una opcion" }

  const [selectTerm, setSelectTerm] = useState<string>(defaultOptions.value);


  return (
    <div className="card-title">
      {/* begin::Search */}
      <div className="d-flex align-items-center position-relative my-1">
        <KTIcon iconName="filter" className="fs-1 position-absolute ms-6" />
        <select
          data-kt-user-table-filter="search"
          className="form-select form-select-solid w-250px ps-14"
          value={selectTerm}
          onChange={(e) => {
            setSelectTerm(e.target.value)
            props.onChange(e.target.value)
          }}
        >
          {[defaultOptions, ...props.options].map((option) => {
            return <option key={option.value} value={option.value}>{option.label}</option>
          })}

        </select>
      </div>
      {/* end::Search */}
    </div>
  );
};

export { Select };
