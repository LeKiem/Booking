export const adminMenu = [
  {
    //quản lí người dùng
    name: "menu.admin.manage-user",
    menus: [
      { name: "menu.admin.crud", link: "/system/user-manage" },
      { name: "menu.admin.crud-redux", link: "/system/user-redux" },
      { name: "menu.admin.manage-doctor", link: "/system/manage-doctor" }, // {
      // subMenus: [
      //   {
      //     name: "menu.system.system-administrator.user-manage",
      //     link: "/system/user-manage"
      //   },
      //   {
      //     name: "menu.system.system-administrator.user-redux",
      //     link: "/system/user-redux"
      //   }
      // ]
      //   name: "menu.admin.manage-admin",
      //   link: "/system/user-admin"
      // }
      {
        //quản lí kể hoạch khám bệnh

        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule"
      }
    ]
  },
  {
    //Quản lí phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic"
      }
    ]
  },
  {
    //quản lí chuyen khoa
    name: "menu.admin.specialty",
    menus: [
      { name: "menu.admin.manage-specialty", link: "/system/manage-specialty" }
    ]
  },
  {
    //quản lí cam nang
    name: "menu.admin.handbook",
    menus: [
      { name: "menu.admin.manage-handbook", link: "/system/manage-handbook" }
    ]
  }
];
export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        //quản lí kể hoạch khám bệnh

        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule"
      },
      {
        //Quản lí bệnh nhân khám bệnh của bác sĩ

        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient"
      }
    ]
  }
];
