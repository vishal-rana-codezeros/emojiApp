export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'cui-dashboard'
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'fa fa-group'
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
      icon: 'icon-user'
    },
    {
      name: 'Contact Us',
      url: '/ContactUs',
      icon: 'fa fa-volume-control-phone'
    }
  ],
};
