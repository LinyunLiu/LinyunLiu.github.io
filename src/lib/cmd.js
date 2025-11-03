const { content_type } = require('./config')
const publisher = require('./publish')
const sanitizer = require('./sanitizer')
const chalk = require('chalk')

const args = process.argv.slice(2);

const help = `
${chalk.bold.blue('Usage:')} publish [content-type] [option]

${chalk.bold('content-type:')}
  ${chalk.cyan('-blog')}     publish blog content
  ${chalk.cyan('-project')}  publish project content
  ${chalk.cyan('-film')}     publish film content
  
${chalk.bold('option:')}
  ${chalk.cyan('-all')}        publish all items of the type
  ${chalk.cyan('-rebuild')}    republish all items of the type
  ${chalk.cyan('-sanitize')}   sanitize meta data, redundant items of the type
  ${chalk.cyan('filename.md')} publish a single file
  ${chalk.cyan('-help')} or ${chalk.cyan('-h')} show this help message
`;

if (args[0] === '-help' || args[0] === '-h') {
    console.log(help);
    process.exit(0);
}

const type_map = {
    '-blog': content_type.blog,
    '-project': content_type.project,
    '-film': content_type.film,
};

const type = type_map[args[0]];

if (!type){
    console.log(chalk.red(`type '${args[0]}' is unknown`));
}
else{
    const target = args[1];
    if (!target){
        console.log(chalk.red(`please provide a target, either '-all', or 'filename.md'`));
    }
    else if (target === '-all' || target === '-rebuild') {
        publisher.publish_all(type);
    }
    else if (target === '-sanitize') {
        sanitizer.sanitize_meta(type);
        sanitizer.sanitize_publish(type);
        console.log(chalk.green(`${type.name} contents has been sanitized!`));
    }
    else {
        publisher.publish(target, type);
    }
}
