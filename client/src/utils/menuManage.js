import icons from "./icons";

const { TbPencilPlus, BsFilePost, HiMiniUserCircle } = icons;
const menuManage = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/he-thong/tao-moi-bai-dang",
    icon: <TbPencilPlus />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/he-thong/quan-ly-bai-dang",
    icon: <BsFilePost />,
  },
  {
    id: 3,
    text: "Thông tin tài khoản",
    path: "/he-thong/thong-tin-tai-khoan",
    icon: <HiMiniUserCircle />,
  },
];
export default menuManage;
