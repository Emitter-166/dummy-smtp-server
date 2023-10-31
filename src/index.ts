import * as fs from 'fs';
import { SMTPServer } from 'smtp-server';

const server = new SMTPServer({
  authOptional: true,
  onData(stream, session, callback) {
    stream.pipe(fs.createWriteStream(`email-${Date.now()}.eml`));
    callback();
  },
  onConnect(session, callback) {
    console.log(`Connection from ${session.remoteAddress}`);
    // Append the IP address to a text file
    fs.appendFile('ip_addresses.txt', `${session.remoteAddress}\n`, (err) => {
      if (err) console.error(`Error saving IP address: ${err}`);
    });
    return callback();
  },
});

server.listen(25, '0.0.0.0', () => {
  console.log('Dummy SMTP server is listening on port 25');
});
