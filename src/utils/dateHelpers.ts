import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'HH:mm dd/MM/yyyy', { locale: vi });
  } catch {
    return dateString;
  }
};

export const getDefaultDateRange = () => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  
  return {
    from: format(today, 'yyyy-MM-dd'),
    to: format(nextWeek, 'yyyy-MM-dd')
  };
};