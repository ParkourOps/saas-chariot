import { ref, type App, watch } from "vue";
import defaultTheme from "tailwindcss/defaultTheme";

const innerWidthPx = ref<number>();
const activeBreakpoint = ref<string>();
const availableBreakpoints = Object.entries(defaultTheme.screens).map(([key, val])=>{
    const _val : number = (typeof val === "number") ? val : parseInt((val as string).replace("px", ""));
    return {key, pxStart: _val};
});

export function useReactiveUserInterface() {
    return {
        innerWidthPx,
        activeBreakpoint,
        availableBreakpoints
    }
};

export default {
    install(app: App) {
        // reactive inner width:
        // set initial val
        innerWidthPx.value = window.innerWidth;
        // listen on resize events to update val
        window.addEventListener("resize", function(){
            innerWidthPx.value = this.innerWidth;
        });

        // reactive active breakpoint:
        // listen on changes to inner width to find applicable breakpoint.
        watch(innerWidthPx, (val)=>{
            if (!val) {
                activeBreakpoint.value = undefined;
            } else {
                const potentialBreakpoints = availableBreakpoints.filter((bp)=>bp.pxStart <= val).sort((a,b)=>(a.pxStart - b.pxStart));
                if (potentialBreakpoints.length < 1) {
                    activeBreakpoint.value = undefined;
                } else {
                    activeBreakpoint.value = potentialBreakpoints[potentialBreakpoints.length - 1].key;
                }
            }
        }, { immediate: true });
        
        // set as custom property:
        // - accessible from template
        // - accesible from setup script using Vue's `getInstance()` method
        app.config.globalProperties.$reactiveUserInterface = useReactiveUserInterface();
    }
}

// declare type for the new custom property.
declare module "vue" {
    interface ComponentCustomProperties {
        $reactiveUserInterface: ReturnType<typeof useReactiveUserInterface>;
    }
}
