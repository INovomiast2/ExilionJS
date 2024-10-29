import { Logger } from './Logger';
import chalk from 'chalk';

const LOGO_SVG = `
  ⚡️ EXILON ⚡️
  ════════════
`;

// Versión ASCII art del logo para terminales que no soportan caracteres especiales
const LOGO_ASCII = `
  /\\  EXILON  /\\
  ==============
`;

export class LogoRenderer {
  static render(color: string = '#3B82F6'): void {
    try {
      Logger.group('');
      console.log(chalk.hex(color)(LOGO_SVG));
      Logger.info(`Version: ${process.env.VERSION || '1.0.0'}`);
      Logger.group('');
    } catch (error) {
      // Fallback para terminales que no soportan colores
      console.log(LOGO_ASCII);
    }
  }

  static renderSmall(): void {
    console.log(chalk.blue('⚡️ EXILON'));
  }

  static renderWithMessage(message: string): void {
    this.renderSmall();
    Logger.info(message);
  }
}
