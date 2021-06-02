<template>
  <ResourceForm
    @onFormSubmit="handleUpdate($event)"
    :resource="resource"
    :alert="alert"
  />
</template>

<script>
import ResourceForm from "@/components/ResourceForm.vue";
import { ref, watch, reactive, toRefs, onBeforeUnmount } from "vue";
import { updateResource } from "@/actions";

export default {
  components: {
    ResourceForm,
  },
  props: {
    resource: Object,
  },
  setup(props, context) {
    const data = reactive({
      alert: {
        success: null,
        error: null,
      },
      timeoutId: null,
    });

    watch(
      () => props.resource,
      (resource, prevResource) => {
        if (resource && resource._id !== prevResource._id) {
          clearAlertTimeout();
          data.alert = initAlert();
        }
      }
    );

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
      }, 3000);
    };

    const handleUpdate = async (uResource) => {
      try {
        const updatedResource = await updateResource(
          uResource.value._id,
          uResource.value
        );

        context.emit("onUpdateResource", updatedResource);
        setAlert("success", "Resource was updated");
      } catch (errorMessage) {
        setAlert("error", errorMessage);
      }
    };

    return {
      ...toRefs(data),

      handleUpdate,
    };
  },
};
</script>

<style></style>
