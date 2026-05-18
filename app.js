let studySession = {
    subject: 'x',
    duration: 1
}
const validation = () => {
    const errors = [];
    if (studySession === null || typeof studySession !== 'object') {
        return {ok: false, errors: ['studySession must be an object.']};
    }
    if (typeof studySession.subject !== 'string') {
        errors.push('Subject must be a string.')
    }
    if (subject === '') {
        errors.push('Subject cannot be empty.')
    }
    if (subject.includes(' ')) {
        errors.push('Subject cannot have whitespace.');
    }
    if (typeof studySession.duration !== 'number' || (!Number.isInteger(duration))) {
        errors.push('Duration must be a whole number.');
    } else if (studySession.duration.length <= 0) {
        errors.push('Duration cannot be zero or less.')
    }
    if (errors.length > 0) {
        return {ok: false, errors: errors};
    }
    return {ok: true, value: studySession}; 
}