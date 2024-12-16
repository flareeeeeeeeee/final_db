import { FormikValues } from "formik";
import clsx from "clsx";
import { checkStrength } from "./helpers";
type Props = {
  form: FormikValues;
  name: string;
  type?: string;
  placeholder?: string;
  isConfirmation?: boolean;
  disabled?: boolean;
};

export default function Field({
  form,
  name,
  type = "text",
  placeholder = name,
  isConfirmation,
  disabled = false
}: Props) {
  const { value } = form.getFieldProps(name);

  const isValid = form.touched[name] && !form.errors[name];
  const isInvalid = form.touched[name] && form.errors[name];
  const isPassword = type === "password" && !isConfirmation;
  return (
    <div data-kt-password-meter="true">
      <div
        className={clsx({
          "position-relative mb-3": isPassword,
        })}
      >
        <textarea
          placeholder={placeholder}
          {...form.getFieldProps(name)}
          
          type={type}
          name={name}
          value={type === "date" ? value.split("T")[0] : value}
          className={clsx(
            "form-control form-control-solid mb-3 mb-lg-0",
            { "is-invalid": isPassword ? form.touched[name] && checkStrength(value) < 2 : isInvalid },
            { "is-valid": isPassword ? form.touched[name] && checkStrength(value) >= 2 : isValid },
          )}
          autoComplete="off"
          disabled={form.isSubmitting || disabled}
        />
      </div>
      {form.touched[name] && form.errors[name] && (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block">
            <span role="alert">{form.errors[name]}</span>
          </div>
        </div>
      )}
     
    </div>
  );
}
