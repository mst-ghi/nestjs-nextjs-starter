function toPascalCase(string) {
  return `${string}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w*)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}

module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'select',
        name: 'category',
        message: 'Which Atomic design level?',
        choices: ['atoms', 'molecules', 'organisms', 'templates'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name?',
      },
      {
        type: 'input',
        name: 'dir',
        message: 'Where is the directory(Optional)',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { category, dir, name } = answers;
      const path = `${category}/${dir ? `${dir}` : ``}`;
      const absPath = `src/components/${path}`;
      return { ...answers, path, absPath, category, name: toPascalCase(name), fileName: name };
    });
  },
};
