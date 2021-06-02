<template>
  <div class="row">
    <div class="col-md-4 order-md-2 mb-4">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-muted">数据</span>
        <span class="badge badge-secondary badge-pill">{{
          getResourcesLength
        }}</span>
      </h4>
      <ResourceSearch @onsearch="handleSearch($event)" />
      <ResourceList
        @handleItemClick="selectResource"
        :resources="resources"
        :activeId="activeResource?._id"
      />
      <!-- 添加按钮 
      <button @click="addResource" class="btn btn-sm btn-primary">
        添加数据
      </button>-->
    </div>
    <!-- {/* 更新数据 Starts */} -->
    <div class="col-md-8 order-md-1">
      <h4 class="mb-3">
        数据 {{ activeResource?._id }}
        <template v-if="getResourcesLength">
          <button
            @click="isDetailView = !isDetailView"
            :class="`btn btn-sm ${toggleBtnClass} mr-2`"
          >
            {{ !isDetailView ? "更新" : "详情" }}
          </button>
          <!-- 删除 -->
          <ResourceDelete
            @onResourceDelete="handleResourceDelete($event)"
            :activeId="activeResource?._id"
          />
        </template>
      </h4>
      <ResourceUpdate
        @onUpdateResource="handleUpdateResource($event)"
        :resource="activeResource"
        v-if="isDetailView"
      />
      <ResourceDetail :resource="activeResource" v-else>
        <template #buttonLink>
          <router-link
            class="btn btn-outline-success"
            :to="{
              name: 'resourceDetailPage',
              params: { id: activeResource?._id },
            }"
            >详情</router-link
          >
        </template>
      </ResourceDetail>
    </div>
    <!-- 更新数据 Ends  -->
  </div>
</template>

<script>
import { toRefs, reactive, computed, ref, onMounted } from "vue";
import ResourceSearch from "@/components/ResourceSearch.vue";
import ResourceList from "@/components/ResourceList.vue";
import ResourceUpdate from "@/components/ResourceUpdate.vue";
import ResourceDetail from "@/components/ResourceDetail.vue";
import ResourceDelete from "@/components/ResourceDelete.vue";
import { fetchResources, searchResources } from "@/actions";
export default {
  name: "ResourceHome",
  components: {
    ResourceSearch,
    ResourceList,
    ResourceUpdate,
    ResourceDetail,
    ResourceDelete,
  },

  setup() {
    const data = reactive({
      resources: [],
    });

    const isDetailView = ref(false);
    const selectedResource = ref(null);

    // const getResourcesLength = () => {
    //   console.log("==========method==========");
    //   return data.resources.length;
    // };

    // 生命周期钩子函数
    onMounted(() => {
      getResources();
    });

    // computed
    const getResourcesLength = computed(() => {
      // console.log("==========computed==========");
      return data.resources.length;
    });

    const toggleBtnClass = computed(() => {
      return isDetailView.value ? "btn-primary" : "btn-warning";
    });

    const activeResource = computed(() => {
      return (
        selectedResource.value ||
        (getResourcesLength > 0 && data.resources[0]) ||
        null
      );
    });

    // methods

    const addResource = () => {
      // debugger;
      const _id = "_" + Math.random().toString(36).slice(2);
      const type = ["book", "blog", "video"][Math.floor(Math.random() * 3)];
      const newResource = {
        _id,
        title: `${_id} title`,
        description: `${_id} description`,
        link: "",
        type,
      };

      data.resources.unshift(newResource);
    };

    const selectResource = (resource) => {
      selectedResource.value = resource;
      // console.log(selectedResource.value);
    };

    const handleUpdateResource = (newResource) => {
      const index = data.resources.findIndex(
        (resource) => resource._id === newResource._id
      );
      data.resources[index] = newResource;

      selectResource(newResource);
    };

    const handleResourceDelete = (newResource) => {
      const index = data.resources.findIndex(
        (resource) => resource._id === newResource._id
      );

      data.resources.splice(index, 1);
      selectResource(data.resources[0] || null);
    };

    const handleSearch = async (title) => {
      // console.log(title);
      if (!title) {
        getResources();
        return;
      }
      data.resources = await searchResources(title);
      selectedResource.value = null;
    };

    const getResources = async () => {
      const resources = await fetchResources();
      data.resources = resources;
    };

    return {
      ...toRefs(data),
      getResourcesLength,
      isDetailView,
      addResource,
      toggleBtnClass,
      selectResource,
      selectedResource,
      activeResource,
      handleUpdateResource,
      handleResourceDelete,
      handleSearch,
    };
  },
};
</script>

<style></style>
