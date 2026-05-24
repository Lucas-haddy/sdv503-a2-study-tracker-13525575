const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What did you study? ', (answer) => {
    const subject = answer;
});

let studySession = {
    subject: 'math',
    duration: 1
};

let sessionList = [
];

const validation = () => {
    const errors = [];
    if (studySession === null || typeof studySession !== 'object') {
        return {ok: false, errors: ['studySession must be an object.']};
    }
    if (typeof studySession.subject !== 'string') {
        errors.push('Subject must be a string.')
    }
    if (studySession.subject === '') {
        errors.push('Subject cannot be empty.')
    }
    if (studySession.subject.includes(' ')) {
        errors.push('Subject cannot have whitespace.');
    }
    if (typeof studySession.duration !== 'number' || (!Number.isInteger(studySession.duration))) {
        errors.push('Duration must be a whole number.');
    } else if (studySession.duration.length <= 0) {
        errors.push('Duration cannot be zero or less.')
    }
    if (errors.length > 0) {
        return {ok: false, errors: errors};
    }
    return {ok: true, value: studySession}; 
}

const result = validation();
if (result.ok) {
    sessionList.push(result.value);
    console.log('Session added successfully!', sessionList);    
} else {
    console.log('Validation failed.')
}