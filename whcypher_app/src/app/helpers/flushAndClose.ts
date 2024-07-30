import { waitForSync } from "src/serviceWorker/app/utils/dbHelper";

export const flushAndClose = async () => waitForSync().then(() => window.close())
