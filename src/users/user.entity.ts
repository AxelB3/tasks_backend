import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
     @PrimaryGeneratedColumn()
     id: number

     @Column()
     correo: string

     @Column()
     usuario: string

     @Column()
     password: string

}