import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import chothuecanho from "../../data/chothuecanho.json";
import chothuematbang from "../../data/chothuematbang.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import nhachothue from "../../data/nhachothue.json";
import db from "../models";
import { getNumberFromString, getNumberFromStringV2 } from "../utils/common";
import { dataArea, dataPrice } from "../utils/data";
import generateCode from "../utils/generateCode";
import parseDateString from "../utils/parseDateString";
require("dotenv").config;

const dataBody = [
  {
    body: chothuephongtro.body,
    code: "CTPT",
  },
  {
    body: chothuematbang.body,
    code: "CTMB",
  },
  {
    body: chothuecanho.body,
    code: "CTCH",
  },
  {
    body: nhachothue.body,
    code: "NCT",
  },
];

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const insertService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const provinceCodes = [];
      const labelCodes = [];
      dataBody.forEach((cate) => {
        cate.body.forEach(async (item) => {
          let postId = v4();
          let labelCode = generateCode(item?.header?.class?.classType).trim();
          labelCodes?.every((item) => item?.code !== labelCode) &&
            labelCodes.push({
              code: labelCode,
              value: item?.header?.class?.classType?.trim(),
            });
          let provinceCode = generateCode(
            item?.header?.address?.split(",")?.slice(-1)[0]
          ).trim();
          provinceCodes?.every((item) => item?.code !== provinceCode) &&
            provinceCodes.push({
              code: provinceCode,
              value: item?.header?.address?.split(",")?.slice(-1)[0].trim(),
            });
          let attributesId = v4();
          let userId = v4();
          let imagesId = v4();
          let overviewId = v4();
          let desc = JSON.stringify(item?.mainContent?.content);
          let currentArea = getNumberFromString(
            item?.header?.attribute?.acreage
          );
          let currentPrice = getNumberFromString(
            item?.header?.attribute?.price
          );
          await db.Post.create({
            id: postId,
            title: item?.header?.title,
            star: item?.header?.star,
            labelCode,
            address: item?.header?.address,
            attributesId,
            categoryCode: cate.code,
            description: desc,
            userId,
            overviewId,
            imagesId,
            areaCode: dataArea.find(
              (area) => area.max > currentArea && area.min <= currentArea
            )?.code,
            priceCode: dataPrice.find(
              (area) => area.max > currentPrice && area.min <= currentPrice
            )?.code,
            provinceCode,
            priceNumber: getNumberFromStringV2(item?.header?.attribute?.price),
            areaNumber: getNumberFromStringV2(item?.header?.attribute?.acreage),
          });
          await db.Attribute.create({
            id: attributesId,
            price: item?.header?.attribute?.price,
            acreage: item?.header?.attribute?.acreage,
            published: item?.header?.attribute?.published,
            hashtag: item?.header?.attribute?.hashtag,
          });
          await db.Image.create({
            id: imagesId,
            image: JSON.stringify(item?.images),
          });
          await db.Overview.create({
            id: overviewId,
            code: item?.overview?.content.find((i) => i.name === "Mã tin:")
              ?.content,
            area: item?.overview?.content.find((i) => i.name === "Khu vực")
              ?.content,
            type: item?.overview?.content.find(
              (i) => i.name === "Loại tin rao:"
            )?.content,
            target: item?.overview?.content.find(
              (i) => i.name === "Đối tượng thuê:"
            )?.content,
            bonus: item?.overview?.content.find((i) => i.name === "Gói tin:")
              ?.content,
            created: parseDateString(
              item?.overview?.content
                .find((i) => i.name === "Ngày đăng:")
                ?.content.toString()
            ),
            expired: parseDateString(
              item?.overview?.content
                .find((i) => i.name === "Ngày hết hạn:")
                ?.content.toString()
            ),
          });
          await db.User.create({
            id: userId,
            name: item?.contact?.content.find((i) => i.name === "Liên hệ:")
              ?.content,
            password: hashPassword("123456"),
            phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")
              ?.content,
            zalo: item?.contact?.content.find((i) => i.name === "Zalo")
              ?.content,
          });
        });
      });
      // console.log(provinceCodes);
      provinceCodes?.forEach(async (item) => {
        await db.Province.create(item);
      });
      labelCodes?.forEach(async (item) => {
        await db.Label.create(item);
      });

      resolve("Done.");
    } catch (error) {
      reject(error);
    }
  });
export const createPricesAndAreas = () =>
  new Promise((resolve, reject) => {
    try {
      dataPrice.forEach(async (item, index) => {
        await db.Price.create({
          code: item.code,
          value: item.value,
          order: index + 1,
        });
      });
      dataArea.forEach(async (item, index) => {
        await db.Area.create({
          code: item.code,
          value: item.value,
          order: index + 1,
        });
      });
      resolve("OK");
    } catch (err) {
      reject(err);
    }
  });

// const data1 = chothuephongtro.body;
// const data2 = nhachothue.body;
// const data3 = chothuecanho.body;
// const data4 = chothuematbang.body;
// const categoryCodeArray = ["CTPT", "NCT", "CTCH", "CTMB"];

// const dataBody = data1;
// const categoryCode = categoryCodeArray[0];
// const hashPassword = (password) =>
//   bcrypt.hashSync(password, bcrypt.genSaltSync(12));
// // const prices = []

// export const insertService = () =>
//   new Promise(async (resolve, reject) => {
//     try {
//       dataBody.forEach(async (item) => {
//         let postId = v4();
//         let attributesId = v4();
//         let imagesId = v4();
//         let overviewId = v4();
//         let currentArea = getNumberFromString(item?.header?.attribute?.acreage);
//         let currentPrice = getNumberFromString(item?.header?.attribute?.price);
//         let provinceCode = generateCode(
//           item?.header?.address?.split(",").slice(-1).pop()
//         );

//         const userIdByPhone = await db.User.findOne({
//           where: {
//             phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")
//               ?.content,
//           },
//           raw: true,
//         });
//         // console.log(userIdByPhone);
//         const userId = !userIdByPhone ? v4() : userIdByPhone?.id;
//         const labelCode = generateCode(item?.header?.class?.classType);
//         const labelItem = await db.Label.findOne({
//           where: { code: labelCode },
//         });

//         await db.Post.create({
//           id: postId,
//           title: item?.header?.title,
//           star: item?.header?.start,
//           labelCode: labelCode,
//           address: item?.header?.address,
//           attributesId,
//           categoryCode: categoryCode,
//           description: JSON.stringify(item?.mainContent?.content),
//           userId,
//           overviewId,
//           imagesId,
//           areaCode: dataArea.find(
//             (area) => area.max > currentArea && currentArea >= area.min
//           )?.code,
//           priceCode: dataPrice.find(
//             (price) => price.max > currentPrice && currentPrice >= price.min
//           )?.code,
//           provinceCode,
//         });

//         await db.Attribute.create({
//           id: attributesId,
//           price: item?.header?.attribute?.price,
//           acreage: item?.header?.attribute?.acreage,
//           published: item?.header?.attribute?.published,
//           hashtag: item?.header?.attribute?.hashtag,
//         });

//         await db.Province.findOrCreate({
//           where: {
//             code: provinceCode,
//           },
//           defaults: {
//             code: provinceCode,
//             value: item?.header?.address?.split(",").slice(-1).pop(),
//           },
//         });

//         await db.Image.create({
//           id: imagesId,
//           image: JSON.stringify(item?.images),
//         });

//         if (!labelItem) {
//           await db.Label.findOrCreate({
//             where: { code: labelCode },
//             defaults: {
//               code: labelCode,
//               value: item?.header?.class?.classType,
//             },
//           });
//         }

//         await db.Overview.create({
//           id: overviewId,
//           code: item?.overview?.content.find((i) => i.name === "Mã tin:")
//             ?.content,
//           area: item?.overview?.content.find((i) => i.name === "Khu vực")
//             ?.content,
//           type: item?.overview?.content.find((i) => i.name === "Loại tin rao:")
//             ?.content,
//           target: item?.overview?.content.find(
//             (i) => i.name === "Đối tượng thuê:"
//           )?.content,
//           bonus: item?.overview?.content.find((i) => i.name === "Gói tin:")
//             ?.content,
//           created: parseDateString(
//             item?.overview?.content.find((i) => i.name === "Ngày đăng:")
//               ?.content
//           ),
//           expired: parseDateString(
//             item?.overview?.content.find((i) => i.name === "Ngày hết hạn:")
//               ?.content
//           ),
//         });

//         await db.User.findOrCreate({
//           where: { id: userId },
//           defaults: {
//             id: userId,
//             name: item?.contact?.content.find((i) => i.name === "Liên hệ:")
//               ?.content,
//             password: hashPassword("123456"),
//             phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")
//               ?.content,
//             zalo: item?.contact?.content.find((i) => i.name === "Zalo")
//               ?.content,
//           },
//         });
//       });
//       resolve("done");
//     } catch (error) {
//       reject(error);
//     }
//   });

// export const createPricesAndAreas = () =>
//   new Promise(async (resolve, reject) => {
//     try {
//       dataPrice.forEach(async (item, index) => {
//         await db.Price.create({
//           code: item.code,
//           value: item.value,
//           order: index + 1,
//         });
//       });
//       dataArea.forEach(async (item, index) => {
//         await db.Area.create({
//           code: item.code,
//           value: item.value,
//           order: index + 1,
//         });
//       });
//       resolve("OK");
//     } catch (error) {
//       reject(error);
//     }
//   });
