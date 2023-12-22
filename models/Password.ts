import { z } from "zod";

/*
 * one lowercase letter: a-z
 * one uppercase letter: A-Z
 * one digit: 0-9
 * one symbol: ^ $ * . [ ] { } ( ) ? " ! @ # % & / \ , > < ' : ; | _ ~ `
*/
export default z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,4096}$/);
