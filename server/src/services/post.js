import moment from "moment";
import { Op } from "sequelize";
import { v4 as generateId } from "uuid";
import db from "../models";
import generateCode from "../utils/generateCode";

export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["image"],
          },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Gettin posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getPostsLimitService = (
  page,
  query,
  { priceNumber, areaNumber }
) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = {
        ...query,
      };
      if (priceNumber) {
        if (priceNumber[0] === priceNumber[1] && priceNumber[0] >= 15) {
          queries.priceNumber = { [Op.gte]: priceNumber[0] };
        } else {
          queries.priceNumber = { [Op.between]: priceNumber };
        }
      }
      if (areaNumber) {
        if (areaNumber[0] === areaNumber[1] && areaNumber[0] >= 90) {
          queries.areaNumber = { [Op.gte]: areaNumber[0] };
        } else {
          queries.areaNumber = { [Op.between]: areaNumber };
        }
      }
      /* priceNumber: {
            [Op.between]: priceNumber,
          },
          areaNumber: {
            [Op.between]: areaNumber,
          }, */
      // console.log(priceNumber);
      // console.log(areaNumber);
      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["image"],
          },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getNewPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        offset: 0,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["image"],
          },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price"],
          },
        ],
        attributes: ["id", "title", "star", "createdAt"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Gettin posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const createNewPostService = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const attributesId = generateId();
      const imagesId = generateId();
      const overviewId = generateId();
      const labelCode = generateCode(body.label);
      const currentDate = new Date();
      const response = await db.Post.create({
        id: generateId(),
        title: body?.title || null,
        labelCode,
        address: body?.address || null,
        attributesId,
        categoryCode: body?.categoryCode || null,
        description: JSON.stringify(body?.description) || null,
        userId,
        overviewId,
        imagesId,
        areaCode: body?.areaCode || null,
        priceCode: body?.priceCode || null,
        provinceCode:
          generateCode(
            body?.province?.includes("Thành phố")
              ? body?.province?.replace("Thành phố ", "")
              : body?.province?.replace("Tỉnh ", "")
          ) || null,
        priceNumber: body?.priceNumber / Math.pow(10, 6),
        areaNumber: body?.areaNumber,
      });
      await db.Attribute.create({
        id: attributesId,
        price:
          +body.priceNumber >= Math.pow(10, 6)
            ? `${+body.priceNumber / Math.pow(10, 6)} triệu/tháng`
            : `${+body.priceNumber} đồng/tháng`,
        acreage: `${body?.areaNumber} m2`,
        published: moment(new Date()).format("DD/MM/YYYY"),
        hashtag: `${Math.floor(Math.random() * Math.pow(10, 6))}`,
      });
      await db.Image.create({
        id: imagesId,
        image: JSON.stringify(body?.images),
      });
      await db.Overview.create({
        id: overviewId,
        code: `#${Math.floor(Math.random() * Math.pow(10, 6))}`,
        area: body.label,
        type: body.category,
        target: body.target,
        bonus: "Tin thường",
        created: currentDate,
        expired: new Date().setDate(
          currentDate.getDate() +
            (Math.floor(Math.random() * (30 - 10 + 1)) + 10)
        ),
      });
      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body.province.replace("Thành phố ", "") },
            { value: body.province.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", "")),
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", ""),
        },
      });
      await db.Label.findOrCreate({
        where: { code: labelCode },
        defaults: {
          code: labelCode,
          value: body.label,
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Gettin posts is failed." + error,
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getPostsLimitAdminService = (page, id, query) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = {
        ...query,
        userId: id,
      };
      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["image"],
          },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone"],
          },
          {
            model: db.Overview,
            as: "overview",
          },
        ],
        // attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const updatePostsService = ({
  postId,
  overviewId,
  imagesId,
  attributesId,
  ...body
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const labelCode = generateCode(body.label);
      await db.Post.update(
        {
          title: body?.title || null,
          labelCode,
          address: body?.address || null,
          categoryCode: body?.categoryCode || null,
          description: JSON.stringify(body?.description) || null,
          areaCode: body?.areaCode || null,
          priceCode: body?.priceCode || null,
          provinceCode:
            generateCode(
              body?.province?.includes("Thành phố")
                ? body?.province?.replace("Thành phố ", "")
                : body?.province?.replace("Tỉnh ", "")
            ) || null,
          priceNumber: body?.priceNumber / Math.pow(10, 6),
          areaNumber: body?.areaNumber,
        },
        { where: { id: postId } }
      );
      await db.Attribute.update(
        {
          price:
            +body.priceNumber >= Math.pow(10, 6)
              ? `${+body.priceNumber / Math.pow(10, 6)} triệu/tháng`
              : `${+body.priceNumber} đồng/tháng`,
          acreage: `${body?.areaNumber} m2`,
        },
        { where: { id: attributesId } }
      );
      await db.Image.update(
        {
          image: JSON.stringify(body?.images),
        },
        { where: { id: imagesId } }
      );
      await db.Overview.update(
        {
          area: body.label,
          type: body.category,
          target: body.target,
        },
        { where: { id: overviewId } }
      );
      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body.province.replace("Thành phố ", "") },
            { value: body.province.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", "")),
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", ""),
        },
      });
      await db.Label.findOrCreate({
        where: { code: labelCode },
        defaults: {
          code: labelCode,
          value: body.label,
        },
      });
      resolve({
        err: 0,
        msg: "Updated",
      });
    } catch (error) {
      reject(error);
    }
  });
export const deletePostService = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.destroy({
        where: { id: payload.postId },
      });
      await db.Attribute.destroy({
        where: { id: payload.attributesId },
      });
      await db.Image.destroy({
        where: { id: payload.imagesId },
      });
      await db.Overview.destroy({
        where: { id: payload.overviewId },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Deleted" : "No post delete",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
