<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { useToastNotification } from './state/toasts';
  import { useAlerts } from './state/alerts';

  const notifications = useToastNotification();
  const alerts = useAlerts();

  function addToast() {
    alerts.push({
      message: "test",
      type: 'success'
    })
  }
</script>

<template>
  <RouterView />
  <button class="btn" @click="addToast">Asd</button>
  <!-- Toast Notifications -->
  <div class="toast toast-top toast-end">
    <div :class="[`alert`, `alert-${n.colour}`]" v-for="n in notifications.notifications" :key="n.id">
      <div>
        <p class="font-semibold text-sm">{{ n.title }}</p>
        <p>{{ n.message }}</p>
      </div>
    </div>
  </div>
  <!-- Alerts -->
  <div class="absolute bottom-0 p-4 flex flex-col gap-4 w-full">
    <div role="alert" :class="[`alert`, `alert-${a.type}`]" v-for="a in alerts.alerts" :key="a.id">
      <!-- alert icon -->
      <svg 
        v-if="a.type === 'warning'"
        xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <svg 
        v-else-if="a.type === 'success'"
        xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <svg 
        v-else-if="a.type === 'error'"
        xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>      
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p>
        <!-- alert title -->
        <span class="font-semibold" v-if="a.type === 'error'">
          Error!
        </span>
        <span class="font-semibold" v-else-if="a.type === 'warning'">
          Warning!
        </span>
        <span class="font-semibold" v-else-if="a.type === 'success'">
          Success!
        </span>
        <!-- alert message -->
        {{ a.message }}
      </p>
      <div class="flex w-full justify-end">
        <button class="btn btn-sm btn-ghost" @click="alerts.pop(a.id)">
          Dismiss
        </button>
      </div>
    </div>      
  </div>
  
</template>
