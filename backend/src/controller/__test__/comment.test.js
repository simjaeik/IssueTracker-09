/* eslint-disable no-undef */
const commentController = require('../comment');
const commentService = require('../../service/comment');

const httpMocks = require('node-mocks-http');

commentService.create = jest.fn();
commentService.remove = jest.fn();

const newComment = {
  content: 'helloworld',
  userId: 1,
  issueId: 1,
};
let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('create comment Controller 테스트', () => {
  beforeEach(() => {
    req.body = newComment;
  });

  it('함수인가', () => {
    commentService.create.mockReturnValue(newComment);
    expect(typeof commentController.create).toBe('function');
  });

  it('service에 newComment가 들어가는가', async () => {
    commentService.create.mockReturnValue(newComment);
    await commentController.create(req, res);
    expect(commentService.create).toBeCalledWith(newComment);
  });

  it('성공 시 201응답이 오는가', async () => {
    commentService.create.mockReturnValue(newComment);
    await commentController.create(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    commentService.create.mockReturnValue(newComment);
    await commentController.create(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    commentService.create.mockReturnValue(errorMessage);
    await commentController.create(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    commentService.create.mockReturnValue(rejectedPromise);
    await commentController.create(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe('remove comment Controller 테스트', () => {
  const removeData = { commentId: 1 };
  beforeEach(() => {
    req.body = removeData;
  });

  it('함수인가', () => {
    commentService.remove.mockReturnValue(removeData);
    expect(typeof commentController.remove).toBe('function');
  });

  it('service에 data가 들어가는가', async () => {
    commentService.remove.mockReturnValue(removeData);
    await commentController.remove(req, res);
    expect(commentService.remove).toBeCalledWith(removeData);
  });

  it('성공 시 200응답이 오는가', async () => {
    commentService.remove.mockReturnValue(removeData);
    await commentController.remove(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    commentService.remove.mockReturnValue(removeData);
    await commentController.remove(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    commentService.remove.mockReturnValue(errorMessage);
    await commentController.remove(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    commentService.remove.mockReturnValue(rejectedPromise);
    await commentController.remove(req, res);
    expect(res.statusCode).toBe(500);
  });
});
