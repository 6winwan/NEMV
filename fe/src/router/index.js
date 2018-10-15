import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/page/Hello';
import index from '@/components/page/index';
import intro from '@/components/page/intro';
import e404 from '@/components/page/e404';
import sign from '@/components/page/sign';
import register from '@/components/page/register';
import company from '@/components/page/setting/company';
import group from '@/components/page/setting/group';
import test from '@/components/page/dev/test';
import talk from '@/components/page/board/talk';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/',
          name: 'intro',
          component: intro,
          meta: {
            title: 'NEMB introduce',
            breadcrumb: [{
              text: 'Welcome',
              href: '/',
            }],
          },
        },
        {
          path: '/company',
          name: 'company',
          component: company,
          meta: {
            title: 'Company manage',
            breadcrumb: [{
              text: 'Setting > Company manage',
              href: '/',
            }],
          },
        },
        {
          path: '/group',
          name: 'group',
          component: group,
          meta: {
            title: 'Group manage',
            breadcrumb: [{
              text: 'Setting > Group manage',
              href: '/',
            }],
          },
        },
        {
          path: '/test',
          name: 'test',
          component: test,
          mata: {
            title: 'test',
            breadcrumb: [{
              text: 'Developer > text',
              href: '/',
            }],
          },
        },
      ],
    },
    {
      path: '/sign',
      name: 'sign',
      component: sign,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '*',
      name: 'e404',
      component: e404,
    },
    {
      path: '/talk',
      name: 'Talk',
      component: talk,
      meta: {
        title: 'Chat',
        breadcrumb: [{
          text: 'Board > Chat',
          herf: '/',
        }],
      },
    },
  ],
});
