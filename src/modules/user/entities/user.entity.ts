import { SoftDeleteEntity } from 'src/database/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends SoftDeleteEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
