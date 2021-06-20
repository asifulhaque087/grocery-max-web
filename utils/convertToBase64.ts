const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL: any = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      // finally
      resolve(baseURL);
    };
  });
};

export const convertToBase64 = async (files) => {
  let new_list = [];
  for (let file of files) {
    let result = await getBase64(file);
    new_list = [...new_list, result];
  }

  return new_list;
};
