export default function ({ redirect, route, app }) {
  const isAuthenticated = app.$cookies.get('token')
  if (route.name !== 'login' && !isAuthenticated) {
    redirect({ name: 'login' })
  }
  if(route.name === 'login' && isAuthenticated) {
    redirect({name: 'users'})
  }
}
