const users = [
  {
    name: "Lê Thành Việt",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "lethanhviet7c@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nam",
  },
  {
    name: "Võ Trọng Gia Vinh",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "vinhgia@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nam",
  },
  {
    name: "Nguyễn Văn Trường",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "truongnguyen@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nam",
  },
  {
    name: "Huỳnh Thị Nhi",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "huynhthinhi@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nữ",
  },
  {
    name: "Trần Văn Tú",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "tranvantu@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nam",
  },
  {
    name: "Bùi Thanh Uy",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "buithanhuy@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nam",
  },
  {
    name: "Nguyễn Trần Trung",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "nguyentrantrung@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nam",
  },
  {
    name: "Phạm Hồng Vinh",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "phamhongvinh@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nam",
  },
  {
    name: "Lê Huỳnh Quang Trường",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "lehuynhquangtruong@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nam",
  },
  {
    name: "Đặng Minh Thọ",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "dangminhtho@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nam",
  },
  {
    name: "Hà Xuyên",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "nguyenhaxuyen@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nữ",
  },
  {
    name: "Nguyễn Thị Lê",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "nguyenthile@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nữ",
  },
  {
    name: "Nguyễn Ngọc Khiêm",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "nguyenngockhiem@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nam",
  },
  {
    name: "Huỳnh Ngọc Danh",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "huynhngocdanh@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nam",
  },
  {
    name: "Võ Thành Nguyên",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "vothanhnguyen@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nam",
  },
  {
    name: "Nguyễn Thị Thảo",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "nguyenthithao@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nữ",
  },
  {
    name: "Phạm Thị Lan Anh",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "phamthilananh@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nữ",
  },
  {
    name: "Kiều Trân",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "kieutran@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nữ",
  },
  {
    name: "Nguyễn Thị Thu Hường",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "nguyenthithuhuong@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nữ",
  },
  {
    name: "Nguyễn Thị Thúy",
    birth: Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
    phone: "0902794731",
    email: "nguyenthithuy@gmail.com",
    password: "22102000",
    isBanned: false,
    gender: "Nữ",
  },
];

module.exports = users;
