import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {

  let token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token !== null) {

      jwt.verify(token, process.env.MIX_SECRET, function(err, decoded) {

        if (err) {

          Swal.fire(
              'Token expirado',
              'Inicie sesión nuevamente',
              'warning',
              setTimeout(() => {
                  next('/login');
              }, 2000)
          )

          console.log(err)

        } else {
          next()
        }

      })

    } else {
      router.replace('/login')
    }
  } else {
    next()
  }

})

router.beforeEach((to, from, next) => {

  const nearestWithTitle        = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  const nearestWithMeta         = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  if (!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags.map(tagDef => {

    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    tag.setAttribute('data-vue-router-controlled', '')

    return tag
  })
  .forEach(tag => document.head.appendChild(tag))
  next()

})

export default router
