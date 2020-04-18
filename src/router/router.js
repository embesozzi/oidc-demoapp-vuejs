import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component:  () => import('@/views/Home'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/accessDenied',
      name: 'AccessDenied',
      component:  () => import('@/views/AccessDenied'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/user',
      name: 'UserView',
      component: () => import('@/views/UserView'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/edit',
      name: 'UserEdit',
      component: () => import('@/views/UserEdit'),
      meta: {
        requiresAuth: true,
        requiresRole : ['users:write']
      }
    },
    {
      path: '/callback',
      name: 'Callback',
      component:  () => import('@/views/Callback'),
    }  
    ]
  });


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) 
  { 
    let requiresRole = to.meta.requiresRole;
    store.dispatch("auth/checkAccess", requiresRole).then((statusCode) => {
        if(statusCode == "OK") {
          next();
        }  
        else {
          let nextPage = (statusCode == "UNAUTHORIZED") ? '/home' :'/accessDenied';
          next(nextPage);
        }
    })
  } 
  else 
  {
    next();
  }
});

export default router;