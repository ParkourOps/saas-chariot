<script setup lang="ts">
import LogoStamp from "@/assets/images/LogoStamp.vue";
import configs from "@/configs";
import { getNextDateByDayOfWeek, type DayOfWeek, type TimeZone } from "@/utilities/date-time";
import dayjs from "@/libraries/dayjs";

const props = defineProps<{
    showEmail: "text" | "button";
    showPhone?: boolean;
}>();

function getFormattedTimeForNextDateByDayOfWeek(dayOfWeek: DayOfWeek, hours: number, minutes: number, seconds: number = 0, timeZone: TimeZone = "UTC", format: string = "h:mma") {
    let nearestDate = getNextDateByDayOfWeek(timeZone === "UTC" ? dayjs().utc() : dayjs().tz(timeZone), dayOfWeek);
    nearestDate = nearestDate.set("hours", hours).set("minutes", minutes).set("seconds", seconds);
    return nearestDate.format(format);
}
</script>

<template>
    <div class="grid grid-cols-1 gap-8 bg-base-300 fill-secondary px-6 pb-6 pt-8 text-secondary sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:px-12">
        <!-- App Logo, Name, Slogan -->
        <div class="lg:col-start-2" :class="[{ 'sm:col-span-full lg:col-span-1': !configs.contact.officeHours }, { 'lg:row-span-2': configs.contact.officeHours }]">
            <LogoStamp show-title show-subtitle @click="$router.push({name:'/'})" class="cursor-pointer" />
        </div>

        <!-- Company, Address -->
        <div v-if="configs.contact?.address" class="text-center text-sm sm:self-center lg:col-start-3 lg:self-end lg:text-right leading-tight">
            <p v-if="configs.contact?.company?.name" class="font-bold">
                {{ configs.contact.company.name }}
            </p>
            <div v-else class="mb-2 inline-flex flex-row items-center text-base sm:mb-4 sm:text-sm sm:font-semibold lg:mb-2 lg:text-base lg:font-normal">
                <SvgIcon name="fi-ss-home" class="mr-2 h-4" />
                Address
            </div>
            <p v-if="configs.contact?.company?.number" class="-mt-1 mb-1 opacity-70">Company # {{ configs.contact.company.number }}</p>
            <p v-for="(line, idx) in configs.contact.address.lines" :key="`addr-l-#${idx}`">
                {{ line }}
            </p>
        </div>

        <!-- Office Hours -->
        <div v-if="configs.contact?.officeHours" class="flex flex-col items-center justify-center sm:col-start-2 sm:row-start-2 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:justify-start lg:justify-self-start">
            <div tabindex="0" class="collapse collapse-arrow w-fit bg-secondary text-neutral sm:collapse-open sm:mx-auto sm:bg-transparent sm:text-secondary">
                <div class="collapse-title min-h-0 rounded-box py-2 font-semibold sm:rounded-b-none sm:after:text-transparent">
                    <div class="flex flex-row items-center justify-center text-sm">
                        <i class="fi fi-ss-clock mr-2"></i>
                        <SvgIcon name="" />
                        <span class="hidden sm:inline-block">Office Hours</span>
                        <span class="sm:hidden">View Office Hours</span>
                    </div>
                </div>
                <div class="collapse-content rounded-b-box">
                    <table v-if="configs.contact?.officeHours" class="mx-auto mt-2 text-sm">
                        <tr v-if="configs.contact.officeHours.monday">
                            <td>
                                <p class="mr-4 font-semibold">Monday</p>
                            </td>
                            <td>
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Monday",
                                        configs.contact.officeHours.monday.from.hours,
                                        configs.contact.officeHours.monday.from.minutes,
                                        configs.contact.officeHours.monday.from.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                                -
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Monday",
                                        configs.contact.officeHours.monday.to.hours,
                                        configs.contact.officeHours.monday.to.minutes,
                                        configs.contact.officeHours.monday.to.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                            </td>
                        </tr>
                        <tr v-if="configs.contact.officeHours.tuesday">
                            <td>
                                <p class="mr-4 font-semibold">Tuesday</p>
                            </td>
                            <td>
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Tuesday",
                                        configs.contact.officeHours.tuesday.from.hours,
                                        configs.contact.officeHours.tuesday.from.minutes,
                                        configs.contact.officeHours.tuesday.from.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                                -
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Tuesday",
                                        configs.contact.officeHours.tuesday.to.hours,
                                        configs.contact.officeHours.tuesday.to.minutes,
                                        configs.contact.officeHours.tuesday.to.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                            </td>
                        </tr>
                        <tr v-if="configs.contact.officeHours.wednesday">
                            <td>
                                <p class="mr-4 font-semibold">Wednesday</p>
                            </td>
                            <td>
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Wednesday",
                                        configs.contact.officeHours.wednesday.from.hours,
                                        configs.contact.officeHours.wednesday.from.minutes,
                                        configs.contact.officeHours.wednesday.from.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                                -
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Wednesday",
                                        configs.contact.officeHours.wednesday.to.hours,
                                        configs.contact.officeHours.wednesday.to.minutes,
                                        configs.contact.officeHours.wednesday.to.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                            </td>
                        </tr>
                        <tr v-if="configs.contact.officeHours.thursday">
                            <td>
                                <p class="mr-4 font-semibold">Thursday</p>
                            </td>
                            <td>
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Thursday",
                                        configs.contact.officeHours.thursday.from.hours,
                                        configs.contact.officeHours.thursday.from.minutes,
                                        configs.contact.officeHours.thursday.from.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                                -
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Thursday",
                                        configs.contact.officeHours.thursday.to.hours,
                                        configs.contact.officeHours.thursday.to.minutes,
                                        configs.contact.officeHours.thursday.to.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                            </td>
                        </tr>
                        <tr v-if="configs.contact.officeHours.friday">
                            <td>
                                <p class="mr-4 font-semibold">Friday</p>
                            </td>
                            <td>
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Friday",
                                        configs.contact.officeHours.friday.from.hours,
                                        configs.contact.officeHours.friday.from.minutes,
                                        configs.contact.officeHours.friday.from.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                                -
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Friday",
                                        configs.contact.officeHours.friday.to.hours,
                                        configs.contact.officeHours.friday.to.minutes,
                                        configs.contact.officeHours.friday.to.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                            </td>
                        </tr>
                        <tr v-if="configs.contact.officeHours.saturday">
                            <td>
                                <p class="mr-4 font-semibold">Saturday</p>
                            </td>
                            <td>
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Saturday",
                                        configs.contact.officeHours.saturday.from.hours,
                                        configs.contact.officeHours.saturday.from.minutes,
                                        configs.contact.officeHours.saturday.from.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                                -
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Saturday",
                                        configs.contact.officeHours.saturday.to.hours,
                                        configs.contact.officeHours.saturday.to.minutes,
                                        configs.contact.officeHours.saturday.to.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                            </td>
                        </tr>
                        <tr v-if="configs.contact.officeHours.sunday">
                            <td>
                                <p class="mr-4 font-semibold">Sunday</p>
                            </td>
                            <td>
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Sunday",
                                        configs.contact.officeHours.sunday.from.hours,
                                        configs.contact.officeHours.sunday.from.minutes,
                                        configs.contact.officeHours.sunday.from.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                                -
                                {{
                                    getFormattedTimeForNextDateByDayOfWeek(
                                        "Sunday",
                                        configs.contact.officeHours.sunday.to.hours,
                                        configs.contact.officeHours.sunday.to.minutes,
                                        configs.contact.officeHours.sunday.to.seconds ?? undefined,
                                        configs.contact.timeZone,
                                    )
                                }}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <!-- Contact Info -->
        <div
            class="flex flex-col items-center justify-center gap-2 sm:row-start-2 sm:gap-4 lg:col-start-3 lg:items-end lg:gap-2"
            :class="[{ 'sm:col-start-1': configs.contact.officeHours }, { 'sm:col-start-2': !configs.contact.officeHours }]"
        >
            <p v-if="configs.contact?.phone && props.showPhone">
                <i class="fi "></i>
                {{ configs.contact.phone }}
            </p>
            <p v-if="configs.contact?.email && props.showEmail === 'text'">
                <i class="fi fi-ss-envelope"></i>
                {{ configs.contact.email.email }}
            </p>
            <Button 
                v-if="configs.contact?.email && props.showEmail === 'button'" 
                icon-left="fi-ss-envelope"
                label="Get in Touch"
                variant="secondary"
                :action="() => $showModal(() => import('./modals/ModalContactForm.vue'), {})"
            />
        </div>

        <!-- Internal Links -->
        <div
            class="col-span-full mb-1 flex flex-col items-center justify-center gap-4 text-sm font-semibold underline sm:mt-3 sm:flex-row sm:gap-8 leading-none"
            :class="[
                {
                    'lg:col-span-1 lg:row-start-1 lg:flex-col lg:items-start lg:justify-end lg:gap-4': !configs.contact.officeHours,
                },
                { 'lg:row-span-2': !configs.contact.officeHours && !configs.social },
            ]"
        >
            <RouterLink :to="{ name: '/privacy-policy' }">Privacy Policy</RouterLink>
            <RouterLink :to="{ name: '/terms-and-conditions' }">Terms and Conditions</RouterLink>
        </div>

        <!-- Social Media Icons -->
        <div
            v-if="configs.social"
            class="col-span-full flex flex-row flex-wrap items-center justify-center gap-3 px-4"
            :class="[
                {
                    'lg:col-span-2 lg:items-end lg:justify-start lg:px-0': !configs.contact.officeHours,
                },
            ]"
        >
            <!-- <button v-if="configs.social?.gitHub" class="btn btn-circle btn-secondary btn-sm">
                <i class="fi fi-brands-github text-[1.34rem]"></i>
            </button>
            <button v-if="configs.social?.linkedIn" class="btn btn-circle btn-secondary btn-sm">
                <i class="fi fi-brands-linkedin -mr-1 text-[1.34rem]"></i>
            </button>
            <button v-if="configs.social?.facebook" class="btn btn-circle btn-secondary btn-sm">
                <i class="fi fi-brands-facebook text-[1.34rem]"></i>
            </button>
            <button v-if="configs.social?.instagram" class="btn btn-circle btn-secondary btn-sm">
                <i class="fi fi-brands-instagram text-[1.34rem]"></i>
            </button>
            <button v-if="configs.social?.youTube" class="btn btn-circle btn-secondary btn-sm">
                <i class="fi fi-brands-youtube text-[1.34rem]"></i>
            </button>
            <button v-if="configs.social?.tikTok" class="btn btn-circle btn-secondary btn-sm">
                <i class="fi fi-brands-tik-tok text-[1.34rem]"></i>
            </button>
            <button v-if="configs.social?.telegram" class="btn btn-circle btn-secondary btn-sm">
                <i class="fi fi-brands-telegram text-[1.34rem]"></i>
            </button>
            <button v-if="configs.social?.x" class="btn btn-circle btn-secondary btn-sm">
                <i class="fi fi-brands-twitter-alt text-[1.34rem]"></i>
            </button>
            <button v-if="configs.social?.pinterest" class="btn btn-circle btn-secondary btn-sm">
                <i class="fi fi-brands-pinterest text-[1.34rem]"></i>
            </button>
            <button v-if="configs.social?.reddit" class="btn btn-circle btn-secondary btn-sm">
                <i class="fi fi-brands-reddit text-[1.34rem]"></i>
            </button>
            <button v-if="configs.social?.discord" class="btn btn-circle btn-secondary btn-sm">
                <i class="fi fi-brands-discord text-[1.34rem]"></i>
            </button> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
.collapse-title {
    padding-inline: 0;
}
.collapse {
    &:focus {
        .collapse-title {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
}
</style>
