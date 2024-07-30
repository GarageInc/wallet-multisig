import storage from '../../../helpers/fakeLocalStorage';

import m001 from '../../../../src/serviceWorker/db/migrations/m001'

describe("Test migration m001", () => {
  
    beforeEach(async () => {
    })
  
    afterEach(async () => {
        storage.clear();
    });
  
    test('uninitialized storage', async () => {
        const knownDestinations = await storage.getItem('knownDestinations');

        expect(knownDestinations).toEqual(null);
    });

    test('No known destinations', async () => {
        await m001(storage, 0);

        const knownDestinationsRaw = await storage.getItem('knownDestinations');
        const knownDestinations = JSON.parse(knownDestinationsRaw);

        expect(knownDestinations).toEqual([]);
    });

    test('Known destination without name', async () => {
        const knownDestinationsData = [{
            accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
            blockchain: 'Ethereum',
            address: '0x0123456789012345678901234567890123456789',
        }];

        await storage.setItem('knownDestinations', JSON.stringify(knownDestinationsData));

        const newStorageVersion = await m001(storage, 0);

        const knownDestinationsRaw = await storage.getItem('knownDestinations');
        const knownDestinations = JSON.parse(knownDestinationsRaw);

        const newKnownDestinationsData = [{
            accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
            blockchain: 'Ethereum',
            address: '0x0123456789012345678901234567890123456789',
            name: 'Address 1',
        }];

        expect(newStorageVersion).toEqual(1);
        expect(knownDestinations).toEqual(newKnownDestinationsData);
    });

    test('Multiple known destinations without name', async () => {
        const knownDestinationsData = [
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456111',
            },
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456222',
            },
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456333',
            }
        ];

        await storage.setItem('knownDestinations', JSON.stringify(knownDestinationsData));

        await m001(storage, 0);

        const knownDestinationsRaw = await storage.getItem('knownDestinations');
        const knownDestinations = JSON.parse(knownDestinationsRaw);

        const newKnownDestinationsData = [
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456111',
                name: 'Address 1',
            },
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456222',
                name: 'Address 2',
            },
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456333',
                name: 'Address 3',
            }
        ];

        expect(knownDestinations).toEqual(newKnownDestinationsData);
    });

    test('Known destination with name', async () => {
        const knownDestinationsData = [{
            accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
            blockchain: 'Ethereum',
            address: '0x0123456789012345678901234567890123456789',
            name: 'My wallet',
        }];

        await storage.setItem('knownDestinations', JSON.stringify(knownDestinationsData));

        await m001(storage, 0);

        const knownDestinationsRaw = await storage.getItem('knownDestinations');
        const knownDestinations = JSON.parse(knownDestinationsRaw);

        const newKnownDestinationsData = [{
            accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
            blockchain: 'Ethereum',
            address: '0x0123456789012345678901234567890123456789',
            name: 'My wallet',
        }];

        expect(knownDestinations).toEqual(newKnownDestinationsData);
    });

    test('Multiple mixed known destinations without name', async () => {
        const knownDestinationsData = [
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456111',
                name: 'My wallet',
            },
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456222',
            },
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456333',
                name: 'My wallet 2',
            }
        ];

        await storage.setItem('knownDestinations', JSON.stringify(knownDestinationsData));

        await m001(storage, 0);

        const knownDestinationsRaw = await storage.getItem('knownDestinations');
        const knownDestinations = JSON.parse(knownDestinationsRaw);

        const newKnownDestinationsData = [
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456111',
                name: 'My wallet',
            },
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456222',
                name: 'Address 1',
            },
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456333',
                name: 'My wallet 2',
            }
        ];

        expect(knownDestinations).toEqual(newKnownDestinationsData);
    });

    test('Multiple mixed known destinations without name (2nd case)', async () => {
        const knownDestinationsData = [
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456111',
            },
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456222',
                name: 'My wallet',
            },
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456333',
            }
        ];

        await storage.setItem('knownDestinations', JSON.stringify(knownDestinationsData));

        await m001(storage, 0);

        const knownDestinationsRaw = await storage.getItem('knownDestinations');
        const knownDestinations = JSON.parse(knownDestinationsRaw);

        const newKnownDestinationsData = [
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456111',
                name: 'Address 1',
            },
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456222',
                name: 'My wallet',
            },
            {
                accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
                blockchain: 'Ethereum',
                address: '0x0123456789012345678901234567890123456333',
                name: 'Address 2',
            }
        ];

        expect(knownDestinations).toEqual(newKnownDestinationsData);
    });

    test('Migration not run if currentStorageVersion is equals', async () => {
        const knownDestinationsData = [{
            accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
            blockchain: 'Ethereum',
            address: '0x0123456789012345678901234567890123456789',
        }];

        await storage.setItem('knownDestinations', JSON.stringify(knownDestinationsData));

        const newMigration = await m001(storage, 1);

        const knownDestinationsRaw = await storage.getItem('knownDestinations');
        const knownDestinations = JSON.parse(knownDestinationsRaw);

        expect(newMigration).toEqual(1);
        expect(knownDestinations).toEqual(knownDestinationsData);
    });  

    test('Migration not run if currentStorageVersion is higher', async () => {
        const knownDestinationsData = [{
            accountPubKey: '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
            blockchain: 'Ethereum',
            address: '0x0123456789012345678901234567890123456789',
        }];

        await storage.setItem('knownDestinations', JSON.stringify(knownDestinationsData));

        const newMigration = await m001(storage, 2);

        const knownDestinationsRaw = await storage.getItem('knownDestinations');
        const knownDestinations = JSON.parse(knownDestinationsRaw);

        expect(newMigration).toEqual(2);
        expect(knownDestinations).toEqual(knownDestinationsData);
    });  
});
  