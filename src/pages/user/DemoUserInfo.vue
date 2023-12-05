<script setup lang="ts">
import { useAuth } from '@/libraries/firebase/use-auth';
import { useUserProfile } from '@/state/user-profile';
import readableDateTime from '@/utilities/readableDateTime';
    
    const auth = useAuth();
    const userProfile = useUserProfile();
</script>

<template>
        <div class="max-w-prose mx-auto mt-12 px-4 sm:px-0">
            <!-- User Token Demo -->
            <div class="card max-w-sm bg-neutral shadow-xl mx-auto mb-12" v-if="auth.activeUser">
                <div class="card-body">
                    <p class="text-lg font-semibold text-primary">
                        User Token
                    </p>
                    <p class="mb-4 text-xs text-primary">
                        This information comes directly from the authentication token provisioned by Firebase Auth.
                    </p>
                    <table class="table table-xs">
                        <tbody>
                            <tr>
                                <th>User ID</th>
                                <tc>{{ auth.activeUser.uid }}</tc>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <tc>
                                    {{ auth.activeUser.email }}
                                    <div class="badge badge-success text-xs ml-2" v-if="auth.activeUser.emailVerified">Verified</div>
                                    <div class="badge badge-warning text-xs ml-2" v-else>Unverified</div>
                                </tc>
                            </tr>
                        </tbody> 
                    </table>
                </div>
            </div>

            <!-- User Profile Demo -->
            <div class="card max-w-sm bg-neutral shadow-xl mx-auto" v-if="userProfile.document">
                <div class="card-body">
                    <p class="text-lg font-semibold text-primary">
                        User Profile
                    </p>
                    <p class="mb-4 text-xs text-primary">
                        This information is generated and stored in the database on sign up via the <code>createUserProfileOnSignUp</code> Firebase Function.
                    </p>
                    <table class="table table-xs">
                        <tbody>
                            <tr>
                                <th>User ID</th>
                                <tc>{{ userProfile.document.userId }}</tc>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <tc>
                                    {{ userProfile.document.email }}
                                </tc>
                            </tr>
                            <tr>
                                <th>User Since</th>
                                <tc>
                                    {{ readableDateTime(userProfile.document.signedUpAt) }}
                                </tc>
                            </tr>
                        </tbody> 
                    </table>
                </div>
            </div>

    </div>
</template>
