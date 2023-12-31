<script setup lang="ts">
    import Card from '@/components/layouts/Card.vue';
import Page from '@/components/layouts/Page.vue';
    import { useAuth } from '@/libraries/firebase/use-auth';
    import { useUserProfile } from '@/state/user-profile';
    import readableDateTime from '@/utilities/readableDateTime';
        
    const auth = useAuth();
    const userProfile = useUserProfile();
</script>

<template>
        <Page>
            
            <!-- User Token Demo -->
            <Card v-if="auth.activeUser" class="max-w-sm mx-auto overflow-hidden">
                <p class="text-lg font-semibold text-primary">
                        User Token
                    </p>
                    <p class="text-xs text-primary">
                        This information comes directly from the authentication token provisioned by Firebase Auth.
                    </p>
                    <div class="divider" />
                    <table class="table table-xs">
                        <tbody>
                            <tr>
                                <th>User ID</th>
                                <td>{{ auth.activeUser.uid }}</td>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <td>
                                    {{ auth.activeUser.email }}
                                    <div class="badge badge-success text-xs ml-2" v-if="auth.activeUser.emailVerified">Verified</div>
                                    <div class="badge badge-warning text-xs ml-2" v-else>Unverified</div>
                                </td>
                            </tr>
                        </tbody> 
                    </table>
            </Card>

            <!-- User Profile Demo -->
            <Card v-if="userProfile.document" class="max-w-sm mx-auto overflow-hidden">
                <p class="text-lg font-semibold text-primary">
                        User Profile
                    </p>
                    <p class="text-xs text-primary">
                        This information is generated and stored in the database on sign up via the <code>createUserProfileOnSignUp</code> Firebase Function.
                    </p>
                    <div class="divider" />
                    <table class="table table-xs">
                        <tbody>
                            <tr>
                                <th>User ID</th>
                                <td>{{ userProfile.document.userId }}</td>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <td>
                                    {{ userProfile.document.email }}
                                </td>
                            </tr>
                            <tr>
                                <th>User Since</th>
                                <td>
                                    {{ readableDateTime(userProfile.document.signedUpAt) }}
                                </td>
                            </tr>
                        </tbody> 
                    </table>            
            </Card>
    </Page>
</template>
