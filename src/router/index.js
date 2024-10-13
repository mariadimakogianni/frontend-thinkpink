import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue';
import TodayTasks from '@/components/TodayTasks.vue';
import ViewTasks from '@/components/ViewTasks.vue';
import MoRoutine from '@/components/MoRoutine.vue';
import CreateTasks from '@/components/CreateTasks.vue';
import ListCheckbox from '@/components/ListCheckbox.vue';
import ProjectSharing from '@/components/ProjectSharing.vue';
import PomodoroTec from '@/components/PomodoroTec.vue';
import SpinningWheel from '@/components/SpinningWheel.vue';

const routes = [
  {
    path: '/', 
    component: HomeView, 
    children: [
      {
        path: 'today', 
        name: 'today',
        component: TodayTasks,
        meta: { title: 'Today - ThinkPink' }
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: ViewTasks,
        meta: { title: 'View Tasks - ThinkPink' }
      },
      {
        path: 'routine',
        name: 'routine',
        component: MoRoutine,
        meta: { title: 'Morning & Night Routine - ThinkPink' }
      },
      {
        path: 'createNewTask',
        name: 'createNewTask',
        component: CreateTasks,
        meta: { title: 'Create New Task - ThinkPink' }
      },
      {
        path: 'lists',
        name: 'lists',
        component: ListCheckbox,
        meta: { title: 'Lists - ThinkPink' }
      },
      {
        path: 'stprojects',
        name: 'stprojects',
        component: ProjectSharing,
        meta: { title: 'Projects - ThinkPink' }
      },
      {
        path: 'pomodoro',
        name: 'pomodoro',
        component: PomodoroTec,
        meta: { title: 'Pomodoro - ThinkPink' }
      },
      {
        path: 'spinningwheel',
        name: 'spinningwheel',
        component: SpinningWheel,
        meta: { title: 'Spinning Wheel - ThinkPink' }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.title)

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title
  else if (previousNearestWithMeta) document.title = previousNearestWithMeta.meta.title

  next()
})


export default router
