import config from "../config/env.config";

export const buys = {
  subject: "Compra realizada",
  html: `<div><p>Gracias por su compra.</p></div>`,
};

export const password = {
  subject: "Recuperación de contraseña",
  html: `<a href="http://localhost:${config.port}/create-new-password"><button>Recuperar contraseña</button></a>`,
};
