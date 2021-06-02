<template>
  <ResourceForm
    @onFormSubmit="handleCreate($event)"
    :resource="resource"
    :alert="alert"
  />
</template>

<script>
import ResourceForm from "@/components/ResourceForm.vue";
import { useRouter } from "vue-router";
import { createResource } from "@/actions";
import { reactive, toRefs, onBeforeUnmount } from "vue";
export default {
  components: {
    ResourceForm,
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      resource: {
        title: "",
        description: "",
        type: "video",
        link: "",
      },
      alert: {
        success: null,
        error: null,
      },
      timeoutId: null,
    });

    const initAlert = () => {
      return {
        success: null,
        error: null,
      };
    };

    onBeforeUnmount(() => {
      clearAlertTimeout();
    });

    const clearAlertTimeout = () => {
      data.timeoutId && clearTimeout(data.timeoutId);
    };

    const setAlert = (type, message) => {
      data.alert = initAlert();
      data.alert[type] = message;
      data.timeoutId = setTimeout(() => {
        data.alert = initAlert();
        router.push("/");
      }, 2000);
    };

    const handleCreate = async (resource) => {
      // console.log(resource.value);
      await createResource(resource.value);
      setAlert("success", "Resource was created");
    };

    return {
      ...toRefs(data),
      handleCreate,
    };
  },
};
</script>

<style lang="scss" scoped></style>
