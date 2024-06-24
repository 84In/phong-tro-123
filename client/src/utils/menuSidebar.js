import icons from "./icons";

const { TbPencilPlus, BsFilePost, HiMiniUserCircle, GrContact } = icons;
const menuSidebar = [
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
    text: "Sửa thông tin cá nhân",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: <HiMiniUserCircle />,
  },
  {
    id: 4,
    text: "Liên hệ",
    path: "/he-thong/lien-he",
    icon: <GrContact />,
  },
];
export default menuSidebar;
