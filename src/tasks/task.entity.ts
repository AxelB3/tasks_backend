import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

enum TaskEstatus {
     PENDIENTE = "PENDIENTE",
     TERMINADA = "TERMINADA"
}

@Entity()
export class Task {
     @PrimaryGeneratedColumn()
     id: number

     @Column()
     titulo: string

     @Column()
     descripcion: string

     @Column()
     estatus: TaskEstatus

     @Column()
     usuarioId: number

     @Column()
     active: boolean

}