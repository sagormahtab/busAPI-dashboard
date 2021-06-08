import { useInput, required } from "react-admin";
import { TimePicker } from "@material-ui/pickers";

const BoundedTextField = (props) => {
  const {
    input: { name, onChange, ...rest },
    meta: { touched, error },
    isRequired,
  } = useInput(props);
  return (
    <TimePicker
      autoOk
      variant="inline"
      name={name}
      label={props.label}
      onChange={onChange}
      error={!!(touched && error)}
      helperText={touched && error}
      required={isRequired}
      {...rest}
    />
  );
};
const TimeInput = (props) => {
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
export default TimeInput;
