export function formatJSON(json: any) {
    const jsonString = JSON.stringify(json, null, 2);
    return jsonString.replace(
        /(".*?":|{|\[|\]|}|".*?")/g,
        (match) => {
            if (match.startsWith('"') && match.endsWith('":')) {
                return `<span class="text-blue-400">${match}</span>`;
            } else if (match.startsWith('"')) {
                return `<span class="text-green-400">${match}</span>`;
            } else if (match === '{' || match === '}' || match === '[' || match === ']') {
                return `<span class="text-yellow-500">${match}</span>`;
            }
            return match;
        }
    );
} 