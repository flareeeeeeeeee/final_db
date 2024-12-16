import { FormikValues } from "formik";
import clsx from "clsx";
import axios from "axios";
import { KTIcon } from "../KTIcon";
import { useField } from "formik";
import Select, { components } from "react-select";
import { useEffect } from "react";
type option = { name: string; id: string }

type Props = {
  form: FormikValues;
  name: string;
  type?: string;
  placeholder?: string;
  source?: string;
  options: option[];
  optionsFilter?: Function;
  parent?: string;
  createOnScreen?: boolean;
  onChange?: Function;
  value?: string;
};

const defaultOption = { label: "Seleccione una opcion", value: "" };

export default function Field({
  form,
  name,
  placeholder = name,
  options = [],
  optionsFilter,
  onChange,
  value
}: Props) {
  const [field, _meta, _form] = useField({ name });


  useEffect(() => {
    if (value !== undefined) {
      _form.setValue(value);
    }
  }, [value]);


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



  const getOptions = (datalist: option[]) => {
    return [...datalist].filter((item: any) => {
      if (typeof optionsFilter === "function") {
        return optionsFilter(item);
      }
      return true;
    })
      .map((opt: any) => ({
        label: opt.name,
        value: opt.id,
      }));
  };
  const getValue = (value?: string) => {
    const _options = getOptions(options);
    if (_options && value) {
      return _options.find((option: any) => String(option.value) === String(value));
    } else if (_options) {
      return _options.find((option: any) => String(option.value) === String(field.value));
    } else {
      return "";
    }
  };
  return (
    <>
      <Select
        isSearchable
        value={getValue() || defaultOption}
        classNames={{
          control: () => clsx("form-control form-control-solid p-1"),
          container: () => "p-0 b-0",
        }}
        onChange={(opt: any) => {
          _form.setValue(opt.value);
          if (typeof onChange === "function") {
            onChange(name, opt.value);
          }
        }}
        onBlur={() => {
          if (!field.value) {
            form.setFieldError(name, "Campo obligatorio");
          }
          form.setFieldTouched(name);
        }}
        placeholder={placeholder}
        components={{ MenuList }}
        options={[defaultOption, ...getOptions(options)]}
      />

      {form.touched[name] && form.errors[name] && (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block">
            <span role="alert">{form.errors[name]}</span>
          </div>
        </div>
      )}
    </>
  );
}
