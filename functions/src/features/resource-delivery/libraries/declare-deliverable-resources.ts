import {z} from "zod";
import DeliverableResourceRecord from "@/_shared_/models/features/resource-delivery/DeliverableResourceRecord";

type DeliverableResourceRecord = z.infer<typeof DeliverableResourceRecord>;
type DeliverableResourceDirectory = {
    [key: string]: DeliverableResourceRecord,
}

const declareDeliverableResources = (directory: DeliverableResourceDirectory) => directory;

export default declareDeliverableResources;
