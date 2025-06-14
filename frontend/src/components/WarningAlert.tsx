import { Alert, type SxProps } from "@mui/material";

type WarningAlertProps = {
  message: string;
  sx?: SxProps;
};

function WarningAlert({ message, sx }: WarningAlertProps) {
  return (
    <Alert
      severity="warning"
      sx={{ ...sx, position: "fixed", bottom: 40, right: 40 }}
    >
      {message}
    </Alert>
  );
}

export default WarningAlert;
