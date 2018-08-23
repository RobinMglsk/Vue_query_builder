import Vue from 'vue';
//import eventBus from '@/helpers/eventBus';
import queryBuilder from './QueryBuilder.vue';

/*
function triggerGlobalClick(e) {
    e.stopPropagation();
    eventBus.$emit('focusChanged', this);
}
document.addEventListener('click', triggerGlobalClick);

Vue.mixin({
    mounted() {
        this.$el.addEventListener('click', triggerGlobalClick);
    },
    beforeDestroy() {
        this.$el.removeEventListener('click', triggerGlobalClick);
    },
});
*/

const Components = {
    queryBuilder
};

export default Components;
//export { eventBus };