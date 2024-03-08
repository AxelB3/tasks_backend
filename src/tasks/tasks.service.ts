import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../tasks/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { Request } from 'express';

enum TaskEstatus {
  PENDIENTE = 'PENDIENTE',
  TERMINADA = 'TERMINADA',
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async createTask(task: CreateTaskDto, req) {
    const newTask = new Task();
    newTask.titulo = task.titulo;
    newTask.descripcion = task.descripcion;
    newTask.estatus = TaskEstatus.PENDIENTE;
    newTask.usuarioId = req.user.usuario_id;
    newTask.active = true;
    await this.taskRepository.save(newTask);

    return await this.taskRepository.find({
     where: { active: true, usuarioId: req.user.usuario_id },
   });
  }

  getTasks(req) {
    return this.taskRepository.find({
      where: { active: true, usuarioId: req.user.usuario_id },
    });
  }

  async deleteTask(id: number, req) {
    await this.taskRepository.update({ id }, { active: false });
    return await this.taskRepository.find({
     where: { active: true, usuarioId: req.user.usuario_id },
   });
  }

  async updateTask(id: number, task, req) {
    await this.taskRepository.update({ id }, { estatus: task.estatus });
    return await this.taskRepository.find({
     where: { active: true, usuarioId: req.user.usuario_id },
   });
  }
}
