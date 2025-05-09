import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../shared/infrastructure/database/database.config";
import { SubscriptionRepository } from "../../domain/repository/SubscriptionRepository";

export class SubscriptionMysqlPersistence implements SubscriptionRepository {
    async storeSuscription(payerId: string, userId: number, status: string, service: string): Promise<number> {
        console.log(status)
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO subscriptions(payer_id, start_date, user_id, service, status) VALUES(?, now(), ?, ?, ?)',
            [payerId, userId, service, status]
        );
        console.log(`Subscription inserted with ID: ${result.insertId}`);
        return result.insertId;
    }

    async verifiedSubscription(userId: number): Promise<boolean> {
        const [rows] = await pool.execute<RowDataPacket[]>(`
                SELECT 1
                FROM subscriptions
                WHERE user_id = ?
                LIMIT 1
            `, [userId]);
        return rows.length > 0;
    }
    async findSubscription(payerId: string): Promise<number | null> {
        const [rows] = await pool.execute<RowDataPacket[]>(`
                SELECT *
                FROM subscriptions
                WHERE payer_id = ?
                LIMIT 1
            `, [payerId]);
            if (rows.length === 0) {
                return null;
            }
            const payer = rows[0];
            return payer.id;
    }
    async storePayment(payId: string, paymentMethod: string | null, paymentDate: string, subscriptionId: number): Promise<number> {
        const [result] = await pool.execute<ResultSetHeader>(
                `INSERT INTO payments (pay_id, payment_method, payment_date, date_generate, subscription_id)
                VALUES (?, ?, ?, NOW(), ?)`,
            [payId, paymentMethod, paymentDate, subscriptionId]
        );

        return result.insertId;
    }

    async updateStatusPayment(payId: string, paymentMethod: string): Promise<void> {
        await pool.execute(`
                UPDATE payments SET payment_method = ? WHERE pay_id = ?
            `,[
                paymentMethod, payId
            ]);
    }

    async updateStatusSubscription(payerId: string, status: string): Promise<void> {
        console.log({payerId, status});
        await pool.execute(
            `UPDATE subscriptions SET status = ? WHERE payer_id = ?`,
            [status, payerId as string]
        );
    }

}