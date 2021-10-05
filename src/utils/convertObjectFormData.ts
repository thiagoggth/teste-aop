import FormData from 'form-data';

const convertObjectToFormData = (formData: FormData, data: any, parentKey?: string) => {
  if (data && typeof data === 'object' && !(data instanceof Date)) {
    Object.keys(data).forEach((key) => {
      convertObjectToFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else if (data != null && parentKey) {
    formData.append(parentKey, data);
  }
  return formData;
};

export default convertObjectToFormData;
