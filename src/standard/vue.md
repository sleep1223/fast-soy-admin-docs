# Vue Writing Style

## SFC Script Order

Follow this order in `<script setup lang="ts">`:

```vue
<script setup lang="ts">
// 1. Import statements (grouped by dependency type)
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/modules/auth';
import { fetchUserList } from '@/service-alova/api';

// 2. defineOptions
defineOptions({ name: 'ManageUserPage' });

// 3. Props type + defineProps
interface Props {
  userId?: number;
}
const props = defineProps<Props>();

// 4. Emits type + defineEmits
interface Emits {
  (e: 'update', id: number): void;
}
const emit = defineEmits<Emits>();

// 5. Hook functions
const router = useRouter();
const authStore = useAuthStore();

// 6. Component logic (refs, functions)
const loading = ref(false);
const users = ref<Api.SystemManage.User[]>([]);

async function loadUsers() {
  loading.value = true;
  const { data } = await fetchUserList({ current: 1, size: 10 });
  users.value = data?.records ?? [];
  loading.value = false;
}

// 7. init function
function init() {
  loadUsers();
}

// 8. watch / watchEffect

// 9. Lifecycle hooks
init();

// 10. defineExpose
</script>
```

## Template Rules

- Only **one root element** in `<template>` (required for `<Transition>`)
- Use `v-bind` shorthand: `:prop="value"`
- Use `v-on` shorthand: `@click="handler"`
- Self-close components without children: `<MyComponent />`

## Component Naming

- Component files: PascalCase (`UserCard.vue`)
- Component usage in template: PascalCase (`<UserCard />`)
- Register with `defineOptions({ name: 'UserCard' })`
