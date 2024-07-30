import React from 'react'

const styles = {
  title: {
    fontSize: 23,
    marginTop: 0,
    marginBottom: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 16,
    fontWeight: 500,
  },
}

export const Title = ({ children, title }: { children?: any; title: any }) => (
  <h2 style={styles.title}>{title || children}</h2>
)

export const BodyText = ({ children, text, className }: { children?: any; text?: any; className?: string }) => (
  <p style={styles.bodyText} className={className}>
    {text || children}
  </p>
)
