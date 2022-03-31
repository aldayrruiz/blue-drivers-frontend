/**
 * Here, I will explain what are these variables and how you must use them in production.
 *
 * Variables:
 *
 * - production: This must be true in environment.prod.ts and false in environment.ts
 *
 * - baseURL: url of the fleet management API to connect. Imagine you have your API web
 * server and it has a domain named "my.fleet.management", so the value of baseURL must be
 * "https://my.fleet.management" if you are using HTTPS.
 *
 * - assetsDir: This will depend on where you app is built. At the moment you use ng build,
 * you must pass a value for --output-path argument. Well if you pass the value "$PATH/static/ang".
 * The value for assetsDir must be static/ang/assets/
 */
export const environment = {
  production: true,
  fleetBaseUrl: '',
  assetsDir: '',
};
