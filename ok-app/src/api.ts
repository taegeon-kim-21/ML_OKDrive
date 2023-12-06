import axios from "axios";

// export interface IImage {
//   id: number;
//   url: string;
//   translated_caption: string | null;
// }

export interface IImageWithCaption {
  id: number;  // Django 모델은 기본적으로 id 필드를 가집니다.
  image: string;  // 이미지 URL을 나타냅니다. upload_to='images/'로 인해 URL 형태를 가질 것입니다.
  caption: string;  // 이미지의 캡션을 나타냅니다.
  translated_caption: string | null;  // 번역된 캡션, 없을 수도 있으므로 null이 가능합니다.
  created_at: string;  // 생성 시간, ISO 문자열 형식을 가정합니다.
}

// 이미지 데이터를 불러오는 함수
export function getImages() {
  return axios.get<IImageWithCaption[]>("/api/images/")
    .then((response) => {
      // 응답에서 이미지 데이터 배열을 반환합니다.
      return response.data;
    })
    .catch((error) => {
      // 에러 처리를 여기서 수행할 수 있습니다.
      console.error("Error fetching images:", error);
      return []; // 에러가 발생한 경우 빈 배열을 반환할 수 있습니다.
    });
}