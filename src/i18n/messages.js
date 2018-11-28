import zh_data from './zh'
import en_data from './en'
const messages = {
  zh: zh_data,
  en: en_data
}

const convertParagraph = (text)=>{
  if (text)
    return text.trim()
               .replace(/\n/g,"<br>")
               .split("<br>")
               .map(line=>`<p>${line.trim()}</p>`)
               .join("")
              //  .join("<br>")
  else
    return text
}

messages.zh.stations.forEach(station=>{
  station.demo_author_description = convertParagraph(station.demo_author_description)
  station.demo_description = convertParagraph(station.demo_description)
})

export default messages