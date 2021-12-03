export interface ThemeProps {
  background: string;
  text: string;
  button: string;
  vertexbg: string;
}

export const darkTheme: ThemeProps = {
  background: 'var(--dark-background)',
  text: 'var(--dark-text)',
  button: 'var(--dark-button)',
  vertexbg: 'var(--dark-vertexbg)',
}

export const lightTheme: ThemeProps = {
  background: 'var(--light-background)',
  text: 'var(--light-text)',
  button: 'var(--light-button)',
  vertexbg: 'var(--light-vertexbg)',
}