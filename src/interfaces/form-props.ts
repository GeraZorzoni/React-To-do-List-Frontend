export interface FormProps {
  onSubmit: (task: { title: string; description: string }) => void;
  initialValues?: { title: string; description: string };
}
