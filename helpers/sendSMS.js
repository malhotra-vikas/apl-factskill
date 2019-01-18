const AWS = require('aws-sdk');

module.exports = class Sender {
    constructor(config) {
        this.AWS = AWS.config.update(config.AWS);
        this.sns = new AWS.SNS({ apiVersion: '2010-03-31' });
        this.topicArn = config.topicArn;
    }
    init(AWSAccountId, Label) {
        return new Promise((resolve, reject) => {
            const params = {
                AWSAccountId: [
                    AWSAccountId,
                ],
                ActionName: [
                    'Publish',
                ],
                Label,
                TopicArn: this.topicArn,
            };
            this.sns.addPermission(params, (err, data) => {
                if (err) reject(err, err.stack);
                else resolve(data);
            });
        });
    }
    createSubscribe(Endpoint) {
        return new Promise((resolve, reject) => {
            const subscribeParams = {
                Protocol: 'sms',
                TopicArn: this.topicArn,
                Endpoint,
            };
            this.sns.subscribe(subscribeParams, (err, data) => {
                if (err) reject(err, err.stack);
                else resolve(data);
            });
        });
    }
    sendSms(smsBody, Subject, isTopic, PhoneNumber = '') {
        return new Promise((resolve, reject) => {
            let smsParams;
            if (isTopic) {
                smsParams = {
                    Message: smsBody,
                    MessageStructure: 'raw',
                    Subject,
                    TopicArn: this.topicArn,
                };
            } else {
                smsParams = {
                    Message: smsBody,
                    MessageStructure: 'raw',
                    PhoneNumber,
                    Subject,
                };
            }
            this.sns.publish(smsParams, (err, data) => {
                if (err) reject(err, err.stack);
                else resolve(data);
            });
        });
    }
};