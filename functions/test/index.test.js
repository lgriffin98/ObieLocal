const test = require('firebase-functions-test')(
  {
    projectId: 'test-twine-12451'
  },
  'test/test-twine-12451-69359364facf.json'
);
const assert = require('chai').assert;
const redis = require('redis');

// Importing functions
const raccoonWrapper = require('../raccoon-wrapper');

// whole app is loaded so that admin is already initialized
const app = require('../index.js');

const USER_ID_1 = '10';
const ITEM_ID_1 = 'Lecture';
const ITEM_ID_2 = 'Computer science';

describe('rateEvent', () => {
  afterEach(done => {
    const client = redis.createClient();
    client.flushall(() => {
      done();
    });
  });

  it('should handle a POST request with a like correctly', done => {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        type: 'like',
        userId: USER_ID_1,
        items: [ITEM_ID_1, ITEM_ID_2]
      }
    };
    const res = {
      status: code => ({
        send: async () => {
          assert.equal(code, 200);
          assert.deepEqual(await raccoonWrapper.likedBy(ITEM_ID_1), [
            USER_ID_1
          ]);
          assert.deepEqual(await raccoonWrapper.likedBy(ITEM_ID_2), [
            USER_ID_1
          ]);
          await raccoonWrapper.rate(USER_ID_1, ITEM_ID_1, 'unlike');
          await raccoonWrapper.rate(USER_ID_1, ITEM_ID_2, 'undislike');
          done();
        }
      })
    };
    app.rateEvent(req, res);
  });

  it('should update the recommender database correctly with like and dislike', done => {
    // Wrapping functions in a wrap method that
    async function asyncWrap() {
      try {
        await raccoonWrapper.rate(USER_ID_1, ITEM_ID_1, 'like');
        await raccoonWrapper.rate(USER_ID_1, ITEM_ID_2, 'dislike');
        assert.deepEqual(await raccoonWrapper.likedBy(ITEM_ID_1), [USER_ID_1]);
        assert.deepEqual(await raccoonWrapper.dislikedBy(ITEM_ID_2), [
          USER_ID_1
        ]);
        await raccoonWrapper.rate(USER_ID_1, ITEM_ID_1, 'unlike');
        await raccoonWrapper.rate(USER_ID_1, ITEM_ID_2, 'undislike');
      } catch (e) {
        throw e;
      }
    }

    asyncWrap()
      .then(() => done())
      .catch(e => assert.fail(e));
  });
});

after(() => {
  test.cleanup();
});
