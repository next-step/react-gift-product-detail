import { ErrorMessage } from "@/components/Input/FormErrorMessage";

function FormErrorMessage({ errorMessage }: { errorMessage: string }) {
  return <ErrorMessage>{errorMessage}</ErrorMessage>;
}

export default FormErrorMessage;
