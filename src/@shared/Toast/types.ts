export type ToastItemStatus = 'added' | 'removed';

export type TypeOptions = 'info' | 'success' | 'warning';

export type ToastPos =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

export type ToastItem = {
  message: string;
  id: number;
  typeOption?: TypeOptions;
  delay?: number | null;
  status?: ToastItemStatus;
};

export type Listener = React.Dispatch<React.SetStateAction<ToastItem[]>>;
