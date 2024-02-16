import {v4 as uuidv4} from "uuid";

function create(specification?: { prefix?: string; suffix?: string }) {
    let id = uuidv4();
    if (specification?.prefix) {
        id = specification.prefix + id;
    }
    if (specification?.suffix) {
        id = id + specification.suffix;
    }
    return id;
}

export default {
    create,
};
