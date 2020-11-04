import html2canvas from 'html2canvas';
import { GMAIL_DARK_THEME_CLASS } from '../constants';

const takeScreenshot = () => {
  const themeBackground = document.querySelector<HTMLDivElement>('.vI8oZc.yL');
  if (themeBackground) {
    themeBackground.style.width = '100vw';
    themeBackground.style.height = '100vh';
    themeBackground.style.position = 'absolute';
    return html2canvas(themeBackground).then((canvas) => {
      document.body.appendChild(canvas);
      const canvasData = canvas.toDataURL();
      return canvasData;
    });
  }
}

export interface ThemeElements {
  background: string;
  backgroundColor: string;
  backgroundImage: string;
  backgroundPosition: string;
  backgroundSize: string;
  backgroundRepeat: string;
}

export interface ThemeOptions {
  isDark: boolean;
  themeElements?: ThemeElements[];
}

const getThemeElements = () => {
  const themeBackgroundContainer = document.querySelector<HTMLDivElement>('.vI8oZc.yL');
  const themeBackgroundChildren = themeBackgroundContainer?.children;
  if (themeBackgroundChildren) {
    return Array.from(themeBackgroundChildren).map((backgroundChild) => {
      if (backgroundChild.children.length) {
        backgroundChild = backgroundChild.children.item(0) as HTMLElement;
      }
      const computedStyles = window.getComputedStyle(backgroundChild, null);
      computedStyles.background
      const themeElements: ThemeElements = {
        background: computedStyles.background,
        backgroundColor: computedStyles.backgroundColor,
        backgroundImage: computedStyles.backgroundImage,
        backgroundPosition: computedStyles.backgroundPosition,
        backgroundSize: computedStyles.backgroundSize,
        backgroundRepeat: computedStyles.backgroundRepeat,
      }
      return themeElements;
    });
  }
}

const isDarkMode = () => {
  return !!(document.querySelector('body')?.classList.contains(GMAIL_DARK_THEME_CLASS));
}

export const getTheme = (): ThemeOptions => {
  return {
    isDark: isDarkMode(),
    themeElements: getThemeElements(),
  }
}
