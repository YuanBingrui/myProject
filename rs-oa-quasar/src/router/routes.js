export default [
  {
    path: '/mobilelogin',
    name: 'mobilelogin',
    component: () => import('pages/mobile/MobileLogin')
  },
  {
    path: '/mobilepages',
    component: () => import('layouts/mobile/TabsLayout'),
    children: [
      {
        path: 'mobilehome',
        name: 'mobilehome',
        component: () => import('pages/mobile/MobileHome')
      },
      {
        path: 'mobiletodo',
        name: 'mobiletodo',
        component: () => import('pages/mobile/MobileTodo')
      },
      {
        path: 'mobiletododetail/:todo',
        name: 'mobiletododetail',
        component: () => import('pages/mobile/MobileTodoDetail')
      },
      {
        path: 'mobiletodosubmit/:todo',
        name: 'mobiletodosubmit',
        component: () => import('pages/mobile/MobileTodoSubmit')
      },
      {
        path: 'mobilebusiness',
        name: 'mobilebusiness',
        component: () => import('pages/mobile/MobileBusiness')
      },
      {
        path: 'mobilebusinessdetail/:business',
        name: 'mobilebusinessdetail',
        component: () => import('pages/mobile/MobileBusinessDetail')
      },
      {
        path: 'mobilebusinessflow/:flowinfos',
        name: 'mobilebusinessflow',
        component: () => import('pages/mobile/MobileBusinessFlow')
      },
      {
        path: 'mobilething',
        name: 'mobilething',
        component: () => import('pages/mobile/MobileThing')
      },
      {
        path: 'mobilethingdetail/:onething',
        name: 'mobilethingdetail',
        component: () => import('pages/mobile/MobileThingDetail')
      },
      {
        path: 'mobilethingsubmit/:onething',
        name: 'mobilethingsubmit',
        component: () => import('pages/mobile/MobileThingSubmit')
      },
      {
        path: 'mobileworklog',
        name: 'mobileworklog',
        component: () => import('pages/mobile/MobileWorklog')
      },
      {
        path: 'mobileworklogdetail/:worklog',
        name: 'mobileworklogdetail',
        component: () => import('pages/mobile/MobileWorklogDetail')
      },
      {
        path: 'mobilealarm',
        name: 'mobilealarm',
        component: () => import('pages/mobile/MobileAlarm')
      },
      {
        path: 'mobilealarmdetail/:alarm',
        name: 'mobilealarmdetail',
        component: () => import('pages/mobile/MobileAlarmDetail')
      },
      {
        path: 'mobilenotice',
        name: 'mobilenotice',
        component: () => import('pages/mobile/MobileNotice')
      },
      {
        path: 'mobilenoticedetail/:notice',
        name: 'mobilenoticedetail',
        component: () => import('pages/mobile/MobileNoticeDetail')
      },
      {
        path: 'mobiledocument',
        name: 'mobiledocument',
        component: () => import('pages/mobile/MobileDocument')
      },
      {
        path: 'mobiledocumentdetail/:transmitData',
        name: 'mobiledocumentdetail',
        component: () => import('pages/mobile/MobileDocumentDetail')
      },
      {
        path: 'mobileabout',
        name: 'mobileabout',
        component: () => import('pages/mobile/MobileAbout')
      }
    ]
  },
  {
    path: '/desktoplogin',
    name: 'desktoplogin',
    component: () => import('pages/desktop/DesktopLogin')
  },
  {
    path: '/desktop',
    name: 'desktop',
    component: () => import('layouts/default'),
    children: [
      { path: '', name: 'index', component: () => import('pages/index') }
    ]
  },
  {
    // Always leave this as last one
    path: '*',
    name: 'error_404',
    component: () => import('pages/404')
  }
]
