import { CONFIG } from "../../../shared/config/config";
import { UserEmail } from "../../domain/entities/value-objects/UserEmail";
import { SendEmailService } from "../../domain/service/SendEmailService";
import nodemailer from 'nodemailer';
export class UserSendEmailService implements SendEmailService {
    async sendCodeEmail(email: UserEmail): Promise<string> {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: CONFIG.email.email,
                pass: CONFIG.email.pass
            }
        });
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const info = await transporter.sendMail({
            from: CONFIG.email.email,
            to: email.value,
            subject: 'Codigo de verificacion para cambiar su contraseña',
            html: `<h1>Su codigo de verificacíon es ${code}</h1>`
        });
        return code;
    }
}