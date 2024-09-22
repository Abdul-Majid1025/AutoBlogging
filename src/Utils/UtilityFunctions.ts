import { ObjectToForm } from "../Store/InjectorsTypes";


const getDataToAppend = (objectItem: object | string) => {
  const typeOfObjectItem = typeof objectItem;
  if (objectItem instanceof File) return objectItem;
  if (typeOfObjectItem === 'object') {
    return JSON.stringify(objectItem);
  } return String(objectItem);
};

export const objToFormData: ObjectToForm = (obj) => Object.keys(obj).reduce((
  formData: FormData,
  key: string,
) => {
  formData.append(
    key,
    getDataToAppend(obj[key]),
  );
  return formData;
}, new FormData());

export const convertDaysToYearsMonthsDays = (days: number) => {
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = Math.floor((days % 365) % 30);
    let result = '';
    if (years > 0) {
      result += `${years}y `;
    }
    if (months > 0) {
      result += `${months}m `;
    } else if (remainingDays > 0) {
      result += `${remainingDays}d `;
    }
    return result.trim();
}