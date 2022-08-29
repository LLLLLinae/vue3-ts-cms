import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'

// 根据用户的菜单生成路由配置对象
export let firstMenu: any = null
export function MenuToRouteMap(menu: any[]): RouteRecordRaw[] {
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
          if (!firstMenu) {
            firstMenu = route
          }
        }
      } else {
        _recurseGetRoute(menuItem.children)
      }
    }
  }
  _recurseGetRoute(menu)
  return routes
}

//根据当前路径定位到菜单并获取breadcrumb
// /main/system/role  -> type === 2 对应menu
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumb?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumb?.push({ name: menu.name })
        breadcrumb?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
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
