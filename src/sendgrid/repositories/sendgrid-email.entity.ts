import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SendgridEmailEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email_type: string;

    @Column()
    customer_email: string;

    @Column()
    subject: string;

    @Column()
    text: string;
}