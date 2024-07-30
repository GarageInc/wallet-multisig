// Return dereference value because of the way how Firefox handles memory
// "can't access dead object" issue on the FF
// https://stackoverflow.com/questions/52618377/firefox-web-extension-cant-access-dead-object-error

// TODO: avoid JSON for copy, use lodash deepCopy instead
// https://medium.com/@pmzubar/why-json-parse-json-stringify-is-a-bad-practice-to-clone-an-object-in-javascript-b28ac5e36521
export const deReferenceValue = (value?: any) => value && JSON.parse(JSON.stringify(value))
