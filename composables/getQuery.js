import { useRoute } from "vue-router";
import { ref } from "vue";

export default () => {

    const route = useRoute();
    const query = ref(route?.hash.slice(1) || "");

    return query.value
}