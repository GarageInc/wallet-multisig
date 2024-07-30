import LocalStorage from './localStorage'
import migrations from './migrations'
import MigrationsDB from './MigrationsDB'

const migrator = async (extStorage = null) => {
  const storage = extStorage || new LocalStorage()
  return await migrationRunner(storage, migrations)
}

export const migrationRunner = async (storage: LocalStorage, migrationsArray: any[]) => {
  const migrationsDB = new MigrationsDB(storage)
  let migratedData = false

  for (const migration of migrationsArray) {
    const currentVersion = await migrationsDB.getCurrentVersion()
    const newVersion = await migration(storage, currentVersion)
    if (currentVersion !== newVersion) {
      migratedData = true
      await migrationsDB.raiseMigration(newVersion)
    }
  }
  return migratedData
}

export default migrator
