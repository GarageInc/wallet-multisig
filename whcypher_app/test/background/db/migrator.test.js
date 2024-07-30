import storage from '../../helpers/fakeLocalStorage';

import { migrationRunner } from '../../../src/serviceWorker/db/migrator';

describe("Test migrator", () => {
    let migration1, migration2, migration3;
    let migrationLogic1, migrationLogic2, migrationLogic3;
  
    beforeEach(async () => {
        migrationLogic1 = jest.fn();
        migrationLogic2 = jest.fn();
        migrationLogic3 = jest.fn();

        migration1 = jest.fn(async (storage, currentStorageVersion) => {
            const migrationVersion = 1;
        
            if (currentStorageVersion >= migrationVersion) {
                return currentStorageVersion;
            }

            migrationLogic1();
        
            return migrationVersion;
        });
        
        migration2 = jest.fn(async (storage, currentStorageVersion) => {
            const migrationVersion = 2;
        
            if (currentStorageVersion >= migrationVersion) {
                return currentStorageVersion;
            }

            migrationLogic2();
        
            return migrationVersion;
        });
        
        migration3 = jest.fn(async (storage, currentStorageVersion) => {
            const migrationVersion = 3;
        
            if (currentStorageVersion >= migrationVersion) {
                return currentStorageVersion;
            }

            migrationLogic3();
        
            return migrationVersion;
        });
    })
  
    afterEach(async () => {
        storage.clear();
    });

    test('uninitialized storage', async () => {
        const migrations = await storage.getItem('migrations');

        expect(migrations).toEqual(null);
    });

    test('Run single migration', async () => {
        await migrationRunner(storage, [migration1]);
        const migrations = await storage.getItem('migrations');

        expect(migration1).toHaveBeenCalledTimes(1);
        expect(migrationLogic1).toHaveBeenCalledTimes(1);
        expect(migrations).toEqual("[1]");
    });

    test('Run multiple migrations migration', async () => {
        await migrationRunner(storage, [migration1, migration2, migration3]);
        const migrations = await storage.getItem('migrations');

        expect(migration1).toHaveBeenCalledTimes(1);
        expect(migrationLogic1).toHaveBeenCalledTimes(1);
        expect(migration2).toHaveBeenCalledTimes(1);
        expect(migrationLogic2).toHaveBeenCalledTimes(1);
        expect(migration3).toHaveBeenCalledTimes(1);
        expect(migrationLogic3).toHaveBeenCalledTimes(1);
        expect(migrations).toEqual("[1,2,3]");
    });

    test('Run remaining migrations', async () => {
        await storage.setItem('migrations', JSON.stringify([1,2]));

        await migrationRunner(storage, [migration1, migration2, migration3]);
        const migrations = await storage.getItem('migrations');

        expect(migration1).toHaveBeenCalledTimes(1);
        expect(migrationLogic1).toHaveBeenCalledTimes(0);
        expect(migration2).toHaveBeenCalledTimes(1);
        expect(migrationLogic2).toHaveBeenCalledTimes(0);
        expect(migration3).toHaveBeenCalledTimes(1);
        expect(migrationLogic3).toHaveBeenCalledTimes(1);
        expect(migrations).toEqual("[1,2,3]");
    });

    test('Do not run migrations multiple times', async () => {
        await storage.setItem('migrations', JSON.stringify([1,2,3]));

        await migrationRunner(storage, [migration1, migration2, migration3]);
        const migrations = await storage.getItem('migrations');

        expect(migration1).toHaveBeenCalledTimes(1);
        expect(migrationLogic1).toHaveBeenCalledTimes(0);
        expect(migration2).toHaveBeenCalledTimes(1);
        expect(migrationLogic2).toHaveBeenCalledTimes(0);
        expect(migration3).toHaveBeenCalledTimes(1);
        expect(migrationLogic3).toHaveBeenCalledTimes(0);
        expect(migrations).toEqual("[1,2,3]");
    });

});