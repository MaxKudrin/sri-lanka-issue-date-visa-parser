require('dotenv').config()
const superagent = require('superagent').agent()
const fs = require("fs");
const text = fs.readFileSync('./passports.txt', 'utf-8');
const passports = text.split("\n")

const login = async () =>{
    try {
        const email = process.env.EMAIL
        const password = process.env.PASSWORD

        const link = process.env.LOGIN_URL
        await superagent
            .post(link)
            .send({email, password})
            .set('Content-Type', 'application/x-www-form-urlencoded')
        console.log('LOGIN SUCCESS')
    } catch (error) {
        console.log('login error')
    }
}

const parseIssueDate = async (passport) => {
    try {
        const link = `${process.env.ISSUE_DATE_URL}?x12s=${passport}-UKR-1-`
        const result = await superagent
        .get(link)
        const splitter = 'class="stat-data">'

        const line = result.text.match(/Visa Issue Date.*?class="stat-data">.*?</gs)

        const issueDateTemp = line[0].split(splitter)[1]
        const issueData = issueDateTemp.slice(0, issueDateTemp.length - 1)
        if(issueData === "") return 'null'
        return issueData
    } catch (error) {
        console.log('parse isssue')
        console.log(error)
    }
}

const parseIssueDatesWithInterval = async (passports) => {
    try {
        let counter = 0
        const total = []
        console.log(passports)
        do {
            const result = await parseIssueDate(passports[counter])
            const passportData = `${passports[counter]} ${result}`
            console.log(passportData)
            total.push(passportData)
            counter++
        } while (passports.length>counter);

        return total

    } catch (error) {
        
    }
}

const writeToFileSync = (data)=>{
    try {
        const txt = data.join('\n')
        fs.writeFileSync('data.txt', txt)
        console.log('WRITE TO FILE SUCCESS')
    } catch (error) {
        console.log('write to file error')
        console.log(error)
    }
}

const start = async ()=>{
    await login()
    const result = await parseIssueDatesWithInterval(passports)
    writeToFileSync(result)
}

start()