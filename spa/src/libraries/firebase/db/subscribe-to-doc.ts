import { defineStore } from "pinia";
import { useAuth } from "../auth";
import { doc, getFirestore, onSnapshot, type Unsubscribe } from "firebase/firestore";
import { z, ZodObject } from "zod";
import { ref, watch } from "vue";
import { app } from "../firebase";

/**
 * Creates a Pinia store that will subscribe to a document in Firestore and automatically
 * fetch the document when the user logs in and on every update. When the user logs out,
 * it will automatically clean the document and unsubscribe from changes.
 *
 * @param storeName
 * @param schema
 * @param pathFromUser
 * @returns
 */
export default function subscribeToDoc<A extends z.ZodRawShape, B extends z.UnknownKeysParam, C extends z.ZodTypeAny, D>(
    storeName: string,
    schema: ZodObject<A, B, C, D, D>,
    path: {
        base: "user" | "customer";
        path: string;
    },
) {
    const auth = useAuth();
    type EntityType = z.infer<typeof schema>;

    const store = defineStore(storeName, () => {
        const document = ref<EntityType>();
        let unsubscribe: Unsubscribe | undefined;
        watch(
            () => auth.activeUser,
            async (user) : Promise<void> => {
                if (!user) {
                    document.value = undefined;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                } else {
                    const db = getFirestore(app);
                    const _path = path.base === "user" ? `user/${user.uid}${path.path ? "/" + path.path : ""}` : `customer/${user.email}${path.path ? "/" + path.path : ""}`;
                    const docRef = doc(db, _path);
                    unsubscribe = onSnapshot(docRef, (snapshot) => {
                        if (snapshot.exists()) {
                            document.value = snapshot.data() as D; // force infer
                            console.log(snapshot.data());
                        }
                    });
                }
            },
            { immediate: true },
        );

        return {
            document,
        };
    });

    return store;
}
