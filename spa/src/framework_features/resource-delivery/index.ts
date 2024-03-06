import GetResourceInfo from "@/_shared_/models/features/resource-delivery/api/GetResourceInfo";
import { useFuncs } from "@/libraries/firebase/funcs";

const functions = useFuncs();

export const getResourceInfo = functions.createCaller(GetResourceInfo);
