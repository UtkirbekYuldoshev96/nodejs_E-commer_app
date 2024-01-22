// Blocking synchronous way
// bu funksiya orqai fayldagi malumot olinadi
const mainText = fs.readFileSync('./Lesson1/main.txt', 'utf-8');
console.log(mainText);
const textOut = `Bu ${mainText}.\n Creae on ${Date.now()}`;
fs.writeFileSync('./Lesson1/out.txt', textOut);


// Non-blocing asychrounous way
fs.readFile('./Lesson1/out.txt', 'utf-8', (err, data1) => {
      fs.readFile('./Lesson1/${data1}.txt', 'utf-8', (err, data2) => {
            console.log(data2);
      })
})
