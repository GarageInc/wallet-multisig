export const memoizer = function (fun: any, cacheFor_millis: number) {
  const cache: any = {};
  return function (n: any, ...args: any) {
    if (cache[n] != undefined && cache[n].cachedAt + cacheFor_millis > Date.now()) {
      return cache[n].result;
    } else {
      const result = fun(n, ...args);
      const cachedAt = +Date.now();
      cache[n] = { result, cachedAt };
      return result;
    }
  };
};

export const fetchMetaData = async function (uri: string, options = { method: 'GET' }) {
  try {
    const url = new URL(uri);
    let response;

    if (url.protocol === 'http:' || url.protocol === 'https:') {
      response = await fetch(uri, options);
    } else if (url.protocol === 'ipfs:') {
      uri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
      response = await fetch(uri, options);
    }

    return await response?.json();
  } catch (error) {
    return null;
  }
};

const tokenExplorerEndpoints = {
  PRODUCTION: 'https://signer.whalesheaven.com/v1',
  DEV: 'http://localhost:3001/v1',
}

export const getTokenExplorerEndpoint = () => {
  return process.env.REACT_APP_DEV_API === 'true' ? tokenExplorerEndpoints.DEV : tokenExplorerEndpoints.PRODUCTION
}

export default {
  fetchMetaData,
  memoizer,
};
