import transportGoogle from "../config/transportGoogle.config";
import config from "../config/env.config";

export default class MailService {
  constructor() {}

  async googleMailService(to: string, subject: string, html: string) {
    await transportGoogle.sendMail({
      from: `${config.googleAppUsername}`,
      to: `${to}`,
      subject,
      html,
    });
  }
}
