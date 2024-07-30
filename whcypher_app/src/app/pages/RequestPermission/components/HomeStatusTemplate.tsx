import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid } from '@material-ui/core';


import styles from './HomeStatusTemplate.module.scss';

import { formatName } from '../../../helpers/formatters';
import ChangeAccountButton from './ChangeAccountButton';
import { createAvatarSvg } from 'src/app/helpers/publicKeyImageCreator';


const HomeStatusTemplate = ({ name, pubKey } = {}) => {
  const [svgAvatar, setSvgAvatar] = useState();

  useEffect(() => {
    const svg = pubKey && createAvatarSvg(pubKey);
    setSvgAvatar(svg);
  }, []);

  return (
    <>
      <Container classes={{ root: styles.container }}>
        <Typography classes={{ root: styles.title }}>You will sign in as</Typography>
        <div className={styles.accountWrapper }>
          {svgAvatar && (
            <div className={styles.accountSubWrapper}>
              <img
                alt="avatar"
                className={styles.avatar}
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svgAvatar)}`}
              />
              <span>
                {formatName(name)}
              </span>
            </div>
          )}
        </div>
        <ChangeAccountButton />
      </Container>
      <Grid
        container
        direction="row"
        style={{ padding: 16 }}
        spacing={2}
      />
    </>
  );
};
export default HomeStatusTemplate;
