import { TAnyObject } from './types';

export type TRandom = (max: number, min?: number, int?: boolean) => number;

/**
 * @description 获取某个区间[min=0, max]的随机数
 * @param {number} max - 区间最大值
 * @param {number} min - 区间最小值,默认为0
 * @param {bool} int - 是否为整数,默认为true,即整数
 * @returns {number} - 返回随机数
 */
export const getRandom: TRandom = (max, min = 0, int = true) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const res = Math.random() * (max - min + 1) + min;
  return int ? Math.floor(res) : res;
};

export type TGetBase64 = (imgSrc: string) => Promise<any>;

/**
 * @description 获取图片base64（可解决浏览器不兼容webp格式问题）
 * @param {string} imgSrc - 图片地址（需要允许跨域）
 * @returns {Promise}
 */
export const getBase64: TGetBase64 = (imgSrc) => {
  return new Promise((resolve, reject) => {
    if (typeof FileReader !== 'undefined') {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', imgSrc, true);
      xhr.responseType = 'blob';
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || (xhr.status === 0 && xhr.response)) {
            const reader = new FileReader();
            reader.readAsDataURL(xhr.response);
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          }
        }
      };
      xhr.send(null);
    } else {
      const img = new Image();
      img.src = imgSrc;
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx!.drawImage(img, 0, 0, img.width, img.height);
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      };
      img.onerror = (error) => reject(error);
    }
  });
};
