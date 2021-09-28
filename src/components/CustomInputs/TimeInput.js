import { useInput, required } from "react-admin";
import { TimePicker } from "@material-ui/pickers";

const TimeInput = (props) => {
  const inpProps = { ...props, name: props.source };
  const {
    input: { name, onChange, ...rest },
    meta: { touched, error },
    isRequired,
  } = useInput(inpProps);
  return (
    <TimePicker
      autoOk
      variant="inline"
      name={name}
      label={props.label}
      validate={required()}
      onChange={onChange}
      error={!!(touched && error)}
      helperText={touched && error}
      required={isRequired}
      {...props}
      {...rest}
    />
  );
};

export default TimeInput;
