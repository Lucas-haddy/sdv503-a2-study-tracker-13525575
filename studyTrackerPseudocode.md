# Get user Inputs

VAR subject = "X"
PRINT "Enter the subject you studied: "
VAR duration = 120
PRINT "Enter the duration of the study session: "

## Validate user inputs, e.g. no whitespace, no empty strings, no decimals or a number of 0 or less

IF subject = NULL {
    PRINT "Error: Subject cannot be empty."
}
IF duration <= 0 OR = DECIMAL{
    PRINT "Error: Duration must a whole number greater than zero."
}
END IF

## Store user inputs in an object called Study Session

OBJ studySession1 {
    subject: "X",
    duration: 120
}
OBJ studySession2 {
    subject: "Y",
    duration: 31
}

## Add Study Session to the Study List Array

ARR studyList [
    {subject: "X", duration: 120}
    {subject: "Y", duration: 31}
]

## Add study time from all sessions into a total study time variable

VAR totalDuration => (a, b) {
    VAR a = studyList[0].duration,
    VAR b = studyList[1].duration,
    RETURN a + b
}

## Display the Study List in the console, show each subject studied and the time spent on it, and the total study time

console.log(studyList + totalDuration)
