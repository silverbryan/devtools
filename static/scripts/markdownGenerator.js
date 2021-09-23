const path = require('path');
const got = require('got');
const stream = require('stream');
const inquirer = require('inquirer');
const { createWriteStream, mkdirSync, existsSync } = require('fs');
const { promisify } = require("util");
const { v4: uuidv4 } = require('uuid');
const pipeline = promisify(stream.pipeline);
const metascraper = require('metascraper')([
  require('metascraper-image')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
  require('metascraper-description')(),
])
const defaultImage = 'https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png';
const defaultDescription = 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form';

function questions() {
  return inquirer.prompt([
    {
      type: "input",
      name: "websiteUrl",
      message: "Site Url ->",
      validate: answer => /^(https):\/\/[^ "]+$/.test(answer)
        ? true
        : "Insert a valid Url."
    },
    {
      type: "list",
      name: "category",
      message: "Select Category",
      choices: ['icons', 'illustrations', 'images', 'coding-challenge', 'productivity', 'package'],
    },
  ]);
};

async function getMetaTags(websiteUrl) {
  const { body: html, url } = await got(websiteUrl);
  const metatags = await metascraper({ html, url });
  const imagePath = metatags.image ?? defaultImage;
  const imageExt = path.extname(imagePath);
  return {
    ...metatags,
    image: imagePath,
    imagePath: `/default${imageExt}`,
    description: metatags.description
      .replace(/:/g, '') ?? defaultDescription,
    title: metatags.title
      .replace(/\W+/g, ' '),
    name: metatags.title
      .toLowerCase()
      .replace(/\W+/g, '-')
  }
}

function generateDir(data) {
  const { category, name } = data;
  const dir = `content/${category}/`;

  if (existsSync(dir))
    mkdirSync(dir + name);
  else {
    mkdirSync(dir);
    mkdirSync(dir + name)
  }
  return dir + name;
}

function downloadExternalImage(image, targetDir) {
  return pipeline(
    got.stream(image)
      .on("downloadProgress", ({ transferred, total, percent }) => {
        const percentage = Math.round(percent * 100);
        console.error(`progress: ${transferred}/${total} (${percentage}%)`);
      }), createWriteStream(targetDir));
}

function generateMarkdown(data) {
  const stream = createWriteStream(`${data.targetDir}/index.md`);
  stream.write("---\n");
  stream.write("id: " + uuidv4() + "\n");
  stream.write("date: " + Date.now() + "\n");
  stream.write("title: " + data.title + "\n");
  stream.write("image: ." + data.imagePath + "\n");
  stream.write("external: " + data.url + "\n");
  stream.write("description: " + data.description + "\n");
  stream.write("---");
}

async function main() {
  const answers = await questions();
  const metatags = await getMetaTags(answers.websiteUrl);
  const data = { ...answers, ...metatags };
  const targetDir = generateDir(data);
  await downloadExternalImage(data.image, targetDir + data.imagePath);
  generateMarkdown({ ...data, targetDir });
  console.log(`Success: ${targetDir}`);
}

main();
