import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';


/*
  Only retrieves the components when they are called for better performance
*/ 
const CoachDetail = defineAsyncComponent(() =>
  import('./pages/coaches/CoachDetail.vue')
);
const CoachRegistration = defineAsyncComponent(() =>
  import('./pages/coaches/CoachRegistration.vue')
);

const ContactCoach = defineAsyncComponent(() =>
  import('./pages/requests/ContactCoach.vue')
);

const RequestsReceived = defineAsyncComponent(() =>
  import('./pages/requests/RequestsReceived.vue')
);

const UserAuth = defineAsyncComponent(() =>
  import('./pages/auth/UserAuth.vue')
);

// Create the router to keep track of all the routes and paths of the app
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // main/home page
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      // path to a specific coach
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      // child path of coach
      children: [
        { path: 'contact', component: ContactCoach } // coaches/c1/contact
      ]
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true }
    },
    // Authentication path and error paths
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

/*
  Check if the user is authenticated or not
  if they are not they will be redirected to the login page
  else allow the user to go to the following page
*/
router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
// export this router to make files minimal and organized