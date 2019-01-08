export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'fa fa-user-o'
    },
    {
      name: 'Keyboards',
      url: '/keyboards',
      icon: 'fa fa-keyboard-o',
      className:"sideBarcss",
      children: [
        {
          name: 'Keyboards',
          url: '/keyboards/keyboards',
          icon: 'icon-puzzle',
        },
        {
          name: 'Categories',
          url: '/keyboards/categories',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: 'About Us',
      url: '/AboutUs',
      icon: 'fa fa-group'
    },
    {
      name: 'Contact Us',
      url: '/ContactUs',
      icon: 'fa fa-volume-control-phone'
    }
  ],
};
