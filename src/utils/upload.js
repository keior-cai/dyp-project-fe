import Axios from 'axios';

// 建立表单数据
const buildFormData = data => {
  let formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

// 生成文件名
const timestamp = _ => {
  const time = new Date();
  const y = time.getFullYear();
  const m = (time.getMonth() + 1).toString().padStart(2, '0');
  const d = time.getDate().toString().padStart(2, '0');
  const h = time.getHours().toString().padStart(2, '0');
  const mm = time.getMinutes().toString().padStart(2, '0');
  const s = time.getSeconds().toString().padStart(2, '0');
  return `${y}${m}${d}${h}${mm}${s}`;
};

// 选择文件
export const chooseFile = _ => {
  return new Promise((resolve, reject) => {
    const inputObj = document.createElement('input');
    inputObj.setAttribute('type', 'file');
    inputObj.setAttribute('style', 'visibility:hidden');
    document.body.appendChild(inputObj);
    inputObj.addEventListener('change', () => {
      resolve(inputObj.files[0]);
    });
    inputObj.click();
  });
};

// 上传文件
export const uploadFile = (url, data = {}) => {
  return new Promise(async (resolve, reject) => {
    const file = await chooseFile();
    const fileName = timestamp();
    const suffix = file.name.substr(file.name.indexOf('.'));
    const storeAs = `${fileName}${suffix}`;
    Axios.post(url, buildFormData({
      location: file,
      supportType: 'local',
      serveName: 'junyuBook',
      fileName: storeAs,
      ...data
    }), {
      'Content-Type': 'multipart/form-data'
    }).then((res) => {
      resolve(res.data);
    });
  });
};

export default {
  install: Vue => {
    Vue.prototype.$UPLOAD = uploadFile;
  },
  uploadFile,
  chooseFile
};
