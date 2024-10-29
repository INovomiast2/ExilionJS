import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar compresión gzip
app.use(compression());

// Servir archivos estáticos desde el directorio de build
app.use(express.static(path.join(__dirname, '.exilon')));

// Todas las rutas no encontradas redirigen al index.html para el routing del lado del cliente
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '.exilon', 'index.html'));
});

app.listen(PORT, () => {
  console.log('\n' + chalk.blue('✨ Exilon App iniciada en producción'));
  console.log(chalk.green(`🚀 Servidor corriendo en http://localhost:${PORT}`));
  console.log(chalk.gray('------------------------------------------'));
  console.log(chalk.yellow('💡 Presiona Ctrl+C para detener el servidor\n'));
});

// Manejo de errores
app.on('error', (error) => {
  console.error(chalk.red('Error en el servidor:'), error);
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\n👋 Cerrando servidor...'));
  process.exit(0);
}); 