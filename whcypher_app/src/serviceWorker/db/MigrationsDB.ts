import LocalStorage from './localStorage'

/**
 * A secret vault
 * @class
 */
class MigrationsDB {
  storage: LocalStorage
  migrations: string[]

  constructor(storage: LocalStorage) {
    this.storage = storage || new LocalStorage()
    this.migrations = []
  }

  // Refactored
  async raiseMigration(version: string) {
    await this._loadMigrations()

    const migrationExists = this.migrations.some((recordedVersion) => recordedVersion === version)

    if (!migrationExists) {
      this.migrations.push(version)
      await this.storage.setItem('migrations', JSON.stringify(this.migrations))
    }

    return this.migrations
  }

  // Refactored
  async getMigrations() {
    return await this._loadMigrations()
  }

  async getCurrentVersion() {
    await this._loadMigrations()

    return this.migrations[this.migrations.length - 1] || 0
  }

  // Refactored
  async _loadMigrations() {
    const migrationsInStorageJSON: string | null = await this.storage.getItem('migrations')
    if (migrationsInStorageJSON) {
      this.migrations = JSON.parse(migrationsInStorageJSON)
    }
    return this.migrations || []
  }
}

export default MigrationsDB
