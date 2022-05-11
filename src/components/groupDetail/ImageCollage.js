// import React from "react";
// import { ReactPhotoCollage } from "react-photo-collage";

// import { useSelector } from "react-redux";

// const ImageCollage = (props) => {
//   console.log(props);
//   const detailGroup = useSelector((state) => state.feed.detail);
//   console.log(detailGroup);

//   const setting = {
//     width: "100%",
//     height: ["379px", "240px"],
//     layout: [1, 2],
//     photos: [
//       {
//         source: `${
//           detailGroup.thumbnailUrl1 === null
//             ? "http://www.urbanbrush.net/web/wp-content/uploads/edd/2018/03/web-20180330154935883874.png"
//             : detailGroup?.thumbnailUrl1
//         }`,
//       },
//       {
//         source: `${
//           detailGroup.thumbnailUrl2 === null
//             ? "http://www.urbanbrush.net/web/wp-content/uploads/edd/2018/03/web-20180330154935883874.png"
//             : detailGroup?.thumbnailUrl2
//         }`,
//       },
//       {
//         source: `${
//           detailGroup.thumbnailUrl3 === null
//             ? "http://www.urbanbrush.net/web/wp-content/uploads/edd/2018/03/web-20180330154935883874.png"
//             : detailGroup?.thumbnailUrl3
//         }`,
//       },
//     ],
//     showNumOfRemainingPhotos: true,
//   };

//   return <ReactPhotoCollage style={{ height: "auto" }} {...setting} />;
// };

// export default ImageCollage;
