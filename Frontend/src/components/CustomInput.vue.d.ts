declare module '@/components/CustomInput.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{
    id: string;
    modelValue: string;
    label: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
  }>
  export default component
} 