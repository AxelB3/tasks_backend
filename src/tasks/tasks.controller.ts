import { Controller, Post, Body, Get, Patch, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from '../tasks/task.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tasks')
export class TasksController {
    
     constructor(private taskService: TasksService) {}
     
     @UseGuards(AuthGuard)
     @Post('crear')
     createTask(@Body() newTask: CreateTaskDto, @Req() req){
          return this.taskService.createTask(newTask, req)
     }

     @UseGuards(AuthGuard)
     @Get()
     getTasks(@Req() req): Promise<Task[]>{
          return this.taskService.getTasks(req)
     }

     @UseGuards(AuthGuard)
     @Patch('eliminar/:id')
     deleteTask(@Param('id', ParseIntPipe) id:number, @Req() req) {
          return this.taskService.deleteTask(id, req)
     }
     
     @UseGuards(AuthGuard)
     @Patch('actualizar/:id')
     updateTask(@Param('id', ParseIntPipe) id:number, @Body() task, @Req() req) {
          return this.taskService.updateTask(id, task, req)
     }

}
