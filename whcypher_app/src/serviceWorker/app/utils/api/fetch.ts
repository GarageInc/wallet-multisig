import _nodeFetch from 'node-fetch';
import assert from 'assert';

import { GET, POST, DELETE } from './actions';

async function safeParseJSON(response: any) {
  const body: any = await response.text();

  try {
    if (typeof body === 'Object') {
      return {
        body,
        status: response.status,
      };
    } else {
      return {
        body: JSON.parse(body),
        status: response.status,
      };
    }
  } catch (err) {
    return {
      body: {
        type: 'error',
        code: 999,
        message: err,
      },
      status: body.status,
    };
  }
}

const fetchURL = (url: string, option: any) =>
  new Promise((resolve, reject) => {
    _nodeFetch(url, option)
      .then((response: any) => {
        safeParseJSON(response).then((ret) => {
          // const matchUrl = "https://signer.whalesheaven.com/v1/signatures";
          // if ( matchUrl === url ) {
          //   console.log("fetch request: ", url);
          //   console.log("fetch option: ", option);
          //   console.log("fetch response: ", ret);
          // }
          resolve(ret);
        });
      })
      .catch((err) => {
        console.error(err);
        reject(new Error('URL not accessible'));
      });
  });
export const call_api = async function (
  path: string,
  request_body: any,
  action: string,
  requestHeaders: any = null,
  endPoint: string
): Promise<any> {
  assert(action);
  assert(path);

  const option = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // timeout: 60000 * 5,
  };

  endPoint = endPoint.substring(endPoint.length - 1) == '/' ? endPoint : `${endPoint}/`;
  path = endPoint + path;

  if (requestHeaders) {
    switch (action) {
      case GET:
        Object.assign(option, {
          method: 'GET',
        });
        return await fetchURL(path, option);

      case POST:
        Object.assign(option.headers, {
          'X-ACCOUNTPUBKEY': requestHeaders.accountPubKey,
          'X-PARTYPUBKEYSIGNATURE': requestHeaders.partyPubKeySignature,
          'X-PARTYPUBKEY': requestHeaders.partyPubKey,
          'X-BODYSIGNATURE': requestHeaders.bodySignature,
          'X-TIMESTAMP': requestHeaders.timestamp,
          'X-API-VERSION': '2',
        });

        if (typeof request_body == 'string') {
          Object.assign(option, {
            body: request_body,
          });
        } else {
          Object.assign(option, {
            body: JSON.stringify(request_body),
          });
        }

        Object.assign(option, {
          method: 'POST',
        });

        return await fetchURL(path, option);

      case DELETE:
        Object.assign(option.headers, {
          'X-ACCOUNTPUBKEY': requestHeaders.accountPubKey,
          'X-PARTYPUBKEYSIGNATURE': requestHeaders.partyPubKeySignature,
          'X-PARTYPUBKEY': requestHeaders.partyPubKey,
          'X-BODYSIGNATURE': requestHeaders.bodySignature,
          'X-TIMESTAMP': requestHeaders.timestamp,
          'X-API-VERSION': '2',
        });

        if (typeof request_body == 'string') {
          Object.assign(option, {
            body: request_body,
          });
        } else {
          Object.assign(option, {
            body: JSON.stringify(request_body),
          });
        }

        Object.assign(option, {
          method: 'DELETE',
        });

        return await fetchURL(path, option);
    }
  } else {
    switch (action) {
      case GET:
        Object.assign(option, {
          method: 'GET',
        });
        return await fetchURL(path, option);

      case POST:
        Object.assign(option, {
          body: JSON.stringify(request_body),
        });
        Object.assign(option, {
          method: 'POST',
        });
        return await fetchURL(path, option);
    }
  }
};
