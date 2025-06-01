declare module 'vue-ganttastic' {
  import { DefineComponent } from 'vue'
  
  export const VueGanttastic: DefineComponent<{
    items: {
      id: number | string;
      label: string;
      rowId: number | string;
      rowLabel: string;
      start: Date;
      end: Date;
      color?: string;
    }[];
    dates: {
      start: Date;
      end: Date;
    };
    rowHeight?: number;
    gridCellWidth?: number;
    dateFormat?: string;
    gridCellFormat?: string;
  }>
} 