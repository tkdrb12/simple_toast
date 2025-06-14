export type ToastItemStatus = 'added' | 'removed';

export type TypeOptions = 'info' | 'success' | 'warning';

export type ToastItem = {
  message: string;
  id: number;
  typeOption?: TypeOptions;
  delay?: number | null;
};

export type Listener = React.Dispatch<React.SetStateAction<ToastItem[]>>;
