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
        type: 'input',
        name: 'name',
        message: 'What is the hook name(camelCase format)?',
      },
      {
        type: 'input',
        name: 'dir',
        message: 'Where is the directory(Optional)?',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { dir, name } = answers;
      const path = `${dir ? `${dir}` : ``}`;
      const absPath = `src/hooks/${path}`;
      return { ...answers, path, absPath, name: toPascalCase(name) };
    });
  },
};
