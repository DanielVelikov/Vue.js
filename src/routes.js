import addResume from './components/addResume.vue'
import showResume from './components/showResume.vue'
import listResumes from './components/listResumes.vue'

export default [
        { path: '/', component: listResumes },
        { path: '/add', component: addResume },
        { path: '/resume:id', component: showResume }
]