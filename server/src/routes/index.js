import areaRouter from "./area";
import authRouter from "./auth";
import categoryRouter from "./category";
import insertRouter from "./insert";
import postRouter from "./post";
import priceRouter from "./price";
import provinceRouter from "./province";

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/price", priceRouter);
  app.use("/api/v1/area", areaRouter);
  app.use("/api/v1/province", provinceRouter);
  return app.use("/", (req, res) => {
    res.send("server on ...");
  });
};

export default initRoutes;
