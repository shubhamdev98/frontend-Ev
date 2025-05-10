import CryptoJS from "crypto-js";
import { CryptoJS_SecretKey } from "./Constant";

const secretKey = CryptoJS_SecretKey;

 // Encryption function
export const stringEncrypt = (data) => {
  try {
    const cipherText = CryptoJS.AES.encrypt(data, secretKey).toString();
    return cipherText;
  } catch (e) {
    console.error("Encryption error:", e);
    return null;
  }
};

// Decryption function
export const stringDecryptData = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
  } catch (e) {
    console.error("Decryption error:", e);
    return null;
  }
};
