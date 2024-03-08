enum TaskEstatus {
     PENDIENTE = "PENDIENTE",
     TERMINADA = "TERMINADA"
}

export class CreateTaskDto {
     id: number
     titulo: string
     descripcion: string
     estatus: TaskEstatus
     active: boolean
     usuarioId: number
}