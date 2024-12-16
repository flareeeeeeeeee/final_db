import clsx from "clsx";
import Select, { components } from "react-select";
type Props = {
  onChange: (value: string) => void
  options: Array<{}>;
  placeholder?: string
};

export default function Field({

  options = [],
  placeholder,
  onChange
}: Props) {




  const MenuList = (
    props: any,
  ) => {
    return (
      <div>
        <components.MenuList {...props}>
          {props.children}
        </components.MenuList>
      </div>
    );
  };

  const listOptions = [{ value: "", label: "Todos" }, ...options]

  return (
    <>
      <Select
        isSearchable
        classNames={{
          singleValue: () => clsx("text-gray-700"),
          placeholder: () => clsx("bg-input-placeholder"),
          input: () => clsx("bg-text"),
          control: () => clsx("form-select form-select-solid p-1 w-200px"),
          container: () => "p-0 b-0",
        }}
        onChange={(opt: any) => {
          onChange(opt.value)
        }}
        defaultValue={listOptions[0]}
        placeholder={placeholder || ""}
        components={{ MenuList }}
        options={listOptions}
      />


    </>
  );
}
