<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { useToastNotification } from './state/toast-notifications';
  import { useAlerts } from './state/alerts';
  import Spinner from '@/components/ui/Spinner.vue';
  import { useBusyStatus } from './state/busy-status';

  const notifications = useToastNotification();
  const alerts = useAlerts();
  const busyStatus = useBusyStatus();
</script>

<template>
  <RouterView />

  <!-- Toast Notifications -->
  <div class="toast toast-top toast-end">
    <div 
      v-for="n in notifications.notifications" :key="n.id"
      :class="[
        `alert`, 
        { 'alert-info': n.colour === 'primary' },
        { 'alert-success': n.colour === 'secondary' },
        { 'alert-warning': n.colour === 'accent' },
        { 'alert-error': n.colour === 'neutral' },
        { 'alert-info': n.colour === 'info' },
        { 'alert-success': n.colour === 'success' },
        { 'alert-warning': n.colour === 'warning' },
        { 'alert-error': n.colour === 'error' }
      ]" 
    >
      <div>
        <p class="font-semibold text-sm">{{ n.title }}</p>
        <p>{{ n.message }}</p>
      </div>
    </div>
  </div>

  <!-- Alerts -->
  <div class="absolute bottom-0 p-4 flex flex-col gap-4 w-full">
    <div 
      v-for="a in alerts.alerts" :key="a.id"
      role="alert" 
      :class="[
        `alert`, 
        { 'alert-info': a.type === 'info' },
        { 'alert-success': a.type === 'success' },
        { 'alert-warning': a.type === 'warning' },
        { 'alert-error': a.type === 'error' }
      ]"
    >
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
  
  <!-- -->
  <div class="bg-base-content/80 fixed h-screen w-screen top-0 flex flex-col justify-center items-center pb-16" v-if="busyStatus.busy">
      <Spinner />
  </div>
</template>


