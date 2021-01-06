import { useInput, required } from "react-admin";
import { DatePicker } from "@material-ui/pickers";

const BoundedTextField = (props) => {
  const {
    input: { name, onChange, ...rest },
    meta: { touched, error },
    isRequired,
  } = useInput(props);
  return (
    <DatePicker
      name={name}
      variant="inline"
      disablePast
      autoOk
      format="dd/MM/yyyy"
      label={props.label}
      onChange={onChange}
      error={!!(touched && error)}
      helperText={touched && error}
      animateYearScrolling
      required={isRequired}
      {...rest}
    />
  );
};
const DateInput = (props) => {
  const { source, ...rest } = props;

  return (
    <BoundedTextField
      name={props.name}
      validate={required()}
      label={props.label}
      {...rest}
    />
  );
};
export default DateInput;
