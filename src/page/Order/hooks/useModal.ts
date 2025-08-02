import type { OrderInfoValues } from '@/types';
import { useFieldArray, useForm } from 'react-hook-form';

interface UseModalProps {
  receiverInfos: OrderInfoValues['receiverInfos'];
  onSubmit: (value: OrderInfoValues['receiverInfos']) => void;
  onClose: () => void;
}

const useModal = ({ receiverInfos, onSubmit, onClose }: UseModalProps) => {
  const receiverInfosForm = useForm<OrderInfoValues>({
    defaultValues: {
      receiverInfos: receiverInfos,
    },
  });

  const receiverInfoArray = useFieldArray({
    control: receiverInfosForm.control,
    name: 'receiverInfos',
  });

  const submit = async () => {
    const isValid = await receiverInfosForm.trigger();
    if (isValid) {
      const receiverInfos = receiverInfosForm.getValues('receiverInfos');
      onSubmit(receiverInfos);
      onClose();
    }
  };

  return { receiverInfosForm, receiverInfoArray, submit };
};
export default useModal;
