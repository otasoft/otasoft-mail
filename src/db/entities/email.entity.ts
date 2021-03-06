import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EmailEntity extends BaseEntity {
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

  @Column()
  timestamp: Date;
}
