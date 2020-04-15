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
      component:  () => import('@/components/Home'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('@/components/User'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/callback',
      name: 'Callback',
      component:  () => import('@/components/Callback'),
    }  
    ]
  });


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) 
  { 
      // const isAuthenticated = (store.state.auth.user.tokenResponse && store.state.auth.user.tokenResponse.id_token);
      // const isAuthenticated = (store.state.auth.user.token);
      store.dispatch("auth/checkAccess").then((hasAccess) => {
         if(hasAccess) {
            next();
         }  
        else 
        {
          next('/home');
        }
      })
      
      /** 
      if(hasAccess) {
        next();
      }  
      else {
        next('/home');
      }
      **/
  } 
  else 
  {
    next();
  }
});

export default router;