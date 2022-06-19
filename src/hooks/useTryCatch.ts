// More like a helper function rather than a hook
// Used to make the try catch logic less redundant
import genericError from 'utils/error-handling';

export default async function useTryCatch(
  callbackFunction: Function,
  isAsync?: boolean,
) {
  try {
    if (isAsync) {
      await callbackFunction();
    } else {
      callbackFunction();
    }
  } catch {
    genericError();
  }
}
