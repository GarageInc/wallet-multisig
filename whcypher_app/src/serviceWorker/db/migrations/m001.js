import { cloneDeep } from 'lodash';

const migrationVersion = 1;

export default async (storage, currentStorageVersion) => {
    if (currentStorageVersion >= migrationVersion) {
        return currentStorageVersion;
    }

    try {
        let knownDestinations = [];

        const destinationsInStorageJSON = await storage.getItem('knownDestinations');
        if (destinationsInStorageJSON) {
          knownDestinations = JSON.parse(destinationsInStorageJSON);
        }

        let counter = 1;

        const updatedKnownDestinations = knownDestinations.map((knownDestination) => {
            const newKnownDestination = cloneDeep(knownDestination);

            if (!newKnownDestination.name) {
                newKnownDestination.name = `Address ${counter}`;
                counter += 1;
            }

            return newKnownDestination;
        });

        await storage.setItem('knownDestinations', JSON.stringify(updatedKnownDestinations));

    } catch (ignore) {
        // ignore
        return currentStorageVersion;
    }

    return migrationVersion;
};
  