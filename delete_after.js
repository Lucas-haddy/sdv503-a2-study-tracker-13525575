// Import Node's built-in readline module.
// This lets us read input from the terminal one line at a time.
const readline = require('node:readline');

// Create the readline "interface".
// input  = where we read from (the keyboard / standard input)
// output = where prompts are printed (the terminal / standard output)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// This array will hold every valid study session we collect.
// It lives out here (not inside a callback) so it survives after the questions finish.
const sessionList = [];

// --- The validation function ---
// It takes a "session" as an ARGUMENT instead of reaching out to a global variable.
// Why? Because that keeps it reusable and testable — you can validate ANY session
// object by passing it in, not just one specific variable.
const validate = (session) => {
    // We collect every problem we find into this array,
    // so we can report ALL errors at once instead of stopping at the first.
    const errors = [];

    // Subject must be a non-empty string.
    // We check the type AND the empty case together.
    if (typeof session.subject !== 'string' || session.subject === '') {
        errors.push('Subject cannot be empty.');
    } else if (session.subject.includes(' ')) {
        // Only check for spaces if we already know it's a valid string.
        // (Using "else if" avoids running .includes() on something that isn't a string.)
        errors.push('Subject cannot contain whitespace.');
    }

    // Duration must be a whole number greater than zero.
    // Number.isInteger() returns false for decimals AND for NaN (e.g. if they typed "abc"),
    // so this one check quietly handles bad input too.
    if (!Number.isInteger(session.duration) || session.duration <= 0) {
        errors.push('Duration must be a whole number greater than zero.');
    }

    // Return an object describing the outcome:
    // ok = true only when there were no errors.
    return { ok: errors.length === 0, errors };
};

// --- Asking the questions ---
//
// THIS IS THE KEY FIX. rl.question is ASYNCHRONOUS.
// It does NOT pause the program and wait for an answer.
// Instead, it shows the prompt and then runs the callback (the function)
// LATER — only once the user has typed something and pressed Enter.
//
// That means the answer only exists INSIDE this callback.
// So everything that needs the answer must also live inside it.
// (The original code tried to use the answer outside — which is why it never worked:
//  the validation ran before the user had typed anything.)
rl.question('What did you study? ', (subject) => {

    // We ask the SECOND question INSIDE the first callback.
    // This is how we make sure we have BOTH answers before doing any work.
    rl.question('How many hours? ', (durationInput) => {

        // Build the session object from the two answers.
        const studySession = {
            subject: subject,

            // IMPORTANT: readline ALWAYS gives you a string — even if they type "5".
            // Number() converts that string "5" into the actual number 5.
            // Without this, the "must be a whole number" check would always fail.
            duration: Number(durationInput)
        };

        // Run our validation on the object we just built.
        const result = validate(studySession);

        // result.ok tells us whether it passed.
        if (result.ok) {
            // Valid — add it to the list and confirm.
            sessionList.push(studySession);
            console.log('Session added successfully!', sessionList);
        } else {
            // Invalid — show exactly WHY it failed (the list of errors),
            // which is far more helpful than just "Validation failed".
            console.log('Validation failed:', result.errors);
        }

        // Close readline so the program can actually end.
        // If you forget this, the program just hangs, waiting for more input.
        rl.close();
    });
});
