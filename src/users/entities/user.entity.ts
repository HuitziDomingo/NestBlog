import {
    Entity,
    Column,
    PrimaryGeneratedColumn,

} from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({})
    password: string

    @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ nullable: true })
    authStrategy: string
}
function PrimaryGenerateColumn() {
    throw new Error('Function not implemented.')
}

