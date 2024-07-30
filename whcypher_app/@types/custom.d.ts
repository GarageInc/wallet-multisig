// We need to tell TypeScript that when we write "import styles from './styles.scss' we mean to load a module (to look for a './styles.scss.d.ts').
declare module '*.scss'

// We need to tell TypeScript that when we write "import svg from './file.svg' we mean to load a module.
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module 'random-bigint'
declare module 'hdkey'
declare module 'elliptic'
