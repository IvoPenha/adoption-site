import { saveAs } from 'file-saver';
// import { saveAs } from "file-saver";
// import * as pdfkit from 'pdfkit';

function urlB64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export function BaseConverterStack(data: any) {
  const ia = urlB64ToUint8Array(data);
  return ia;
}

export function pdfToBlob(data: Uint8Array) {
  // Blob for saving.
  var blob = new Blob([data], { type: "application/pdf" });
  return blob;

}

export function downloadBlob(blob: Blob, fileName: string) {
  saveAs(blob, fileName);
}

export class Base64Converter {
  static encode(input: string): string {
    const utf8Bytes = new TextEncoder().encode(input);
    return btoa(String.fromCharCode(...utf8Bytes));
  }

  static decode(prop: string): string {
    try {
      const input = prop.replace(/_/g, "/").replace(/-/g, "+");
      const binaryString = atob(input);
      const utf8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        utf8Array[i] = binaryString.charCodeAt(i);
      }
      return new TextDecoder().decode(utf8Array);
    } catch (error) {
      console.error("Erro ao decodificar Base64:", error);
      return "";
    }
  }
}
