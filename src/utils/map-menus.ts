import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'
export default function (menu: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.获取所有已经定义过的路由映射对象
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((item) => {
    const route = require(`../router/main${item.split('.')[1]}`)
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menu: any[]) => {
    for (const menuItem of menu) {
      if (menuItem.type === 2) {
        const route = allRoutes.find((routeItem) => {
          return routeItem.path === menuItem.url
        })
        if (route) {
          routes.push(route)
        }
      } else {
        _recurseGetRoute(menuItem.children)
      }
    }
  }
  _recurseGetRoute(menu)
  return routes
}
export function pathMapToMenu(
  menus: any[],
  currentPath: string,
  breadcrumb?: IBreadcrumb[]
): any {
  // console.log(menus)
  for (const item of menus) {
    if (item.type === 2 && item.url === currentPath) {
      return item
    } else {
      const menu = pathMapToMenu(item.children ?? [], currentPath)
      if (menu) {
        breadcrumb?.push({ name: item.name })
        breadcrumb?.push({ name: menu.name })
      }
      return menu
    }
  }
}

//obj.keys 获得相对于../router/main路径，.ts的文件路径的数组
//./analysis/dashboard/dashboard.ts
// ./analysis/overview/overview.ts
// ./product/category/category.ts
// ./product/goods/goods.ts
// ./story/chat/chat.ts
// ./story/list/list.ts
// ./system/department/department.ts
// ./system/menu/menu.ts
// ./system/role/role.ts
// ./system/user/user.ts
