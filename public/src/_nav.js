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
          name: 'Categories',
          url: '/Keyboards/Categories',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: 'AboutUs',
      url: '/AboutUs',
      icon: 'fa fa-group'
    },
    {
      name: 'ContactUs',
      url: '/ContactUs',
      icon: 'fa fa-volume-control-phone'
    }
  ],
};
