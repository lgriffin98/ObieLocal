/**
 * raccoon-wrapper.js
 * Wrapper for raccoon recommender that takes a request from
 * a client and updates the raccoon accordingly
 *
 * Minh Lam
 * 4/25/2020
 */

const raccoon = require('raccoon');

/**
 * Update the raccoon redis with a like
 * @param {string} userId the ID of the user who liked
 * @param {string} itemId the ID of the item that was liked
 */
module.exports.liked = async function(userId, itemId) {
  await raccoon.liked(userId, itemId);
  return;
};

/**
 * Remove a like from the raccoon redis
 * @param {string} userId the ID of the user who liked
 * @param {string} itemId the ID of the item that was liked
 */
module.exports.unliked = async function(userId, itemId) {
  await raccoon.unliked(userId, itemId);
  return;
};

/**
 * Update the raccoon redis with a like
 * @param {string} userId the ID of the user who disliked
 * @param {string} itemId the ID of the item that was disliked
 */
module.exports.disliked = async function(userId, itemId) {
  await raccoon.disliked(userId, itemId);
  return;
};

/**
 * Remove a dislike from the raccoon redis
 * @param {string} userId the ID of the user who liked
 * @param {string} itemId the ID of the item that was liked
 */
module.exports.undisliked = async function(userId, itemId) {
  await raccoon.unliked(userId, itemId);
  return;
};

/**
 * For testing: check the userId who liked an event
 * @param {string} itemId the ID of the item that was liked
 */
module.exports.likedBy = async function(itemId) {
  return await raccoon.likedBy(itemId);
};

/**
 * For testing: check the userId who disliked an event
 * @param {string} itemId the ID of the item that was liked
 */
module.exports.dislikedBy = async function(itemId) {
  return await raccoon.dislikedBy(itemId);
};

module.exports.testTest = function(testWord) {
  return testWord;
};