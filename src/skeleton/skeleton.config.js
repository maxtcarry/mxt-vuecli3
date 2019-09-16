import Vue from 'vue';
import Skeleton1 from './home/Skeleton1.vue';
import Skeleton2 from './about/Skeleton2.vue';

export default new Vue({
    components: {
        Skeleton1,
        Skeleton2
    },
    template: `
        <div>
            <Skeleton1 id="Skeleton1" style="display:none;"/>
            <Skeleton2 id="Skeleton2" style="display:none;"/>
        </div>
    `
});
