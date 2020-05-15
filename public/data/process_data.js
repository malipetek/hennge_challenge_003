const fs = require('fs');
const path = require('path');

let main_data = fs.readFileSync(path.join(__dirname, '/initial_data.json'), 'utf-8');

let emails = fs.readFileSync(path.join(__dirname, '/just_emails.json'), 'utf-8');

let attachments = fs.readFileSync(path.join(__dirname, '/attachment_names.json'), 'utf-8');

main_data = JSON.parse(main_data);
emails = JSON.parse(emails);
attachments = JSON.parse(attachments);

main_data = main_data.map(mail => {
    return {
        from: mail.from,
        to: mail.to,
        title: mail.title,
        cc: (new Array(Math.round(Math.random() * 3)).fill('').map(_ => emails[Math.floor(Math.random() * 100)].from) ),
        body: mail.body,
        date: mail.date,
        attachment: (new Array(Math.round(Math.random())).fill('').map(_ => attachments[Math.floor(Math.random() * 100)].file + ['.doc', '.xls', '.pdf', '.docx', '.json', '.jpeg', '.png', '.exe', '.epub', '.xlsx'][Math.floor(Math.random() * 10)]) )
    }
});

fs.writeFileSync(path.join(__dirname, '/emails.json'), JSON.stringify(main_data), 'utf-8');