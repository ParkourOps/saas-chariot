import { defineStore } from "pinia";
import { useAuth } from "./use-auth";
import firebase from "./firebase";
import {collection, onSnapshot, type Unsubscribe} from "firebase/firestore";
import { z, ZodObject } from "zod";
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
export function subscribeToCollection<
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
        const documents = ref<Array<EntityType>>();
        let unsubscribe : Unsubscribe | undefined;
        watch(()=>auth.activeUser, (user)=>{
            if (!user) {
                documents.value = undefined;
                if (unsubscribe) {
                    unsubscribe();
                }
            } else {
                const path = pathFromUser ? `user/${user.uid}/${pathFromUser}` : `user/${user.uid}`;
                const colRef = collection(firebase.db, path);
                unsubscribe = onSnapshot(colRef, (snapshot)=>{
                    const result : Array<EntityType> = [];
                    snapshot.docs.forEach((doc)=>{
                        if (doc.exists()) {
                            result.push(doc.data() as D); // force infer
                        }
                    });
                    console.log(result);
                    documents.value = result;
                });
            }
        }, { immediate: true });

        return {
            documents
        }
    });

    return store;
}
