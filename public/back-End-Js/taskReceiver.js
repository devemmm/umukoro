// Element
const $taskForm = document.getElementById('task-form')
const $academicLevel = $taskForm.querySelector('#academic-level')
const $taskType = $taskForm.querySelector('#task-type')
const $subject = $taskForm.querySelector('#subject')
const $academicInstitution = $taskForm.querySelector('#academic-institution')
const $paperTitle = $taskForm.querySelector('#paper-title')
const $taskDetails = $taskForm.querySelector('#task-details')
const $deadline = $taskForm.querySelector('#deadline')

$taskForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const academicLevel = $academicLevel.value
    const taskType = $taskType.value
    const subject = $subject.value
    const academicInstitution = $academicInstitution.value
    const paperTitle = $paperTitle.value
    const taskDetails = $taskDetails.value
    const deadline = '01-01-2020'

    fetch('/orderForm', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ level: academicLevel, type: taskType, subject: subject, institution: academicInstitution, title: paperTitle, details: taskDetails, deadline: deadline })
        })
        .then((res, err) => {
            if (res.status == 400) {
                return console.log(err)
            }
            window.open('/almost', '_self')
            return res.json()

        })
        .then((data) => {
            return console.log(data)

        })
        .catch((error) => {
            console.log(error)

        })
})