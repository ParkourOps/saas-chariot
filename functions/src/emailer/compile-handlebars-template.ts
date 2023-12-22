import handlebars from "handlebars";

/**
 * Description placeholder
 *
 * @export
 * @param {string} template
 * @param {Record<string, unknown>} templateSubstitution
 * @return {*}
 */
export default function(template: string, templateSubstitution: Record<string, unknown>) {
  handlebars
    .registerHelper({
      eq: (v1, v2) => v1 === v2,
      ne: (v1, v2) => v1 !== v2,
      lt: (v1, v2) => v1 < v2,
      gt: (v1, v2) => v1 > v2,
      lte: (v1, v2) => v1 <= v2,
      gte: (v1, v2) => v1 >= v2,
      and(...args: unknown[]) {
        return Array.prototype.every.call(args, Boolean);
      },
      or(...args: unknown[]) {
        return Array.prototype.slice.call(args, 0, -1).some(Boolean);
      },
    });
  return handlebars.compile(template)(templateSubstitution);
}
