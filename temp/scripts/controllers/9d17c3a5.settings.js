dcuTimetablesApp.controller('SettingsCtrl',
  ['$location',
    function($location) {
      storage.clear();
      $location.path('');
    }
  ]
);
