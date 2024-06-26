import type { RequestHandler } from 'express';

import { BaseStatuses, ErrorMessages } from '../constants';
import { Topic } from '../db/models/Topic';
import { User } from '../db/models/User';
import { configureError } from '../utils/configureError';

export const createTopic: RequestHandler = async (req, res) => {
  const topic = await Topic.create({ ...req.body, author_id: req.user.ya_id });
  await topic.reload({
    include: {
      model: User,
      attributes: ['ya_id', 'login', 'display_name', 'avatar'],
    },
  });
  return res.status(BaseStatuses.CREATED).json(topic);
};

export const getAllTopic: RequestHandler = async (_req, res) => {
  const allTopics: Topic[] = await Topic.findAll({ include: User });
  const topicCount: number = await Topic.count();
  return res
    .status(BaseStatuses.OK)
    .json({ count: topicCount, topics: allTopics });
};

export const getTopicById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const topic: Topic | null = await Topic.findByPk(isNaN(+id) ? 0 : id, {
    include: {
      model: User,
      attributes: ['ya_id', 'login', 'display_name', 'avatar'],
    },
  });
  if (topic == null) {
    return configureError(res, BaseStatuses.NOT_FOUND, ErrorMessages.NOT_FOUND);
  }
  return res.status(BaseStatuses.OK).json(topic);
};
