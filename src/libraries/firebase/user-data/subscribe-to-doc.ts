import { defineStore } from "pinia";
import { useAuth } from "..";
import firebase from "../firebase";
import {doc, onSnapshot, type Unsubscribe} from "firebase/firestore";
import { z, ZodObject, ZodUndefined } from "zod";
import { ref, watch } from "vue";

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
export function subscribeToDoc<
    A extends z.ZodRawShape,
    B extends z.UnknownKeysParam,
    C extends z.ZodTypeAny,
    D
>(
    storeName: string, 
    schema: ZodObject<A,B,C,D,D>, 
    pathFromUser?: string
) {
    const auth = useAuth();
    type EntityType = z.infer<typeof schema>;

    const store = defineStore(storeName, ()=>{
        const document = ref<EntityType>();
        let unsubscribe : Unsubscribe | undefined;
        watch(()=>auth.activeUser, (user)=>{
            if (!user) {
                document.value = undefined;
                if (unsubscribe) {
                    unsubscribe();
                }
            } else {
                const path = pathFromUser ? `user/${user.uid}/${pathFromUser}` : `user/${user.uid}`;
                const docRef = doc(firebase.db, path);
                unsubscribe = onSnapshot(docRef, (snapshot)=>{
                    if (snapshot.exists()) {
                        document.value = snapshot.data() as D; // force infer
                        console.log(snapshot.data());
                    }
                });
            }
        }, { immediate: true });

        return {
            document
        }
    });

    return store;
}
