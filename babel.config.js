module.exports = function (api) {
  api.cache(true);  // Esto habilita la caché de Babel

  return {
    presets: ['babel-preset-expo'],  // Presets que ya tienes configurados
    plugins: [
      [
        'module:react-native-dotenv', // Plugin para cargar las variables de entorno
        {
          envName: 'APP_ENV',  // Si tienes una variable de entorno específica para tu app, la defines aquí
          moduleName: '@env',  // Nombre del módulo donde se exportarán las variables
          path: '.env',  // Archivo de variables de entorno
          blocklist: null,  // Lista de variables a bloquear (opcional)
          allowlist: null,  // Lista de variables permitidas (opcional)
          blacklist: null,  // Deprecated, no lo necesitas
          whitelist: null,  // Deprecated, no lo necesitas
          safe: false,  // Si lo configuras en true, lanzará errores si las variables no están definidas en .env
          allowUndefined: true,  // Permite valores undefined
          verbose: false,  // Habilita los logs para depuración
        },
      ],
    ],
  };
};

