
module.exports = async function trainnlp(manager) {
// Leave balance
    manager.addDocument('en', 'Can I see my leave balance?', 'leave.balance');
    manager.addDocument('en', 'What is my leave balance?', 'leave.balance');
    manager.addDocument('en', 'How much leave do I have?', 'leave.balance');
    manager.addDocument('en', 'How many days of leave do I have?', 'leave.balance');

// Next payment

    // Train the model with payment questions
    manager.addDocument('en', 'What is my next payment?', 'payment.next');
    manager.addDocument('en', 'When is my next payment?', 'payment.next');
    manager.addDocument('en', 'When is my next salary?', 'payment.next');
    manager.addDocument('en', 'When is my next salary payment?', 'payment.next');
    manager.addDocument('en', 'When is my next salary payment?', 'payment.next');
    manager.addDocument('en', 'When is my next salary payment?', 'payment.next');
    manager.addDocument('en', 'When is my next salary payment?', 'payment.next');
    manager.addDocument('en', 'When is my next salary payment?', 'payment.next');
    manager.addDocument('en', 'When is my next salary payment?', 'payment.next');
    manager.addDocument('en', 'When is my next payment due?', 'payment.when');
    manager.addDocument('en', 'When is my next payment due?', 'payment.when');
    manager.addDocument('en', 'When is my next payment?', 'payment.when');
    manager.addDocument('en', 'When is my next payment due?', 'payment.when');
    manager.addDocument('en', 'When will I receive my next payment?', 'payment.when');
    manager.addDocument('en', 'When will I receive my next payment?', 'payment.when');
    manager.addDocument('en', 'When will I get my next payment?', 'payment.when');
    manager.addDocument('en', 'When will I get my next payment?', 'payment.when');
    manager.addDocument('en', 'When will I get my payment?', 'payment.when');
    manager.addDocument('en', 'When will I get paid?', 'payment.when');
    manager.addDocument('en', 'when will I have my payment?', 'payment.when');
    manager.addDocument('en', 'when will I receive payment?', 'payment.when');
    manager.addDocument('en', 'When will I get my next payment?', 'payment.when');
    manager.addDocument('en', 'When is my payment?', 'payment.when');
    manager.addDocument('en', 'When is my payment due?', 'payment.when');
    manager.addDocument('en', 'When do I get my money?', 'payment.when');
    manager.addDocument('en', 'When do I get paid?', 'payment.when');

    manager.addDocument('en', 'When will I receive my money?', 'payment.when');
    manager.addDocument('en', 'When will I receive my payment?', 'payment.when');
    manager.addDocument('en', 'When will I get my cut bro?', 'payment.when');
    manager.addDocument('en', 'When will I get my cut?', 'payment.when');


    manager.addAnswer('en', 'leave.balance', 'Your leave balance is {{leave.balance}}');
    manager.addAnswer('en', 'payment.when', 'Your next payment is due on {{payment.when}}');
};
