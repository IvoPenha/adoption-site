// import MonthPickerInput from "react-month-picker-input";
// import React, {
//   ChangeEventHandler,
//   FormEvent,
//   useEffect,
//   useState,
// } from "react";
// import { Input } from "@chakra-ui/react";

// function getFirstAndLastDayOfYearMonths(
//   month: number
// ): { firstDayOfPreviousMonth: string; lastDayOfNextMonth: string } | null {
//   // Validação do mês (deve estar entre 1 e 12)
//   if (month < 1 || month > 12) {
//     console.error("Mês inválido. Forneça um mês entre 1 e 12.");
//     return null;
//   }

//   // Obtém o ano atual
//   const currentYear = new Date().getFullYear();

//   // Calcula o primeiro dia do mês anterior
//   const firstDayOfPreviousMonth = new Date(
//     currentYear,
//     month - 1,
//     1
//   ).toLocaleDateString("pt-br");

//   // Calcula o último dia do mês seguinte
//   const lastDayOfNextMonth = new Date(currentYear, month, 0).toLocaleDateString(
//     "pt-br"
//   );

//   return {
//     firstDayOfPreviousMonth,
//     lastDayOfNextMonth,
//   };
// }
// function getDateToYYYYMM(date: Date) {
//   return `${date.getFullYear()}-${
//     date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()}`
//   }`;
// }

// function getMonthfromYYYYMMstring(dateValue: string) {
//   const date = new Date(dateValue);
//   console.log(date, date.getMonth())
//   return date.getMonth()+2;
// }


// export function MonthInput() {
//   const [selectedMonth, setSelectedMonth] = useState(
//     getDateToYYYYMM(new Date())
//     );
    
//     const handleMonthChange = (
//       event: React.ChangeEvent<HTMLInputElement>
//       ): void => {
//         setSelectedMonth(event.target.value);
//       };
//       const IntervalBetweenMonths = `${getFirstAndLastDayOfYearMonths(getMonthfromYYYYMMstring(selectedMonth))?.firstDayOfPreviousMonth} - ${getFirstAndLastDayOfYearMonths(getMonthfromYYYYMMstring(selectedMonth))?.lastDayOfNextMonth}`;
//   return (
//     <>
//     <Input type="month" value={selectedMonth} onChange={handleMonthChange} width={'200px'} />
//     {IntervalBetweenMonths}
//     </>
//     // <h1>oi</h1>
//   );
// }
