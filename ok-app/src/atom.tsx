import { atom } from "recoil";
import { IImageWithCaption } from "./api"; 



// api에서 이미지 받아오기
export const allImagesState = atom<IImageWithCaption[]>({
    default: [],

    key: "allImages",
});
