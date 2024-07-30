// wait a bit before finishing, just to make sure redux was updated
// Apparently Redux integration is somehow state dependent and seems to be nullifying state if response is closed to early
export const waitForSync = async (millis = 20) => {
  await new Promise((r) => setTimeout(r, millis))
  return
}
