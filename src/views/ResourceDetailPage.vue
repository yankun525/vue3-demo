<template>
  <ResourceDetail :resource="resource">
    <template #buttonLink>
      <button @click="$router.go(-1)" class="btn btn-outline-success">
        返回
      </button>
    </template>
  </ResourceDetail>
</template>

<script>
import { useRoute } from "vue-router";
import { fetchResource } from "@/actions";
import { toRefs, reactive, onMounted } from "vue";
import ResourceDetail from "@/components/ResourceDetail.vue";
export default {
  components: {
    ResourceDetail,
  },
  setup() {
    const route = useRoute();
    const data = reactive({
      resource: null,
    });
    onMounted(async () => {
      // console.log(route.params.id);
      const { id } = route.params;
      data.resource = await fetchResource(id);
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style scoped>
</style>
