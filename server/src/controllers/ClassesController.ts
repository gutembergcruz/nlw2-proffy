import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/dateUtils';

export default class ClassesController {
  async index(req: Request, resp: Response) {
    const filters = req.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return resp.status(400).json({
        error: 'Missing filters to search classes',
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('classes')
      .whereExists(function () {
        this.select(['class_schedule.*'])
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'user_id')
      .select(['classes.*', 'users.*']);

    return resp.json(classes);
  }

  async create(req: Request, resp: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersIds[0];

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesIds[0];
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
          class_id,
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return resp.status(201).send();
    } catch (error) {
      console.log(error);

      await trx.rollback();
      return resp
        .status(400)
        .json({ error: 'Unexpected error while creating new class' });
    }
  }
}
