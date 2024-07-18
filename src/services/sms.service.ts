import config from "../config/env.config";
import clientTwilio from "../config/twilio.config";

export default class SmsService {
  constructor() {}

  async twilioSmsService(to: string) {
    try {
      await clientTwilio.messages.create({
        body: "Compra exitosa.",
        from: config.twilioPhoneNumber,
        to: `${to}`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
