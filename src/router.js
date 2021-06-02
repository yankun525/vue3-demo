import { createRouter, createWebHistory } from "vue-router";
import ResourceHome from "@/views/ResourceHome.vue";
import ResourceNew from "@/views/ResourceNew.vue";
// import ResourceRoutes from "@/views/ResourceRoutes.vue";
import ResourceDetailPage from "@/views/ResourceDetailPage.vue";

const routes = [
  // http://localhost:8080/resources
  // { path: "/", name: "base", redirect: "/resources" },
  { path: "/", name: "base", redirect: { name: "resourceHomePage" } },
  {
    path: "/resources",
    name: "resourceHomePage",
    component: ResourceHome,
  },
  { path: "/resources/new", name: "resourceNewPage", component: ResourceNew },
  // http://localhost:8080/resources/2
  {
    path: "/resources/:id",
    name: "resourceDetailPage",
    component: ResourceDetailPage,
  },
];

// const routes = [
//   // http://localhost:8080/resources
//   // { path: "/", name: "base", redirect: "/resources" },
//   { path: "/", name: "base", redirect: { name: "resourceHomePage" } },
//   {
//     path: "/resources",
//     name: "resourceHomePage",
//     component: ResourceRoutes,
//     children: [
//       {
//         path: "",
//         name: "resourceHome",
//         component: ResourceHome,
//       },
//       {
//         path: "new",
//         name: "resourceNewPage",
//         component: ResourceNew,
//       },
//     ],
//   },
// ];

const router = createRouter({
  history: createWebHistory(),
  //   routes: routes,
  routes,
  linkActiveClass: "active",
});

export default router;
