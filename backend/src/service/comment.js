const Comment = require('../model').Comment;

module.exports = {
  create: async ({ content, userId, issueId }) => {
    if (!content || !userId || !issueId) {
      return { error: '정보가 부족합니다' };
    }

    const comment = await Comment.create({
      content: content,
      user_id: userId,
      issue_id: issueId,
    });

    return comment;
  },

  remove: async ({ id }) => {
    if (!id) {
      return { error: '정보가 부족합니다' };
    }

    const comment = await Comment.destroy({ where: { id } });

    if (comment) {
      return true;
    }
    return { error: '존재하지 않는 댓글입니다' };
  },

  update: async ({ id, content }) => {
    if (!id) {
      return { error: '정보가 부족합니다' };
    }

    const [comment] = await Comment.update({ content }, { where: { id } });

    if (comment) {
      return true;
    }
    return { error: '존재하지 않는 댓글입니다' };
  },
};
