// Copyright (c) 2012 Ian Duffy & Ben Chapman
// All rights reversed

dcuTimetablesApp.controller('SettingsCtrl',
  ['$location',
    function($location) {
      storage.clear();
      $location.path('');
    }
  ]
);
