import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('channel_feeds')
export class ChannelFeed {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  channel_id: number;

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;
}
