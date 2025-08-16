import { toast } from 'sonner';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      description: 'Operation completed successfully',
    });
  },
  
  error: (message: string) => {
    toast.error(message, {
      description: 'Something went wrong. Please try again.',
    });
  },
  
  warning: (message: string) => {
    toast.warning(message, {
      description: 'Please check your input and try again.',
    });
  },
  
  info: (message: string) => {
    toast.info(message, {
      description: 'Here\'s some information for you.',
    });
  },
  
  loading: (message: string) => {
    return toast.loading(message, {
      description: 'Please wait...',
    });
  },
  
  dismiss: (toastId: string | number) => {
    toast.dismiss(toastId);
  }
};
