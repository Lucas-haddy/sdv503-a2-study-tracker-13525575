const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let sessionList = [];

function ask(q) {
    return new Promise(resolve => rl.question(q, resolve));
}


const validateIfObject = (session) => {
    const errors = [];
    if (session === null || typeof session !== 'object') {
        errors.push('Input must be an object.');
    }
    return {ok: errors.length === 0, errors: errors};
}

const validateTopic = (session) => {
    const errors = [];
    if (typeof session.subject !== 'string' || session.subject === '') {
        errors.push('Subject must be a string.')
    } else if (session.subject.includes(' ')) {
        errors.push('Subject cannot have whitespace.');
    }
    return {ok: errors.length === 0, errors: errors};
};

const validateDuration = (session) => {
    const errors = [];
    if (!Number.isInteger(session.duration) || session.duration <= 0) {
        errors.push('Duration must be a whole number greater than zero.');
    }
    return {ok: errors.length === 0, errors: errors}; 
}

const durationTotal = (sessionList) => {
    return sessionList.reduce((total, session) => total + session.duration, 0);
}

const listAllSessions = (sessionList) => {
    console.log('Recorded study sessions:');
    sessionList.forEach((session, index) => {
        console.log(`Subject: ${session.subject}, Duration: ${session.duration} hours`);
    });
};

async function addNewSession() {
    let keepAdding = true;

    while (keepAdding) {
        const subject = await ask('\nWhat did you study? ');
        const durationInput = await ask('How many hours did you study? ');

        const studySession = {
            subject: subject,
            duration: Number(durationInput)
        };

        const objCheck = validateIfObject(studySession);
        const topicCheck = validateTopic(studySession);
        const durationCheck = validateDuration(studySession);

        const allErrors = [...objCheck.errors, ...topicCheck.errors, ...durationCheck.errors];

        if (allErrors.length === 0) {
            sessionList.push(studySession);
            console.log('Session added successfully!');
        } else {
            console.log('Validation failed:', allErrors.join(' '));
        }

        const answer = await ask('\nWould you like to add another session? (yes/no): ');
        if (answer.toLowerCase() !== 'yes' && answer.toLowerCase() !== 'y') {
            keepAdding = false;
        }
    };
    console.log(`\nTotal study time: ${durationTotal(sessionList)} hours`);

    const showHistory = await ask('Would you like to see all sessions? (yes/no): ');
    if (showHistory.toLowerCase() === 'yes' || showHistory.toLowerCase() === 'y') {
        listAllSessions(sessionList);
    }

    rl.close();
} 

addNewSession();
