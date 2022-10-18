'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'orderRecord';
const MODEL_NAME = 'OrderRecord';

module.exports = {
    Query: {
        latestRecord(root, {
            authorId,
            option
        }, ctx) {
            return ctx.connector[CONNECTOR_NAME].latestRecord(authorId, option);
        },
        latestUserCourseRecord(root, {
            authorId,
            courseId
        }, ctx) {
            return ctx.connector[CONNECTOR_NAME].latestUserCourseRecord(authorId, courseId);
        },
    },
    Mutation: {
        recordAdd(root, {
            orderRecordInput
        }, ctx) {
            return ctx.connector[CONNECTOR_NAME].recordAdd(orderRecordInput);
        },
        recordIntelligentAdd(root, {
            orderRecordInput
        }, ctx) {
            return ctx.connector[CONNECTOR_NAME].recordIntelligentAdd(orderRecordInput);
        },

    }
};
