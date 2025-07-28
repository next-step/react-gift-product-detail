import { loginSchema, type LoginFormData } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useLoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const { watch } = form;
  const watchedValues = watch();

  const isFormValid = (() => {
    try {
      loginSchema.parse(watchedValues);
      return true;
    } catch {
      return false;
    }
  })();

  return {
    ...form,
    isFormValid,
  };
};
