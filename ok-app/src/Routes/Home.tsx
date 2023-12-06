import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { allImagesState } from '../atom';
import { getImages } from '../api'; // getImages 대신 getImages2를 사용
import styled from "styled-components";

const Wrapper = styled.div`
  width: 1200px;
  height: 200vh;
  max-width: 1200px;
  margin: 20px auto;
  margin-top: 200px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Gallery = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
  padding: 0 18px 0 18px;
`;

const ImageCard = styled.div`
  height: 400px;
  border: 1.5px solid #5f5b5b49;
  border-radius: 10px;  // 둥근 모서리 추가
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


const Img = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
`;

const Caption = styled.div`
  font-size: 15px;
  font-weight: 200;
  color: black;
  margin-bottom: 20px;
`;


// ... 스타일 컴포넌트 정의 ...

function Home() {
  const setAllImages = useSetRecoilState(allImagesState);

  useEffect(() => {
    getImages().then(images => { // getImages2 함수를 호출
      setAllImages(images);
    }).catch(error => {
      console.error("Error fetching images:", error);
    });
  }, [setAllImages]);

  const allImages = useRecoilValue(allImagesState);

  return (
    <Wrapper>
      <Gallery>
        {allImages.map((image) => (
          <ImageCard key={image.id}>
            <Img style={{ backgroundImage: `url(${image.image})` }} />
            {image.translated_caption && (
              <Caption>{image.translated_caption}</Caption>
            )}
          </ImageCard>
        ))}
      </Gallery>
    </Wrapper>
  );
}

export default Home;


// import React, { useEffect } from 'react';
// import { useSetRecoilState, useRecoilValue } from 'recoil';
// import { allImagesState } from '../atom';
// import { getImages } from '../api';
// import styled from "styled-components";

// const Wrapper = styled.div`
//   width: 1200px;
//   height: 200vh;
//   max-width: 1200px;
//   margin: 20px auto;
//   margin-top: 200px;
//   padding: 20px;
//   background-color: #f9f9f9;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// `;

// const Gallery = styled.div`
//   margin-top: 30px;
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 26px;
//   padding: 0 18px 0 18px;
// `;

// const ImageCard = styled.div`
//   height: 400px;
//   border: 1.5px solid #5f5b5b49;
//   border-radius: 10px;  // 둥근 모서리 추가
//   padding: 1rem;
//   text-align: center;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;


// const Img = styled.div`
//   width: 100%;
//   height: 300px;
//   background-size: cover;
//   background-position: center;
// `;

// const Caption = styled.div`
//   font-size: 15px;
//   font-weight: 200;
//   color: black;
//   margin-bottom: 20px;
// `;

// function Home() {

//   const setAllImages = useSetRecoilState(allImagesState);

//   useEffect(() => {
//     getImages().then(images => {
//       setAllImages(images);
//     }).catch(error => {
//       console.error("Error fetching images:", error);
//     });
//   }, [setAllImages]);

  
//   const allImages = useRecoilValue(allImagesState);

//   return (
//     <Wrapper>
//       <Gallery>
//         {allImages.map((image) => (
//           <ImageCard key={image.id}>
//             <Img style={{ backgroundImage: `url(${image.image})` }} />
//             {image.translated_caption && (
//               <Caption>{image.translated_caption}</Caption>
//             )}
//           </ImageCard>
//         ))}
//       </Gallery>
//     </Wrapper>
//   );
  
// }

// export default Home;
